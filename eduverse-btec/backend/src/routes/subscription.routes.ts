import { Router } from 'express'
import { currentSubscription, listPlans, subscribe } from '../controllers/subscription.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()
router.get('/plans', listPlans)
router.post('/subscribe', authMiddleware, subscribe)
router.get('/current', authMiddleware, currentSubscription)

export { router as subscriptionRoutes }
