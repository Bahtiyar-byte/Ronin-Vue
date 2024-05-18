import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'
import type User from '@/types/users/User'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await useAuth().me()

      watch(data, (newVal: User | null) => {
        this.user = newVal
      })

      watch(error, newVal => {
        console.log(newVal)
      })
    },
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
