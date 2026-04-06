import crypto from 'node:crypto'

export interface CourseRecord {
  id: string
  title: string
  level: 'L2' | 'L3' | 'L4'
  btecUnit: string
  published: boolean
  createdAt: string
  updatedAt: string
}

const courseStore = new Map<string, CourseRecord>()

function nowIso() {
  return new Date().toISOString()
}

function seedCourses() {
  if (courseStore.size > 0) return
  const seed: Array<Omit<CourseRecord, 'id' | 'createdAt' | 'updatedAt'>> = [
    { title: 'BTEC IT Unit 1', level: 'L3', btecUnit: 'U1', published: true },
    { title: 'BTEC IT Unit 2', level: 'L3', btecUnit: 'U2', published: true }
  ]

  for (const item of seed) {
    const id = crypto.randomUUID()
    const timestamp = nowIso()
    courseStore.set(id, { id, ...item, createdAt: timestamp, updatedAt: timestamp })
  }
}
seedCourses()

export function listCourses() {
  return [...courseStore.values()]
}

export function getCourseById(id: string) {
  return courseStore.get(id) || null
}

export function createCourse(input: Omit<CourseRecord, 'id' | 'createdAt' | 'updatedAt'>) {
  const id = crypto.randomUUID()
  const timestamp = nowIso()
  const entity: CourseRecord = { id, ...input, createdAt: timestamp, updatedAt: timestamp }
  courseStore.set(id, entity)
  return entity
}

export function updateCourse(
  id: string,
  input: Partial<Omit<CourseRecord, 'id' | 'createdAt' | 'updatedAt'>>
) {
  const existing = courseStore.get(id)
  if (!existing) return null
  const updated: CourseRecord = { ...existing, ...input, updatedAt: nowIso() }
  courseStore.set(id, updated)
  return updated
}

export function deleteCourse(id: string) {
  return courseStore.delete(id)
}
