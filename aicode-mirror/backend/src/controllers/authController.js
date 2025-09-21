import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import { asyncHandler } from '../middleware/errorHandler.js'

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { name, email, password } = req.body

  // Check if user already exists
  const existingUser = await User.findByEmail(email)
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    })
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  })

  // Generate token
  const token = generateToken(user._id)

  // Remove password from response
  const userResponse = user.toObject()
  delete userResponse.password

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: userResponse,
      token
    }
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { email, password } = req.body

  // Find user and include password for comparison
  const user = await User.findByEmail(email).select('+password')

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    })
  }

  // Check if account is locked
  if (user.security.isLocked) {
    return res.status(423).json({
      success: false,
      message: 'Account is temporarily locked due to too many failed login attempts'
    })
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid) {
    // Increment failed login attempts
    await user.incLoginAttempts()

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    })
  }

  // Reset failed login attempts on successful login
  if (user.security.failedLoginAttempts > 0) {
    await user.resetLoginAttempts()
  }

  // Update last login info
  user.security.lastLogin = new Date()
  user.security.lastLoginIP = req.ip || req.connection.remoteAddress
  await user.save()

  // Generate token
  const token = generateToken(user._id)

  // Remove password from response
  const userResponse = user.toObject()
  delete userResponse.password

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: userResponse,
      token
    }
  })
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  res.json({
    success: true,
    data: {
      user
    }
  })
})

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // In a JWT-based system, logout is typically handled client-side
  // by removing the token. Here we can optionally log the logout event.

  res.json({
    success: true,
    message: 'Logout successful'
  })
})

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Private
export const refreshToken = asyncHandler(async (req, res) => {
  // Generate new token
  const token = generateToken(req.user._id)

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      token
    }
  })
})

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { email } = req.body

  const user = await User.findByEmail(email)

  if (!user) {
    // Don't reveal if email exists or not
    return res.json({
      success: true,
      message: 'If an account with that email exists, we have sent a password reset link'
    })
  }

  // Generate reset token (in production, use crypto for secure tokens)
  const resetToken = Math.random().toString(36).substr(2, 15)

  user.security.passwordResetToken = resetToken
  user.security.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

  await user.save()

  // In production, send email with reset link
  // For now, just return success
  console.log(`Password reset token for ${email}: ${resetToken}`)

  res.json({
    success: true,
    message: 'If an account with that email exists, we have sent a password reset link'
  })
})

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { token, password } = req.body

  const user = await User.findOne({
    'security.passwordResetToken': token,
    'security.passwordResetExpires': { $gt: Date.now() }
  })

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token'
    })
  }

  // Set new password
  user.password = password
  user.security.passwordResetToken = undefined
  user.security.passwordResetExpires = undefined

  await user.save()

  res.json({
    success: true,
    message: 'Password reset successful'
  })
})

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { currentPassword, newPassword } = req.body

  // Get user with password
  const user = await User.findById(req.user._id).select('+password')

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword)

  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    })
  }

  // Set new password
  user.password = newPassword
  await user.save()

  res.json({
    success: true,
    message: 'Password changed successfully'
  })
})