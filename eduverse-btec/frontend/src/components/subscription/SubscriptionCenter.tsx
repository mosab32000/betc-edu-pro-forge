'use client'

import { useState } from 'react'

const plans = [
  { id: 'starter', label: 'Starter' },
  { id: 'growth', label: 'Growth' },
  { id: 'enterprise', label: 'Enterprise' }
] as const

export function SubscriptionCenter() {
  const [selected, setSelected] = useState<typeof plans[number]['id']>('starter')
  const [message, setMessage] = useState('')

  function handleSubscribe() {
    setMessage(`تم تفعيل اشتراك ${selected} بنجاح (محاكاة محلية)`)
  }

  return (
    <section className="space-y-3 rounded-lg border p-4">
      <h2 className="text-xl font-semibold">إدارة الاشتراكات</h2>
      <select className="rounded border p-2" value={selected} onChange={(e) => setSelected(e.target.value as any)}>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.label}
          </option>
        ))}
      </select>
      <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={handleSubscribe}>
        تفعيل الخطة
      </button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
    </section>
  )
}
