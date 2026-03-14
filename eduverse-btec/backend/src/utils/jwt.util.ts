import jwt from 'jsonwebtoken'
import { UserRole } from '../types'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JwtPayload {
  userId: string
  email: string
  role: UserRole
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}
