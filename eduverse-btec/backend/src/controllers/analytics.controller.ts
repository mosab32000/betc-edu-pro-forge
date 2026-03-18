import { Request, Response } from 'express'

export async function getKpis(_req: Request, res: Response) {
  return res.json({
    mrr: 12450,
    activeUsers: 872,
    churnRate: 0.026,
    aiResponseP95Ms: 1100,
    uptime30d: 99.96
  })
}

export async function getExecutiveReport(_req: Request, res: Response) {
  return res.json({
    reportPeriod: '30d',
    revenue: { mrr: 12450, arrProjected: 149400 },
    growth: { newTenants: 18, expansionRevenue: 3200 },
    risk: { churnRiskAccounts: 7, incidentsSev1: 0 }
  })
}
