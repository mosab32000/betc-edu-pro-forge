import { Router } from 'express'
import { enterLandmark, getAllLandmarks, getLandmarkById } from '../controllers/landmark.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()
router.get('/', getAllLandmarks)
router.get('/:id', getLandmarkById)
router.post('/:id/enter', authMiddleware, enterLandmark)

export { router as landmarkRoutes }
