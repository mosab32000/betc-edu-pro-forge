import { create } from 'zustand'

type AppState = {
  user: { email: string; name?: string } | null
  setUser: (user: AppState['user']) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))
