import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'
import type { CurrentUser } from '@/types/users/User'
import { resolveUserName } from '@/utils/auth'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: null as CurrentUser | null,
  }),
  getters: {
    userName: state => {
      if (!state.user) {
        return ''
      }

      return resolveUserName(state.user)
    },
  },
  actions: {
    async fetchUser() {
      const { data, response } = await useAuth().me()

      watch(data, (newVal: CurrentUser | null) => {
        this.user = newVal as CurrentUser
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
    setUser(user: CurrentUser) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
