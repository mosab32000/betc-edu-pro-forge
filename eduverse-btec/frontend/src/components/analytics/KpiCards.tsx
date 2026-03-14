const kpis = [
  { label: 'MRR', value: '$12,450' },
  { label: 'Active Users', value: '872' },
  { label: 'Churn', value: '2.6%' },
  { label: 'AI P95', value: '1.1s' }
]

export function KpiCards() {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="rounded border p-4">
          <p className="text-sm text-slate-500">{kpi.label}</p>
          <p className="text-2xl font-bold">{kpi.value}</p>
        </div>
      ))}
    </div>
  )
}
