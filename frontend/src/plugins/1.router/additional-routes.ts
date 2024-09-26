import type { RouteRecordRaw } from 'vue-router/auto'

// 👉 Redirects
export const redirects: RouteRecordRaw[] = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  // {
  //   path: '/',
  //   name: 'index',
  //   redirect: to => {
  //     const userData = useCookie<Record<string, unknown> | null | undefined>('userData')
  //     const userRole = userData.value?.role
  //
  //     if (userRole === 'admin')
  //       return { name: 'dashboards-crm' }
  //     if (userRole === 'client')
  //       return { name: 'access-control' }
  //
  //     return { name: 'login', query: to.query }
  //   },
  // },
]

export const routes: RouteRecordRaw[] = [
  // Email filter
  // {
  //   path: '/apps/email/filter/:filter',
  //   name: 'apps-email-filter',
  //   component: emailRouteComponent,
  //   meta: {
  //     navActiveLink: 'apps-email',
  //     layoutWrapperClasses: 'layout-content-height-fixed',
  //   },
  // },
]
