import { apiClient } from './client'

export const authApi = {
  login: (data: { email: string; password: string }) => apiClient.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string }) => apiClient.post('/auth/register', data),
  me: () => apiClient.get('/auth/me')
}

export const subscriptionApi = {
  plans: () => apiClient.get('/subscriptions/plans'),
  current: () => apiClient.get('/subscriptions/current'),
  subscribe: (planId: 'starter' | 'growth' | 'enterprise') => apiClient.post('/subscriptions/subscribe', { planId })
}

export const analyticsApi = {
  kpis: () => apiClient.get('/analytics/kpis'),
  executiveReport: () => apiClient.get('/analytics/executive-report')
}
