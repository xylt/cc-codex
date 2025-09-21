// 404 Not Found middleware
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableEndpoints: {
      auth: '/api/auth',
      users: '/api/users',
      apiKeys: '/api/api-keys',
      stats: '/api/stats',
      health: '/health'
    }
  })
}