import { Router } from 'express'
import { login, register } from '../controllers/auth.controller.ts'

export const routes = Router()
routes.post('/auth/login', login)
routes.post('/auth/register', register)
routes.get('/health', (_req, res) => res.json({ status: 'ok', service: 'auth-service' }))
