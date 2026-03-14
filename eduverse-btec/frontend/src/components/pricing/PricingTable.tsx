const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49',
    features: ['50 users', '5K AI calls/month', 'Email support']
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$149',
    features: ['300 users', '40K AI calls/month', 'Priority support']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$499',
    features: ['2000 users', '500K AI calls/month', 'Dedicated success manager']
  }
]

export function PricingTable() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <article key={plan.id} className="rounded-lg border p-4 shadow-sm">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="my-2 text-2xl">{plan.price}</p>
          <ul className="list-disc space-y-1 pr-4 text-sm">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
