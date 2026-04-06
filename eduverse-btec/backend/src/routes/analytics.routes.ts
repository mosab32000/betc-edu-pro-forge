import { Router } from 'express'
import { getExecutiveReport, getKpis } from '../controllers/analytics.controller'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'

const router = Router()
router.get('/kpis', authMiddleware, requireRole(['ADMIN', 'MINISTRY']), getKpis)
router.get('/executive-report', authMiddleware, requireRole(['ADMIN', 'MINISTRY']), getExecutiveReport)

export { router as analyticsRoutes }
