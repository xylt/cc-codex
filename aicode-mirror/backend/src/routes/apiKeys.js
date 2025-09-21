import express from 'express'
import { body } from 'express-validator'
import { authenticateToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { validationResult } from 'express-validator'
import ApiKey from '../models/ApiKey.js'

const router = express.Router()

// @desc    Get all API keys for user
// @route   GET /api/api-keys
// @access  Private
const getApiKeys = asyncHandler(async (req, res) => {
  const apiKeys = await ApiKey.find({
    user: req.user._id,
    status: { $ne: 'revoked' }
  }).sort({ createdAt: -1 })

  res.json({
    success: true,
    data: {
      apiKeys: apiKeys.map(key => ({
        id: key._id,
        name: key.name,
        maskedKey: key.maskedKey,
        permissions: key.permissions,
        rateLimit: key.rateLimit,
        usage: key.usage,
        status: key.status,
        createdAt: key.createdAt,
        updatedAt: key.updatedAt
      }))
    }
  })
})

// @desc    Create new API key
// @route   POST /api/api-keys
// @access  Private
const createApiKey = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { name, permissions, rateLimit, restrictions } = req.body

  // Check if user already has maximum number of API keys
  const existingKeys = await ApiKey.countDocuments({
    user: req.user._id,
    status: 'active'
  })

  const maxKeys = {
    free: 2,
    pro: 5,
    max: 10,
    ultra: 20
  }

  if (existingKeys >= maxKeys[req.user.plan]) {
    return res.status(400).json({
      success: false,
      message: `Your ${req.user.plan} plan allows maximum ${maxKeys[req.user.plan]} active API keys`
    })
  }

  // Generate API key
  const keyData = ApiKey.generateKey()

  const apiKey = await ApiKey.create({
    user: req.user._id,
    name,
    key: keyData.key,
    keyPrefix: keyData.keyPrefix,
    keySuffix: keyData.keySuffix,
    permissions: permissions || { read: true, write: true },
    rateLimit: rateLimit || { requests: 1000, window: 3600 },
    restrictions: restrictions || {}
  })

  res.status(201).json({
    success: true,
    message: 'API key created successfully',
    data: {
      apiKey: {
        id: apiKey._id,
        name: apiKey.name,
        key: keyData.key, // Only show full key during creation
        maskedKey: apiKey.maskedKey,
        permissions: apiKey.permissions,
        rateLimit: apiKey.rateLimit,
        status: apiKey.status,
        createdAt: apiKey.createdAt
      }
    }
  })
})

// @desc    Update API key
// @route   PUT /api/api-keys/:id
// @access  Private
const updateApiKey = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const apiKey = await ApiKey.findOne({
    _id: req.params.id,
    user: req.user._id
  })

  if (!apiKey) {
    return res.status(404).json({
      success: false,
      message: 'API key not found'
    })
  }

  const { name, permissions, rateLimit, restrictions } = req.body

  if (name) apiKey.name = name
  if (permissions) apiKey.permissions = { ...apiKey.permissions, ...permissions }
  if (rateLimit) apiKey.rateLimit = { ...apiKey.rateLimit, ...rateLimit }
  if (restrictions) apiKey.restrictions = { ...apiKey.restrictions, ...restrictions }

  await apiKey.save()

  res.json({
    success: true,
    message: 'API key updated successfully',
    data: {
      apiKey: {
        id: apiKey._id,
        name: apiKey.name,
        maskedKey: apiKey.maskedKey,
        permissions: apiKey.permissions,
        rateLimit: apiKey.rateLimit,
        restrictions: apiKey.restrictions,
        status: apiKey.status,
        updatedAt: apiKey.updatedAt
      }
    }
  })
})

// @desc    Delete API key
// @route   DELETE /api/api-keys/:id
// @access  Private
const deleteApiKey = asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findOne({
    _id: req.params.id,
    user: req.user._id
  })

  if (!apiKey) {
    return res.status(404).json({
      success: false,
      message: 'API key not found'
    })
  }

  await apiKey.revoke()

  res.json({
    success: true,
    message: 'API key revoked successfully'
  })
})

// @desc    Get API key usage statistics
// @route   GET /api/api-keys/:id/usage
// @access  Private
const getApiKeyUsage = asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findOne({
    _id: req.params.id,
    user: req.user._id
  })

  if (!apiKey) {
    return res.status(404).json({
      success: false,
      message: 'API key not found'
    })
  }

  res.json({
    success: true,
    data: {
      usage: {
        totalRequests: apiKey.usage.totalRequests,
        requestsThisHour: apiKey.usage.requestsThisHour,
        lastUsed: apiKey.usage.lastUsed,
        lastUsedIP: apiKey.usage.lastUsedIP,
        hourlyResetTime: apiKey.usage.hourlyResetTime,
        rateLimitExceeded: apiKey.rateLimitExceeded
      },
      lastActivity: apiKey.lastActivity
    }
  })
})

// Validation rules
const createApiKeyValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('API key name must be between 1 and 100 characters'),
  body('permissions.read')
    .optional()
    .isBoolean()
    .withMessage('Read permission must be a boolean'),
  body('permissions.write')
    .optional()
    .isBoolean()
    .withMessage('Write permission must be a boolean'),
  body('rateLimit.requests')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Rate limit requests must be between 1 and 10000'),
  body('restrictions.allowedIPs')
    .optional()
    .isArray()
    .withMessage('Allowed IPs must be an array'),
  body('restrictions.expiresAt')
    .optional()
    .isISO8601()
    .withMessage('Expiration date must be a valid ISO 8601 date')
]

const updateApiKeyValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('API key name must be between 1 and 100 characters'),
  body('permissions.read')
    .optional()
    .isBoolean()
    .withMessage('Read permission must be a boolean'),
  body('permissions.write')
    .optional()
    .isBoolean()
    .withMessage('Write permission must be a boolean'),
  body('rateLimit.requests')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Rate limit requests must be between 1 and 10000'),
  body('restrictions.allowedIPs')
    .optional()
    .isArray()
    .withMessage('Allowed IPs must be an array'),
  body('restrictions.expiresAt')
    .optional()
    .isISO8601()
    .withMessage('Expiration date must be a valid ISO 8601 date')
]

// Routes
router.get('/', authenticateToken, getApiKeys)
router.post('/', authenticateToken, createApiKeyValidation, createApiKey)
router.put('/:id', authenticateToken, updateApiKeyValidation, updateApiKey)
router.delete('/:id', authenticateToken, deleteApiKey)
router.get('/:id/usage', authenticateToken, getApiKeyUsage)

export default router