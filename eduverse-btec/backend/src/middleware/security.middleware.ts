import { NextFunction, Request, Response } from 'express'

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
}

const requests = new Map<string, { count: number; windowStart: number }>()

export function rateLimitMiddleware(limit = 120, windowMs = 60_000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown'
    const now = Date.now()
    const entry = requests.get(key)

    if (!entry || now - entry.windowStart > windowMs) {
      requests.set(key, { count: 1, windowStart: now })
      return next()
    }

    entry.count += 1
    if (entry.count > limit) {
      return res.status(429).json({ message: 'Too many requests' })
    }

    return next()
  }
}
