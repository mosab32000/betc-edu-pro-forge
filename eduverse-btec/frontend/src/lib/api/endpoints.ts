import { apiClient } from './client'

export const authApi = {
  login: (data: { email: string; password: string }) => apiClient.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string }) => apiClient.post('/auth/register', data)
}
