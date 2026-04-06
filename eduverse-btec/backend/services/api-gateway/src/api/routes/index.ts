import { Router } from 'express'

export const routes = Router()

routes.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway', version: '1.0.0' })
})

routes.get('/v1/info', (_req, res) => {
  res.json({
    name: 'Eduverse API Gateway',
    auth: ['JWT', 'OAuth2-ready'],
    services: ['auth-service', 'courses-service', 'grading-service', 'ai-service']
  })
})
