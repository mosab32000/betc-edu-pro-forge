import { KpiCards } from '@/components/analytics/KpiCards'

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <KpiCards />
    </main>
  )
}
