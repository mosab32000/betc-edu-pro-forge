import { Router } from 'express'
import { listPlans, subscribe } from '../controllers/subscription.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()
router.get('/plans', listPlans)
router.post('/subscribe', authMiddleware, subscribe)

export { router as subscriptionRoutes }
