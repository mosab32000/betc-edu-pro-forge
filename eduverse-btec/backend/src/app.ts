import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoutes } from './routes/auth.routes'
import { landmarkRoutes } from './routes/landmark.routes'
import { courseRoutes } from './routes/course.routes'
import { aiRoutes } from './routes/ai.routes'
import { subscriptionRoutes } from './routes/subscription.routes'
import { analyticsRoutes } from './routes/analytics.routes'
import { errorHandler } from './middleware/error.middleware'
import { seedAdmin } from './services/user.service'
import { rateLimitMiddleware, securityHeaders } from './middleware/security.middleware'

dotenv.config()
seedAdmin()

const app = express()
app.use(cors())
app.use(securityHeaders)
app.use(rateLimitMiddleware(180, 60_000))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) =>
  res.json({ status: 'ok', service: 'eduverse-backend', timestamp: new Date().toISOString() })
)

app.use('/api/auth', authRoutes)
app.use('/api/landmarks', landmarkRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`API listening on ${port}`))
