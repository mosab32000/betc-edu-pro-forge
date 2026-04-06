import jwt from 'jsonwebtoken'
import { users } from '../../domain/entities/user.ts'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export function login(req, res) {
  const { email, password } = req.body || {}
  const user = users.get(String(email || '').toLowerCase())
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, {
    expiresIn: '15m'
  })
  const refreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, JWT_SECRET, {
    expiresIn: '7d'
  })

  return res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } })
}

export function register(req, res) {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'email and password required' })
  if (users.has(email.toLowerCase())) return res.status(409).json({ message: 'email exists' })

  const entity = { id: `user-${users.size + 1}`, email: email.toLowerCase(), password, role: 'student' }
  users.set(entity.email, entity)
  return res.status(201).json({ user: { id: entity.id, email: entity.email, role: entity.role } })
}
