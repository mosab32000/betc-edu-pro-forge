'use client'

export function useLandmarks() {
  return { landmarks: [] as Array<{ id: string; name: string }> }
}
