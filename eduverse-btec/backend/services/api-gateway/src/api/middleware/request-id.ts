import crypto from 'node:crypto'

export function requestIdMiddleware(req, res, next) {
  const incoming = req.headers['x-request-id']
  const requestId = typeof incoming === 'string' ? incoming : crypto.randomUUID()
  req.requestId = requestId
  res.setHeader('x-request-id', requestId)
  next()
}
