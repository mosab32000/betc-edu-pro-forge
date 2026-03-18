import { Request, Response } from 'express'
import { z } from 'zod'
import { getSubscription, setSubscription } from '../services/subscription.service'

const plans = [
  { id: 'starter', name: 'Starter', monthlyPrice: 49, limits: { users: 50, aiCalls: 5000 } },
  { id: 'growth', name: 'Growth', monthlyPrice: 149, limits: { users: 300, aiCalls: 40000 } },
  { id: 'enterprise', name: 'Enterprise', monthlyPrice: 499, limits: { users: 2000, aiCalls: 500000 } }
] as const

const subscribeSchema = z.object({
  planId: z.enum(['starter', 'growth', 'enterprise'])
})

export async function listPlans(_req: Request, res: Response) {
  return res.json({ plans })
}

export async function subscribe(req: Request, res: Response) {
  const { planId } = subscribeSchema.parse(req.body)
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ message: 'Unauthorized' })

  const subscription = setSubscription(userId, planId)
  return res.status(201).json({ message: 'Subscription activated', subscription })
}

export async function currentSubscription(req: Request, res: Response) {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ message: 'Unauthorized' })

  const subscription = getSubscription(userId)
  return res.json({ subscription })
}
