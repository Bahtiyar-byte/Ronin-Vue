import type { RouteLocationRaw } from 'vue-router'

export default interface WidgetCardProps
{
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
