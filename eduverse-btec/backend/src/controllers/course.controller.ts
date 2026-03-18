import { Request, Response } from 'express'

const courses = [
  { id: 'btec-it-1', title: 'BTEC IT Unit 1', level: 'L3' },
  { id: 'btec-it-2', title: 'BTEC IT Unit 2', level: 'L3' }
]

export const getCourses = async (_req: Request, res: Response) => {
  res.json(courses)
}
