import type { App } from 'vue'

import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'

import { setupGuards } from './guards'

function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++) {
      route.children[i] = recursiveLayouts(route.children[i])
    }

    return route
  }

  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 60 }
    }

    return { top: 0 }
  },
  extendRoutes: pages => [
    ...[...pages].map(route => recursiveLayouts(route)),
  ],
})

router.beforeEach(async to => {
  const accessToken = useCookie('accessToken').value
  const isAuthRoute = to.fullPath.includes('/auth/')
  const isAuthenticated = accessToken !== null && accessToken !== undefined

  if (!isAuthRoute && !isAuthenticated) {
    return { name: 'auth-login' }
  }

  const userStore = useCurrentUserStore()

  if (!isAuthRoute && !userStore.user) {
    const { response } = await userStore.fetchUser()

    watch(response, (newVal: Response | null) => {
      if (newVal === null) {
        return
      }

      if (newVal.status > 400) {
        router.replace({ name: 'auth-login' })
      }
    })
  }

  if (isAuthRoute && isAuthenticated) {
    return { name: 'root' }
  }
})

// setupGuards(router)

export { router }

export default function (app: App) {
  app.use(router)
}
