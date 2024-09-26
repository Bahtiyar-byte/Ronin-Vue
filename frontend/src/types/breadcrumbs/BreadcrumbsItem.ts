import type { RouteLocationRaw } from 'vue-router'

export interface BreadcrumbsItem {
  title: string
  disabled?: boolean
  href?: string
  replace?: boolean | undefined
  to?: RouteLocationRaw | undefined
  exact?: boolean | undefined
}
