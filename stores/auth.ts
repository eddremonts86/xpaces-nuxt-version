import type { User } from '@/types/Global'
import { defineStore } from 'pinia'

export const useMyAuthStore = defineStore({
  id: 'myAuthStore',
  state: () => ({
    token: '',
    isAuthenticated: false,
    user: null as User | null,
    userId: undefined as string | undefined,
  }),
  actions: {
    updateSore(user: User | null, token: string, isAuthenticated: boolean) {
      this.user = user
      this.userId = user?.sub
      this.token = token
      this.isAuthenticated = isAuthenticated
    },
  },
  getters: {
    getUser: (state): User | null => state.user,
    getUserId: (state): String | undefined => state.userId,
    getUserToken: (state): string => state.token,
    getAuthenticatedUser: (state): boolean => state.isAuthenticated,
  },
})
