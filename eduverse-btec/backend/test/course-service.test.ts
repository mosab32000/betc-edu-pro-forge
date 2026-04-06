import test from 'node:test'
import assert from 'node:assert/strict'
import { createCourse, deleteCourse, getCourseById, listCourses, updateCourse } from '../src/services/course.service.ts'

test('course service supports CRUD flow', () => {
  const before = listCourses().length

  const created = createCourse({
    title: 'BTEC Security Fundamentals',
    level: 'L3',
    btecUnit: 'U3',
    published: false
  })

  assert.ok(created.id)
  assert.equal(listCourses().length, before + 1)

  const fetched = getCourseById(created.id)
  assert.ok(fetched)
  assert.equal(fetched?.title, 'BTEC Security Fundamentals')

  const updated = updateCourse(created.id, { published: true })
  assert.equal(updated?.published, true)

  const removed = deleteCourse(created.id)
  assert.equal(removed, true)
  assert.equal(getCourseById(created.id), null)
})
