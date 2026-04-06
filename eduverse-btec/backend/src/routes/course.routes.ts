import { Router } from 'express'
import { getCourse, getCourses, patchCourse, postCourse, removeCourse } from '../controllers/course.controller'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'

const router = Router()
router.get('/', getCourses)
router.get('/:id', getCourse)
router.post('/', authMiddleware, requireRole(['ADMIN', 'INSTRUCTOR']), postCourse)
router.patch('/:id', authMiddleware, requireRole(['ADMIN', 'INSTRUCTOR']), patchCourse)
router.delete('/:id', authMiddleware, requireRole(['ADMIN']), removeCourse)

export { router as courseRoutes }
