import Link from 'next/link'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-3xl font-bold">🏛️ EduverseAI - قلعة BTEC</h1>
      <Card title="Production SaaS Blueprint" description="واجهة إنتاجية مع تسعير، تحليلات، ووكيل آلي." />
      <div className="mt-6 flex gap-3">
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" href="/pricing">
          Pricing
        </Link>
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" href="/analytics">
          Analytics
        </Link>
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" href="/system-agent">
          Agent
        </Link>
      </div>
    </main>
  )
}
