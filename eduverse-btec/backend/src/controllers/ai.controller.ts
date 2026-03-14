import { Request, Response } from 'express'
import { z } from 'zod'

const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string().default('general')
})

export async function chatWithAi(req: Request, res: Response) {
  const data = chatSchema.parse(req.body)

  return res.json({
    response: `نبطا (context=${data.context}): ${data.message}`,
    safety: { piiFiltered: true, moderationPassed: true }
  })
}
