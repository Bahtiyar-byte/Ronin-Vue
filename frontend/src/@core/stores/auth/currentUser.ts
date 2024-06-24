import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'
import type User from '@/types/users/User'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser() {
      const { data, response } = await useAuth().me()

      watch(data, (newVal: User | null) => {
        this.user = newVal
      })

      watch(response, (newVal: Response | null) => {
        if (newVal === null) {
          return
        }

        if (newVal.status > 400) {
          useCookie('accessToken').value = null
        }
      })

      return { response }
    },
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
  hydrate: (storeState, initialState) => {
    console.log(initialState)
  },
})
