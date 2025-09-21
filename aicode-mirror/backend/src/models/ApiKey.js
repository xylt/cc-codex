import mongoose from 'mongoose'
import crypto from 'crypto'

const apiKeySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'API key name is required'],
    trim: true,
    maxlength: [100, 'API key name cannot exceed 100 characters']
  },
  key: {
    type: String,
    required: true,
    unique: true,
    select: false // Don't include actual key in queries by default
  },
  keyPrefix: {
    type: String,
    required: true
  },
  keySuffix: {
    type: String,
    required: true
  },
  permissions: {
    read: {
      type: Boolean,
      default: true
    },
    write: {
      type: Boolean,
      default: true
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  rateLimit: {
    requests: {
      type: Number,
      default: 1000 // requests per hour
    },
    window: {
      type: Number,
      default: 3600 // seconds (1 hour)
    }
  },
  usage: {
    totalRequests: {
      type: Number,
      default: 0
    },
    lastUsed: Date,
    lastUsedIP: String,
    requestsThisHour: {
      type: Number,
      default: 0
    },
    hourlyResetTime: {
      type: Date,
      default: () => new Date(Date.now() + 3600000) // 1 hour from now
    }
  },
  restrictions: {
    allowedIPs: [{
      type: String,
      validate: {
        validator: function(ip) {
          // Basic IP validation (IPv4)
          return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)
        },
        message: 'Invalid IP address format'
      }
    }],
    allowedDomains: [String],
    expiresAt: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'revoked', 'expired'],
    default: 'active'
  },
  lastActivity: {
    timestamp: Date,
    endpoint: String,
    method: String,
    statusCode: Number,
    responseTime: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for masked key display
apiKeySchema.virtual('maskedKey').get(function() {
  return `${this.keyPrefix}${'*'.repeat(20)}${this.keySuffix}`
})

// Virtual for expired status
apiKeySchema.virtual('isExpired').get(function() {
  return this.restrictions.expiresAt && this.restrictions.expiresAt < new Date()
})

// Virtual for rate limit exceeded
apiKeySchema.virtual('rateLimitExceeded').get(function() {
  if (this.usage.hourlyResetTime < new Date()) {
    return false // Reset time has passed
  }
  return this.usage.requestsThisHour >= this.rateLimit.requests
})

// Index for performance
apiKeySchema.index({ user: 1 })
apiKeySchema.index({ key: 1 })
apiKeySchema.index({ keyPrefix: 1 })
apiKeySchema.index({ status: 1 })
apiKeySchema.index({ createdAt: 1 })
apiKeySchema.index({ 'usage.lastUsed': 1 })

// Pre-save middleware to reset hourly rate limit
apiKeySchema.pre('save', function(next) {
  if (this.usage.hourlyResetTime && this.usage.hourlyResetTime <= new Date()) {
    this.usage.requestsThisHour = 0
    this.usage.hourlyResetTime = new Date(Date.now() + 3600000) // 1 hour from now
  }
  next()
})

// Instance method to increment usage
apiKeySchema.methods.incrementUsage = function(ip, endpoint, method, statusCode, responseTime) {
  this.usage.totalRequests += 1
  this.usage.requestsThisHour += 1
  this.usage.lastUsed = new Date()
  this.usage.lastUsedIP = ip

  this.lastActivity = {
    timestamp: new Date(),
    endpoint,
    method,
    statusCode,
    responseTime
  }

  return this.save()
}

// Instance method to check if key can be used
apiKeySchema.methods.canUse = function(ip = null) {
  // Check if key is active
  if (this.status !== 'active') {
    return { allowed: false, reason: 'API key is not active' }
  }

  // Check if expired
  if (this.isExpired) {
    return { allowed: false, reason: 'API key has expired' }
  }

  // Check rate limit
  if (this.rateLimitExceeded) {
    return {
      allowed: false,
      reason: 'Rate limit exceeded',
      resetTime: this.usage.hourlyResetTime
    }
  }

  // Check IP restrictions
  if (ip && this.restrictions.allowedIPs.length > 0) {
    if (!this.restrictions.allowedIPs.includes(ip)) {
      return { allowed: false, reason: 'IP address not allowed' }
    }
  }

  return { allowed: true }
}

// Instance method to revoke key
apiKeySchema.methods.revoke = function() {
  this.status = 'revoked'
  return this.save()
}

// Static method to generate API key
apiKeySchema.statics.generateKey = function() {
  const prefix = 'ak'
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const key = `${prefix}-${randomBytes}`

  return {
    key,
    keyPrefix: key.substring(0, 7), // ak-1234
    keySuffix: key.substring(key.length - 4) // last 4 chars
  }
}

// Static method to find by key
apiKeySchema.statics.findByKey = function(key) {
  return this.findOne({ key }).select('+key').populate('user')
}

// Static method to find active keys for user
apiKeySchema.statics.findActiveByUser = function(userId) {
  return this.find({
    user: userId,
    status: 'active'
  })
}

// Static method to clean up expired keys
apiKeySchema.statics.cleanupExpired = function() {
  return this.updateMany(
    {
      'restrictions.expiresAt': { $lt: new Date() },
      status: { $ne: 'expired' }
    },
    {
      $set: { status: 'expired' }
    }
  )
}

const ApiKey = mongoose.model('ApiKey', apiKeySchema)

export default ApiKey