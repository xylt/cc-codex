import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  plan: {
    type: String,
    enum: ['free', 'plus', 'pro', 'max', 'ultra'],
    default: 'free'
  },
  credits: {
    total: {
      type: Number,
      default: 1000 // Free plan starts with 1000 credits
    },
    used: {
      type: Number,
      default: 0
    },
    resetDate: {
      type: Date,
      default: () => {
        const date = new Date()
        date.setMonth(date.getMonth() + 1)
        return date
      }
    }
  },
  profile: {
    avatar: String,
    company: String,
    website: String,
    bio: String
  },
  preferences: {
    language: {
      type: String,
      default: 'zh-CN'
    },
    timezone: {
      type: String,
      default: 'Asia/Shanghai'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      security: {
        type: Boolean,
        default: true
      },
      updates: {
        type: Boolean,
        default: false
      }
    }
  },
  subscription: {
    planId: String,
    customerId: String,
    subscriptionId: String,
    status: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'unpaid'],
      default: 'active'
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    },
    orderId: String,
    paymentMethod: String,
    apiKeyId: String
  },
  usage: {
    requests: {
      total: { type: Number, default: 0 },
      thisMonth: { type: Number, default: 0 },
      lastReset: { type: Date, default: Date.now }
    },
    models: {
      haiku: { type: Number, default: 0 },
      sonnet: { type: Number, default: 0 },
      opus: { type: Number, default: 0 }
    }
  },
  security: {
    lastLogin: Date,
    lastLoginIP: String,
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    twoFactorSecret: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for remaining credits
userSchema.virtual('credits.remaining').get(function() {
  return this.credits.total - this.credits.used
})

// Virtual for credit usage percentage
userSchema.virtual('credits.usagePercentage').get(function() {
  return this.credits.total > 0 ? Math.round((this.credits.used / this.credits.total) * 100) : 0
})

// Virtual for account locked status
userSchema.virtual('security.isLocked').get(function() {
  return !!(this.security.lockUntil && this.security.lockUntil > Date.now())
})

// Index for performance
userSchema.index({ email: 1 })
userSchema.index({ 'security.passwordResetToken': 1 })
userSchema.index({ 'security.emailVerificationToken': 1 })
userSchema.index({ createdAt: 1 })

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next()

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Pre-save middleware to reset credits monthly
userSchema.pre('save', function(next) {
  if (this.credits.resetDate && this.credits.resetDate <= new Date()) {
    // Reset credits based on plan
    const planCredits = {
      free: 3000,
      plus: 5000,
      pro: 10000,
      max: 50000,
      ultra: 200000
    }

    this.credits.used = 0
    this.credits.total = planCredits[this.plan] || 1000
    this.credits.resetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    this.usage.requests.thisMonth = 0
    this.usage.requests.lastReset = new Date()
  }
  next()
})

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Instance method to increment failed login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.security.lockUntil && this.security.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { 'security.lockUntil': 1 },
      $set: { 'security.failedLoginAttempts': 1 }
    })
  }

  const updates = { $inc: { 'security.failedLoginAttempts': 1 } }

  // If we have max attempts and no lock, lock account
  if (this.security.failedLoginAttempts + 1 >= 5 && !this.security.isLocked) {
    updates.$set = { 'security.lockUntil': Date.now() + 2 * 60 * 60 * 1000 } // 2 hours
  }

  return this.updateOne(updates)
}

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      'security.failedLoginAttempts': 1,
      'security.lockUntil': 1
    }
  })
}

// Instance method to use credits
userSchema.methods.useCredits = function(amount) {
  if (this.credits.remaining < amount) {
    throw new Error('Insufficient credits')
  }

  this.credits.used += amount
  this.usage.requests.total += 1
  this.usage.requests.thisMonth += 1

  return this.save()
}

// Instance method to check if user can use specific model
userSchema.methods.canUseModel = function(model) {
  const modelAccess = {
    free: ['haiku'],
    plus: ['haiku', 'sonnet'],
    pro: ['haiku', 'sonnet', 'opus'],
    max: ['haiku', 'sonnet', 'opus'],
    ultra: ['haiku', 'sonnet', 'opus']
  }

  return modelAccess[this.plan]?.includes(model) || false
}

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() })
}

// Static method to find active users
userSchema.statics.findActive = function() {
  return this.find({ status: 'active' })
}

const User = mongoose.model('User', userSchema)

export default User