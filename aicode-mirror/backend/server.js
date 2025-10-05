import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// Import database connection
import connectDB from './src/config/database.js'

// Import routes
import authRoutes from './src/routes/auth.js'
import userRoutes from './src/routes/users.js'
import apiKeyRoutes from './src/routes/apiKeys.js'
import statsRoutes from './src/routes/stats.js'
import paymentRoutes from './src/routes/payment.js'

// Import middleware
import { errorHandler } from './src/middleware/errorHandler.js'
import { notFound } from './src/middleware/notFound.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/api-keys', apiKeyRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/payment', paymentRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Code Mirror API',
    version: '1.0.0',
    status: 'running',
    documentation: '/api/docs'
  })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 API URL: http://localhost:${PORT}/api`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
})

export default app