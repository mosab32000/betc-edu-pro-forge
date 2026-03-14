import test from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'

test('jwt secret signs and verifies payload', () => {
  const token = jwt.sign({ userId: '1', email: 'a@b.com', role: 'STUDENT' }, 'dev-secret')
  const payload = jwt.verify(token, 'dev-secret')
  assert.equal(payload.email, 'a@b.com')
})
