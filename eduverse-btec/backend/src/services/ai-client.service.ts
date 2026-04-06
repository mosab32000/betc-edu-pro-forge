const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000'

export async function askAiService(payload: { message: string; context: string; userId: string }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 4000)
  try {
    const response = await fetch(`${AI_SERVICE_URL}/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: payload.message,
        context: payload.context,
        user_id: payload.userId,
        language: 'ar'
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      throw new Error(`AI service error: ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}
