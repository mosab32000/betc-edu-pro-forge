import express from 'express'
import { routes } from '../api/routes/index.ts'

export function createServer() {
  const app = express()
  app.use(express.json({ limit: '512kb' }))
  app.use('/', routes)
  return app
}
