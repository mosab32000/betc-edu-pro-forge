import { Request, Response } from 'express'
import { z } from 'zod'
import { generateToken } from '../utils/jwt.util'
import { authenticateUser, createUser, getUserById } from '../services/user.service'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body)
  const user = createUser(data)

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  })

  return res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token
  })
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body)
  const user = authenticateUser(data)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  })

  return res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token
  })
}

export async function me(req: Request, res: Response) {
  const userId = req.user?.id
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = getUserById(userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json({ id: user.id, email: user.email, name: user.name, role: user.role })
}
