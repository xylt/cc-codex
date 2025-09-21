import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import User from '../models/User.js'
import ApiKey from '../models/ApiKey.js'

const router = express.Router()

// @desc    Get user dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const { period = 'today' } = req.query
  const user = await User.findById(req.user._id)

  // Calculate date range based on period
  let startDate = new Date()
  switch (period) {
    case 'today':
      startDate.setHours(0, 0, 0, 0)
      break
    case 'week':
      startDate.setDate(startDate.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1)
      break
    default:
      startDate.setHours(0, 0, 0, 0)
  }

  // Get API keys for user
  const apiKeys = await ApiKey.find({
    user: req.user._id,
    status: 'active'
  })

  // Calculate total requests from all API keys
  const totalRequests = apiKeys.reduce((sum, key) => sum + key.usage.totalRequests, 0)

  // Mock data for demonstration (in production, you'd calculate from actual usage logs)
  const stats = {
    credits: {
      used: user.credits.used,
      total: user.credits.total,
      remaining: user.credits.remaining,
      usagePercentage: user.credits.usagePercentage
    },
    requests: {
      total: totalRequests,
      growth: Math.floor(Math.random() * 20) + 5 // Mock growth percentage
    },
    codeGenerated: Math.floor(Math.random() * 10000) + 1000, // Mock lines of code
    avgResponseTime: Math.floor(Math.random() * 100) + 50, // Mock response time
    modelUsage: [
      {
        name: 'Sonnet',
        percentage: 45,
        requests: Math.floor(totalRequests * 0.45),
        credits: Math.floor(user.credits.used * 0.5)
      },
      {
        name: 'Haiku',
        percentage: 35,
        requests: Math.floor(totalRequests * 0.35),
        credits: Math.floor(user.credits.used * 0.3)
      },
      {
        name: 'Opus',
        percentage: 20,
        requests: Math.floor(totalRequests * 0.2),
        credits: Math.floor(user.credits.used * 0.2)
      }
    ],
    recentActivity: generateMockActivity(10)
  }

  res.json({
    success: true,
    data: stats
  })
})

// @desc    Get detailed usage analytics
// @route   GET /api/stats/analytics
// @access  Private
const getAnalytics = asyncHandler(async (req, res) => {
  const { days = 30 } = req.query
  const user = await User.findById(req.user._id)

  // Generate mock analytics data
  const analytics = {
    usage: {
      daily: generateDailyUsage(parseInt(days)),
      hourly: generateHourlyUsage(),
      byModel: {
        haiku: { requests: 245, credits: 490, avgResponseTime: 45 },
        sonnet: { requests: 189, credits: 1890, avgResponseTime: 120 },
        opus: { requests: 67, credits: 2010, avgResponseTime: 200 }
      }
    },
    performance: {
      avgResponseTime: 95,
      successRate: 99.2,
      errorRate: 0.8
    },
    billing: {
      currentPeriod: {
        start: user.credits.resetDate ? new Date(user.credits.resetDate.getTime() - 30 * 24 * 60 * 60 * 1000) : new Date(),
        end: user.credits.resetDate || new Date(),
        creditsUsed: user.credits.used,
        estimatedCost: calculateEstimatedCost(user.credits.used, user.plan)
      }
    }
  }

  res.json({
    success: true,
    data: analytics
  })
})

// @desc    Get system health stats (for admin)
// @route   GET /api/stats/health
// @access  Private (Admin)
const getHealthStats = asyncHandler(async (req, res) => {
  // This would typically be admin-only
  const health = {
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  }

  res.json({
    success: true,
    data: health
  })
})

// Helper functions
function generateMockActivity(count) {
  const activities = []
  const types = ['code_generation', 'code_review', 'bug_fix', 'documentation', 'optimization']
  const models = ['Haiku', 'Sonnet', 'Opus']

  for (let i = 0; i < count; i++) {
    activities.push({
      id: i + 1,
      type: types[Math.floor(Math.random() * types.length)],
      description: generateActivityDescription(),
      timestamp: Date.now() - Math.floor(Math.random() * 86400000), // Random time in last 24h
      model: models[Math.floor(Math.random() * models.length)]
    })
  }

  return activities.sort((a, b) => b.timestamp - a.timestamp)
}

