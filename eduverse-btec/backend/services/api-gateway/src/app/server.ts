import express from 'express'
import cors from 'cors'
import { routes } from '../api/routes/index.ts'
import { requestIdMiddleware } from '../api/middleware/request-id.ts'
import { loggingMiddleware, logResponse } from '../api/middleware/logging.ts'
import { environment } from '../infrastructure/config/environment.ts'

export function createServer() {
  const app = express()
  app.use(cors({ origin: environment.corsOrigin }))
  app.use(express.json({ limit: '1mb' }))
  app.use(requestIdMiddleware)
  app.use(loggingMiddleware)
  app.use(logResponse)
  app.use('/', routes)
  return app
}
