import express from 'express'
import { body } from 'express-validator'
import { authenticateToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { validationResult } from 'express-validator'
import User from '../models/User.js'

const router = express.Router()

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  res.json({
    success: true,
    data: {
      user
    }
  })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { name, profile, preferences } = req.body

  const user = await User.findById(req.user._id)

  if (name) user.name = name
  if (profile) {
    user.profile = { ...user.profile, ...profile }
  }
  if (preferences) {
    user.preferences = { ...user.preferences, ...preferences }
  }

  await user.save()

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  })
})

// @desc    Get user usage statistics
// @route   GET /api/users/usage
// @access  Private
const getUsage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  const usageData = {
    credits: {
      total: user.credits.total,
      used: user.credits.used,
      remaining: user.credits.remaining,
      usagePercentage: user.credits.usagePercentage,
      resetDate: user.credits.resetDate
    },
    requests: user.usage.requests,
    models: user.usage.models,
    plan: user.plan
  }

  res.json({
    success: true,
    data: usageData
  })
})

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required to delete account'
    })
  }

  // Get user with password
  const user = await User.findById(req.user._id).select('+password')

  // Verify password
  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password'
    })
  }

  // Mark account as deleted instead of actually deleting
  user.status = 'deleted'
  await user.save()

  res.json({
    success: true,
    message: 'Account deleted successfully'
  })
})

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('profile.company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  body('profile.website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('profile.bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters')
]

// Routes
router.get('/profile', authenticateToken, getProfile)
router.put('/profile', authenticateToken, updateProfileValidation, updateProfile)
router.get('/usage', authenticateToken, getUsage)
router.delete('/account', authenticateToken, deleteAccount)

export default router