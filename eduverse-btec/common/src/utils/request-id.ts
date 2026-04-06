import crypto from 'node:crypto'

export function requestId() {
  return crypto.randomUUID()
}
