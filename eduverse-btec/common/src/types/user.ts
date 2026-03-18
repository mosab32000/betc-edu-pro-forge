export type UserRole = 'student' | 'teacher' | 'parent' | 'admin' | 'auditor' | 'quality-monitor'

export interface UserProfile {
  id: string
  fullName: string
  email: string
  role: UserRole
}
