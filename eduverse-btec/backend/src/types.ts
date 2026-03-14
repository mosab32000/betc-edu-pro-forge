export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'MINISTRY'

export interface UserRecord {
  id: string
  email: string
  name: string
  passwordHash: string
  role: UserRole
  createdAt: string
}

export interface AuthenticatedRequestUser {
  id: string
  email: string
  role: UserRole
}
