import { Router } from 'express'
import { chatWithAi } from '../controllers/ai.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()
router.post('/chat', authMiddleware, chatWithAi)

export { router as aiRoutes }
