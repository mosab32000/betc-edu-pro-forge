export function Card({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-lg border p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </section>
  )
}
