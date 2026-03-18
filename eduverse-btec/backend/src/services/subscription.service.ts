export type PlanId = 'starter' | 'growth' | 'enterprise'

export interface SubscriptionRecord {
  userId: string
  planId: PlanId
  status: 'active' | 'canceled'
  startedAt: string
  renewedAt?: string
}

const subscriptions = new Map<string, SubscriptionRecord>()

export function setSubscription(userId: string, planId: PlanId): SubscriptionRecord {
  const now = new Date().toISOString()
  const record: SubscriptionRecord = {
    userId,
    planId,
    status: 'active',
    startedAt: subscriptions.get(userId)?.startedAt || now,
    renewedAt: now
  }
  subscriptions.set(userId, record)
  return record
}

export function getSubscription(userId: string): SubscriptionRecord | null {
  return subscriptions.get(userId) || null
}