function generateActivityDescription() {
  const descriptions = [
    '生成了一个React组件',
    '进行了代码审查',
    '修复了一个TypeError',
    '生成了API文档',
    '优化了算法性能',
    '创建了单元测试',
    '重构了数据库查询',
    '生成了TypeScript接口'
  ]

  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

function generateDailyUsage(days) {
  const usage = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    usage.push({
      date: date.toISOString().split('T')[0],
      requests: Math.floor(Math.random() * 50) + 10,
      credits: Math.floor(Math.random() * 500) + 100,
      responseTime: Math.floor(Math.random() * 50) + 70
    })
  }
  return usage
}

function generateHourlyUsage() {
  const usage = []
  for (let hour = 0; hour < 24; hour++) {
    usage.push({
      hour,
      requests: Math.floor(Math.random() * 20) + 5,
      credits: Math.floor(Math.random() * 200) + 50
    })
  }
  return usage
}

function calculateEstimatedCost(creditsUsed, plan) {
  const planPricing = {
    free: 0,
    pro: 99,
    max: 299,
    ultra: 999
  }

  return planPricing[plan] || 0
}

// Routes
router.get('/dashboard', authenticateToken, getDashboardStats)
router.get('/analytics', authenticateToken, getAnalytics)
router.get('/health', getHealthStats)

// --- External usage -> points mapping ---
// @desc    Fetch remote usage by apiKey/apiId and convert to points
// @route   POST /api/stats/user-points
// @access  Private
const getUserPoints = asyncHandler(async (req, res) => {
  const {
    apiKey = undefined,
    apiId: providedApiId = undefined,
    targetDailyPoints = 3000
  } = req.body || {}

  if (!apiKey && !providedApiId) {
    return res.status(400).json({
      success: false,
      message: 'Either apiKey or apiId is required'
    })
  }

  // Ensure fetch exists (Node < 18 compatibility)
  if (typeof fetch === 'undefined') {
    const mod = await import('node-fetch')
    globalThis.fetch = mod.default
  }

  const API_BASE = process.env.CLAUDE_STATS_BASE || 'http://claudeai.asia:8080/apiStats/api'

  // Helper to call JSON APIs with timeout
  const jsonPost = async (url, body, timeoutMs = 10000) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      })
      // Try JSON, then fallback to text
      const text = await resp.text()
      let data = {}
      try { data = JSON.parse(text) } catch (_) { /* not JSON */ }
      return { ok: resp.ok, status: resp.status, data, text }
    } finally {
      clearTimeout(timer)
    }
  }

  // Step 1: ensure we have apiId
  let apiId = providedApiId
  let keyLookup = null
  if (!apiId && apiKey) {
    const r = await jsonPost(`${API_BASE}/get-key-id`, { apiKey })
    keyLookup = r
    const d = r.data || {}
    // Try common shapes
    apiId = d.apiId
      || d.id
      || d?.data?.apiId
      || d?.data?.id
      || d?.result?.apiId
      || d?.result?.id
      || d?.payload?.apiId
      || d?.payload?.id
      || d?.data?.data?.apiId
      || d?.data?.data?.id
      || null

    // If still not found, try to extract UUID-like from raw payload
    if (!apiId) {
      const rawCombined = `${JSON.stringify(d)} ${r.text || ''}`
      const uuidMatch = rawCombined.match(/[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}/)
      if (uuidMatch) apiId = uuidMatch[0]
    }
    if (!apiId) {
      return res.status(502).json({
        success: false,
        message: 'Failed to resolve apiId from remote service',
        data: { remote: d, raw: keyLookup?.text }
      })
    }
  }

  // Step 2: fetch user-stats by apiId
  const statsResp = await jsonPost(`${API_BASE}/user-stats`, { apiId })
  const raw = statsResp.data || {}
  const limits = raw.limits || raw.data?.limits || {}
  const dailyCost = Number(limits.currentDailyCost ?? 0)
  const dailyLimit = Number(limits.dailyCostLimit ?? limits.dailyLimit ?? 0)

  // Convert to points (积分)
  const factor = dailyLimit > 0 ? targetDailyPoints / dailyLimit : 1
  const pointsUsed = Math.max(0, Math.min(targetDailyPoints, Math.round(dailyCost * factor)))

  return res.json({
    success: true,
    data: {
      apiId,
      limits: {
        currentDailyCost: isFinite(dailyCost) ? dailyCost : 0,
        dailyCostLimit: isFinite(dailyLimit) ? dailyLimit : 0
      },
      conversion: {
        targetDailyPoints,
        factor,
        pointsUsed
      },
      ...(keyLookup && { keyLookup })
    }
  })
})

// Make this endpoint public to avoid CORS issues in demo
router.post('/user-points', getUserPoints)

// Alias: accept apiKey and return apiId + stats + conversion
router.post('/get-key-id', getUserPoints)

export default router
