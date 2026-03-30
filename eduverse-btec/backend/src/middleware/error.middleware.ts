import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message }))
    })
  }

  return res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
}
