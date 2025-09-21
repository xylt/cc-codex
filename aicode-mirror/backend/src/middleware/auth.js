import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import ApiKey from '../models/ApiKey.js'

// Middleware to authenticate JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      })
    }

    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account is not active'
      })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      })
    }

    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Middleware to authenticate API key
export const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.headers.authorization?.replace('Bearer ', '')

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key is required'
      })
    }

    const keyDoc = await ApiKey.findByKey(apiKey)

    if (!keyDoc) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key'
      })
    }

    // Check if key can be used
    const clientIP = req.ip || req.connection.remoteAddress
    const canUse = keyDoc.canUse(clientIP)

    if (!canUse.allowed) {
      return res.status(403).json({
        success: false,
        message: canUse.reason,
        resetTime: canUse.resetTime
      })
    }

    // Check if user is active
    if (keyDoc.user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Associated user account is not active'
      })
    }

    req.user = keyDoc.user
    req.apiKey = keyDoc

    // Track usage (will be incremented after request)
    res.locals.trackApiUsage = {
      apiKey: keyDoc,
      ip: clientIP,
      startTime: Date.now()
    }

    next()
  } catch (error) {
    console.error('API key auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Middleware to track API usage after request
export const trackApiUsage = (req, res, next) => {
  const originalSend = res.send

  res.send = function(data) {
    const tracking = res.locals.trackApiUsage
    if (tracking) {
      const responseTime = Date.now() - tracking.startTime
      tracking.apiKey.incrementUsage(
        tracking.ip,
        req.path,
        req.method,
        res.statusCode,
        responseTime
      ).catch(console.error)
    }

    originalSend.call(this, data)
  }

  next()
}

// Middleware to check user permissions
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.apiKey) {
      // Check API key permissions
      if (!req.apiKey.permissions[permission]) {
        return res.status(403).json({
          success: false,
          message: `API key does not have ${permission} permission`
        })
      }
    }

    // For JWT auth, check user role/permissions here if needed
    // Currently all authenticated users have basic permissions

    next()
  }
}

// Middleware to check if user has sufficient credits
export const requireCredits = (minCredits = 1) => {
  return (req, res, next) => {
    if (req.user.credits.remaining < minCredits) {
      return res.status(402).json({
        success: false,
        message: 'Insufficient credits',
        required: minCredits,
        available: req.user.credits.remaining
      })
    }

    next()
  }
}

// Middleware to check if user can use specific model
export const requireModelAccess = (model) => {
  return (req, res, next) => {
    if (!req.user.canUseModel(model)) {
      return res.status(403).json({
        success: false,
        message: `Your plan does not support ${model} model`,
        currentPlan: req.user.plan,
        upgradeUrl: '/pricing'
      })
    }

    next()
  }
}

// Middleware for admin only routes
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }

  next()
}

// Optional authentication - allows both authenticated and unauthenticated requests
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId).select('-password')

      if (user && user.status === 'active') {
        req.user = user
      }
    }

    next()
  } catch (error) {
    // Ignore auth errors for optional auth
    next()
  }
}