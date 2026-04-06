import { Request, Response } from 'express'

const landmarks = [
  { id: 'petra', name: 'البتراء', description: 'بوابة التعلم التفاعلي' },
  { id: 'wisdom-hall', name: 'قاعة الحكمة', description: 'المحتوى الذكي' }
]

export const getAllLandmarks = async (_req: Request, res: Response) => {
  res.json(landmarks)
}

export const getLandmarkById = async (req: Request, res: Response) => {
  const landmark = landmarks.find((item) => item.id === req.params.id)
  if (!landmark) return res.status(404).json({ message: 'Landmark not found' })
  res.json(landmark)
}

export const enterLandmark = async (req: Request, res: Response) => {
  res.json({ message: `Welcome to ${req.params.id}`, userId: req.user?.id })
}
