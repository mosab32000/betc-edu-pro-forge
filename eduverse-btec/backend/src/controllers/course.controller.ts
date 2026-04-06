import { Request, Response } from 'express'
import { z } from 'zod'
import { createCourse, deleteCourse, getCourseById, listCourses, updateCourse } from '../services/course.service'

const createCourseSchema = z.object({
  title: z.string().min(3),
  level: z.enum(['L2', 'L3', 'L4']),
  btecUnit: z.string().min(1),
  published: z.boolean().default(false)
})

const updateCourseSchema = createCourseSchema.partial()

export const getCourses = async (_req: Request, res: Response) => {
  res.json({ items: listCourses() })
}

export const getCourse = async (req: Request, res: Response) => {
  const entity = getCourseById(req.params.id)
  if (!entity) return res.status(404).json({ message: 'Course not found' })
  return res.json(entity)
}

export const postCourse = async (req: Request, res: Response) => {
  const payload = createCourseSchema.parse(req.body)
  const entity = createCourse(payload)
  return res.status(201).json(entity)
}

export const patchCourse = async (req: Request, res: Response) => {
  const payload = updateCourseSchema.parse(req.body)
  const entity = updateCourse(req.params.id, payload)
  if (!entity) return res.status(404).json({ message: 'Course not found' })
  return res.json(entity)
}

export const removeCourse = async (req: Request, res: Response) => {
  const deleted = deleteCourse(req.params.id)
  if (!deleted) return res.status(404).json({ message: 'Course not found' })
  return res.status(204).send()
}
