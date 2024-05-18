import type { App } from 'vue'

import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'

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

  if (!~to.fullPath.indexOf('/auth/') && (accessToken === null || accessToken === undefined)) {
    return { name: 'auth-login' }
  }

  const userStore = useCurrentUserStore()

  if (!userStore.user) {
    try {
      await userStore.fetchUser()
    } catch (error) {
      return { name: 'auth-login' }
    }
  }
})

export { router }

export default function (app: App) {
  app.use(router)
}
