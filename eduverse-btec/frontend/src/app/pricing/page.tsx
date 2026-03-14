import { PricingTable } from '@/components/pricing/PricingTable'

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Pricing & Subscriptions</h1>
      <PricingTable />
    </main>
  )
}
