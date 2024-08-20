import type { App } from 'vue'

import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'

import { redirects, routes } from './additional-routes'
import { setupGuards } from './guards'

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
    ...redirects,
    ...[
      ...pages,
      ...routes,
    ].map(route => recursiveLayouts(route)),
  ],
})

router.beforeEach(async to => {
  const userStore = useCurrentUserStore()

  if (to.meta.public !== true && to.meta.unauthenticatedOnly !== true && !userStore.user) {
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
})

setupGuards(router)

export { router }

export default function (app: App) {
  app.use(router)
}
