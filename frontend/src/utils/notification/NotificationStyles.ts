import type { Notification } from '@/@layouts/types'

export const getNotificationColor = (notification: Notification) => {
  if (['error', 'success', 'warning'].indexOf(notification.type)) {
    return notification.type
  }

  return ''
}
export const getNotificationIcon = (notification: Notification) => {
  if (notification.type === 'error') {
    return 'mdi-alert-circle'
  } else if (notification.type === 'success') {
    return 'mdi-check-circle'
  } else if (notification.type === 'warning') {
    return 'mdi-alert'
  }

  return 'tabler-mail'
}
