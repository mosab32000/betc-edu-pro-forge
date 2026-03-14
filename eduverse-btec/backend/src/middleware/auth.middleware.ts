import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.util'
import { AuthenticatedRequestUser, UserRole } from '../types'

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedRequestUser
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.slice(7)
  const payload = verifyToken(token)
  if (!payload) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  req.user = {
    id: payload.userId,
    email: payload.email,
    role: payload.role
  }

  next()
}

export function requireRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  }
}
