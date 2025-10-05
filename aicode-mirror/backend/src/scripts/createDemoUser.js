import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()

const createDemoUser = async () => {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aicode-mirror')
    console.log('✅ Connected to MongoDB')

    // 检查演示用户是否已存在
    const existingUser = await User.findOne({ email: 'demo@aicode.com' })

    if (existingUser) {
      console.log('⚠️  演示用户已存在')
      console.log('邮箱: demo@aicode.com')
      console.log('密码: demo123')
      process.exit(0)
    }

    // 创建演示用户
    const demoUser = await User.create({
      name: '演示用户',
      email: 'demo@aicode.com',
      password: 'demo123',
      plan: 'free',
      credits: {
        total: 3000,
        used: 0
      }
    })

    console.log('✅ 演示用户创建成功！')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('邮箱: demo@aicode.com')
    console.log('密码: demo123')
    console.log('套餐: FREE')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n使用这个账号登录即可访问系统')

    process.exit(0)
  } catch (error) {
    console.error('❌ 创建演示用户失败:', error.message)
    process.exit(1)
  }
}

createDemoUser()
