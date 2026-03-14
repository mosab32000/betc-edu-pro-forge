import { Router } from 'express'
import { getKpis } from '../controllers/analytics.controller'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'

const router = Router()
router.get('/kpis', authMiddleware, requireRole(['ADMIN', 'MINISTRY']), getKpis)

export { router as analyticsRoutes }
