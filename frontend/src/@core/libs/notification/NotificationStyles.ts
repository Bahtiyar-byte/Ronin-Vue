import type { Notification } from '@/@layouts/types'

export const getNotificationColor = (notification: Notification) => {
  switch (notification.type) {
    case 'error':
      return 'error'
  case 'success':
      return 'success'
  case 'warning':
      return 'warning'
  default:
      return ''
  }
}
export const getNotificationIcon = (notification: Notification) => {
  switch (notification.type) {
    case 'error':
      return 'mdi-alert-circle'
  case 'success':
      return 'mdi-check-circle'
  case 'warning':
      return 'mdi-alert'
  default:
      return 'tabler-mail'
  }
}
