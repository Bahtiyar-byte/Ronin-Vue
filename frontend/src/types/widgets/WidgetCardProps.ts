import type { RouteLocationRaw } from 'vue-router'
import type { AbilityRule } from '@/types/roles/roles'

export default interface WidgetCardProps
{
  permission?: AbilityRule
  action?: () => void
  to?: RouteLocationRaw
  widget: {
    title: string
    value?: string | number
    desc?: string
    icon: string
    iconColor?: string
    change?: number
    action?: {
      title: string
      icon: string
      to: RouteLocationRaw
    }
  }
}
