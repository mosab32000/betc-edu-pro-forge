export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8080),
  corsOrigin: process.env.CORS_ORIGIN || '*'
}
