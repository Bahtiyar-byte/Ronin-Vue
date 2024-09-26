import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'
import type { CurrentUser } from '@/types/users/User'
import { resolveUserName } from '@/utils/auth'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: null as CurrentUser | null,
    isFetching: false,
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
      if (this.isFetching) {
        return {
          response: ref(null),
        }
      }

      const {
        data,
        response,
        isFetching,
      } = await useAuth().me()

      watch(isFetching, newVal => {
        this.isFetching = newVal
      }, { immediate: true })

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
