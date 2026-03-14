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
