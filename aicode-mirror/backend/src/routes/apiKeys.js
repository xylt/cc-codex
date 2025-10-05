import express from 'express'
import { body } from 'express-validator'
import { authenticateToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { validationResult } from 'express-validator'
import User from '../models/User.js'

const router = express.Router()

// @desc    Get user's API key
// @route   GET /api/api-keys
// @access  Private
const getApiKey = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user.apiKey?.key) {
    return res.json({
      success: true,
      data: {
        hasApiKey: false,
        apiKey: null
      }
    })
  }

  res.json({
    success: true,
    data: {
      hasApiKey: true,
      apiKey: {
        name: user.apiKey.name || 'My API Key',
        masked: user.apiKey.masked,
        createdAt: user.apiKey.createdAt,
        lastUsed: user.apiKey.lastUsed
      }
    }
  })
})

// @desc    Set/Update user's API key
// @route   POST /api/api-keys
// @access  Private
const setApiKey = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    })
  }

  const { name } = req.body
  const user = await User.findById(req.user._id)

  // Generate new API key
  const keyData = User.generateApiKey()

  user.apiKey = {
    key: keyData.key,
    keyPrefix: keyData.keyPrefix,
    keySuffix: keyData.keySuffix,
    name: name || 'My API Key',
    createdAt: new Date(),
    lastUsed: null
  }

  await user.save()

  res.status(201).json({
    success: true,
    message: user.apiKey.key === keyData.key ? 'API key set successfully' : 'API key updated successfully',
    data: {
      apiKey: {
        name: user.apiKey.name,
        key: keyData.key, // Only show full key during creation/update
        masked: user.apiKey.masked,
        createdAt: user.apiKey.createdAt
      }
    }
  })
})

// @desc    Delete user's API key
// @route   DELETE /api/api-keys
// @access  Private
const deleteApiKey = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user.apiKey?.key) {
    return res.status(404).json({
      success: false,
      message: 'No API key found'
    })
  }

  user.apiKey = {
    key: null,
    keyPrefix: null,
    keySuffix: null,
    name: null,
    createdAt: null,
    lastUsed: null
  }

  await user.save()

  res.json({
    success: true,
    message: 'API key deleted successfully'
  })
})

// Validation rules
const setApiKeyValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('API key name must be between 1 and 100 characters')
]

// Routes
router.get('/', authenticateToken, getApiKey)
router.post('/', authenticateToken, setApiKeyValidation, setApiKey)
router.delete('/', authenticateToken, deleteApiKey)

export default router