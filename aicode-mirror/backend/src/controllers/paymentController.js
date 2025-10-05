import axios from 'axios'
import User from '../models/User.js'

// 支付成功后生成 API Key 的配置
const API_KEY_GENERATION_URL = 'http://claudeai.asia:8080/admin/api-keys'

// 不同套餐的配置
const PLAN_CONFIG = {
  plus: {
    dailyCostLimit: 10,
    totalCostLimit: 50,
    price: 99,
    credits: 5000
  },
  pro: {
    dailyCostLimit: 20,
    totalCostLimit: 100,
    price: 199,
    credits: 10000
  }
}

/**
 * 生成 API Key
 */
async function generateApiKey(username, plan) {
  const config = PLAN_CONFIG[plan]
  if (!config) {
    throw new Error('Invalid plan')
  }

  // 计算过期时间（一个月后）
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 1)

  const requestData = {
    allowedClients: [],
    concurrencyLimit: 0,
    dailyCostLimit: config.dailyCostLimit,
    enableClientRestriction: false,
    enableModelRestriction: false,
    expirationMode: 'fixed',
    expiresAt: expiresAt.toISOString(),
    name: `auto-key-${username}`,
    permissions: 'all',
    rateLimitCost: 0,
    rateLimitRequests: 3,
    rateLimitWindow: 1,
    restrictedModels: [],
    tokenLimit: 0,
    totalCostLimit: config.totalCostLimit,
    weeklyOpusCostLimit: 0
  }

  try {
    const response = await axios.post(API_KEY_GENERATION_URL, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.data.success) {
      return {
        apiKeyId: response.data.data.id,
        apiKey: response.data.data.apiKey,
        expiresAt: response.data.data.expiresAt
      }
    } else {
      throw new Error('Failed to generate API key')
    }
  } catch (error) {
    console.error('Error generating API key:', error)
    throw error
  }
}

/**
 * 处理支付成功回调
 */
export const handlePaymentSuccess = async (req, res) => {
  try {
    const { userId, plan, orderId, paymentMethod } = req.body

    // 验证必要参数
    if (!userId || !plan || !orderId) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数'
      })
    }

    // 验证套餐
    if (!PLAN_CONFIG[plan]) {
      return res.status(400).json({
        success: false,
        message: '无效的套餐类型'
      })
    }

    // 查找用户
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      })
    }

    // 生成 API Key
    const apiKeyData = await generateApiKey(user.name, plan)

    // 更新用户订阅信息
    const currentPeriodStart = new Date()
    const currentPeriodEnd = new Date()
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

    user.plan = plan
    user.credits.total = PLAN_CONFIG[plan].credits
    user.credits.used = 0
    user.credits.resetDate = currentPeriodEnd
    user.subscription = {
      planId: plan,
      status: 'active',
      currentPeriodStart: currentPeriodStart,
      currentPeriodEnd: currentPeriodEnd,
      cancelAtPeriodEnd: false,
      orderId: orderId,
      paymentMethod: paymentMethod,
      apiKeyId: apiKeyData.apiKeyId
    }

    await user.save()

    res.json({
      success: true,
      message: '支付成功，订阅已激活',
      data: {
        plan: user.plan,
        apiKey: apiKeyData.apiKey,
        expiresAt: apiKeyData.expiresAt,
        credits: {
          total: user.credits.total,
          remaining: user.credits.remaining
        }
      }
    })
  } catch (error) {
    console.error('Payment success handler error:', error)
    res.status(500).json({
      success: false,
      message: '处理支付回调失败',
      error: error.message
    })
  }
}

/**
 * 创建支付订单
 */
export const createPaymentOrder = async (req, res) => {
  try {
    const { userId, plan, paymentMethod } = req.body

    // 验证必要参数
    if (!userId || !plan || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数'
      })
    }

    // 验证套餐
    const planConfig = PLAN_CONFIG[plan]
    if (!planConfig) {
      return res.status(400).json({
        success: false,
        message: '无效的套餐类型'
      })
    }

    // 生成订单ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // TODO: 这里应该调用真实的支付宝/微信支付 API 生成支付二维码
    // 目前返回模拟数据
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `${paymentMethod}://pay?orderId=${orderId}&amount=${planConfig.price}&plan=${plan}`
    )}`

    res.json({
      success: true,
      data: {
        orderId: orderId,
        qrCodeUrl: qrCodeUrl,
        amount: planConfig.price,
        plan: plan,
        paymentMethod: paymentMethod
      }
    })
  } catch (error) {
    console.error('Create payment order error:', error)
    res.status(500).json({
      success: false,
      message: '创建支付订单失败',
      error: error.message
    })
  }
}

/**
 * 检查支付状态
 */
export const checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.body

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: '缺少订单ID'
      })
    }

    // TODO: 这里应该调用真实的支付宝/微信支付 API 查询订单状态
    // 目前返回模拟数据
    res.json({
      success: true,
      data: {
        orderId: orderId,
        status: 'pending', // pending, success, failed
        message: '等待支付中'
      }
    })
  } catch (error) {
    console.error('Check payment status error:', error)
    res.status(500).json({
      success: false,
      message: '查询支付状态失败',
      error: error.message
    })
  }
}

/**
 * 获取用户订阅信息
 */
export const getUserSubscription = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      })
    }

    res.json({
      success: true,
      data: {
        plan: user.plan,
        subscription: user.subscription,
        credits: {
          total: user.credits.total,
          used: user.credits.used,
          remaining: user.credits.remaining,
          resetDate: user.credits.resetDate
        }
      }
    })
  } catch (error) {
    console.error('Get user subscription error:', error)
    res.status(500).json({
      success: false,
      message: '获取订阅信息失败',
      error: error.message
    })
  }
}
