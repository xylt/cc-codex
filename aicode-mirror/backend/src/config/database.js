import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aicode-mirror', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    // Don't exit process in development, allow server to start without DB
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    } else {
      console.warn('⚠️  Running without database connection')
    }
  }
}

export default connectDB
