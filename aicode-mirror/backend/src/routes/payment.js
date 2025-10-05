import express from 'express'
import {
  createPaymentOrder,
  checkPaymentStatus,
  handlePaymentSuccess,
  getUserSubscription
} from '../controllers/paymentController.js'

const router = express.Router()

// 创建支付订单
router.post('/create', createPaymentOrder)

// 检查支付状态
router.post('/check', checkPaymentStatus)

// 支付成功回调
router.post('/success', handlePaymentSuccess)

// 获取用户订阅信息
router.get('/subscription/:userId', getUserSubscription)

export default router
