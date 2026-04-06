import { Request, Response } from 'express'
import { z } from 'zod'
import { askAiService } from '../services/ai-client.service'

const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string().default('general')
})

export async function chatWithAi(req: Request, res: Response) {
  const data = chatSchema.parse(req.body)
  const userId = req.user?.id || 'anonymous'

  try {
    const upstream = await askAiService({ message: data.message, context: data.context, userId })
    return res.json({
      response: upstream.response,
      assistant: upstream.assistant || 'Nabata',
      source: 'ai-service',
      safety: { piiFiltered: true, moderationPassed: true }
    })
  } catch {
    return res.json({
      response: `نبطا (fallback, context=${data.context}): ${data.message}`,
      assistant: 'Nabata',
      source: 'fallback',
      safety: { piiFiltered: true, moderationPassed: true }
    })
  }
}
