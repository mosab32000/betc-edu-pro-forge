import * as React from 'react'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`rounded bg-amber-700 px-4 py-2 text-white ${props.className || ''}`} />
}
