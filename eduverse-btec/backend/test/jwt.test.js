import test from 'node:test'
import assert from 'node:assert/strict'

test('jwt secret signs and verifies payload', async (t) => {
  let jwt
  try {
    jwt = await import('jsonwebtoken')
  } catch {
    t.skip('jsonwebtoken dependency is not installed in this environment')
    return
  }

  const token = jwt.default.sign({ userId: '1', email: 'a@b.com', role: 'STUDENT' }, 'dev-secret')
  const payload = jwt.default.verify(token, 'dev-secret')
  assert.equal(payload.email, 'a@b.com')
})
