'use client'

import { useState } from 'react'

export function AgentPanel() {
  const [task, setTask] = useState('')
  const [result, setResult] = useState('')

  async function run() {
    setResult(`Agent queued task: ${task}`)
  }

  return (
    <section className="space-y-3 rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Autonomous Agent</h2>
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="أدخل مهمة الوكيل"
        className="w-full rounded border p-2"
      />
      <button onClick={run} className="rounded bg-slate-900 px-4 py-2 text-white">
        تشغيل الوكيل
      </button>
      {result ? <p className="text-sm text-green-700">{result}</p> : null}
    </section>
  )
}
