import { Request, Response } from 'express'
import { z } from 'zod'

const plans = [
  { id: 'starter', name: 'Starter', monthlyPrice: 49, limits: { users: 50, aiCalls: 5000 } },
  { id: 'growth', name: 'Growth', monthlyPrice: 149, limits: { users: 300, aiCalls: 40000 } },
  { id: 'enterprise', name: 'Enterprise', monthlyPrice: 499, limits: { users: 2000, aiCalls: 500000 } }
]

const subscribeSchema = z.object({
  planId: z.enum(['starter', 'growth', 'enterprise'])
})

export async function listPlans(_req: Request, res: Response) {
  return res.json({ plans })
}

export async function subscribe(req: Request, res: Response) {
  const { planId } = subscribeSchema.parse(req.body)
  return res.status(201).json({
    message: 'Subscription activated',
    subscription: {
      userId: req.user?.id,
      planId,
      startedAt: new Date().toISOString(),
      status: 'active'
    }
  })
}
