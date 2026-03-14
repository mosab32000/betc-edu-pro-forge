import crypto from 'crypto'
import { UserRecord, UserRole } from '../types'

const usersByEmail = new Map<string, UserRecord>()

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export function createUser(input: { email: string; password: string; name: string; role?: UserRole }): UserRecord {
  const email = input.email.toLowerCase().trim()

  if (usersByEmail.has(email)) {
    throw new Error('Email already registered')
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    name: input.name.trim(),
    passwordHash: hashPassword(input.password),
    role: input.role || 'STUDENT',
    createdAt: new Date().toISOString()
  }

  usersByEmail.set(email, user)
  return user
}

export function authenticateUser(input: { email: string; password: string }): UserRecord | null {
  const user = usersByEmail.get(input.email.toLowerCase().trim())
  if (!user) return null

  const attempted = hashPassword(input.password)
  return attempted === user.passwordHash ? user : null
}

export function getUserById(id: string): UserRecord | null {
  for (const user of usersByEmail.values()) {
    if (user.id === id) return user
  }

  return null
}

export function seedAdmin(): UserRecord {
  const email = 'admin@eduverse.local'
  const existing = usersByEmail.get(email)
  if (existing) return existing

  return createUser({
    email,
    password: 'admin123456',
    name: 'Eduverse Admin',
    role: 'ADMIN'
  })
}
