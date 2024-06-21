<script lang="ts" setup>
import { useNotificationStore } from '@/@core/stores/notification/useNotification'

const { notifications, connectWebSocket, disconnectWebSocket } = useNotificationStore()
const maxNotifications = 10

onMounted(() => {
  connectWebSocket()
})

onUnmounted(() => {
  disconnectWebSocket()
})

let notificationCount = 0

watchEffect(() => {
  if (notifications.length > 0) {
    notificationCount++
    if (notificationCount === maxNotifications) {
      console.log('Disconnecting WebSocket after 10 notifications')
      disconnectWebSocket()
    }
  }
})

const removeNotification = (notificationId: number) => {
  notifications.forEach((item, index) => {
    if (notificationId === item.id) { notifications.splice(index, 1) }
  })
}

// const markRead = (notificationId: number[]) => {
//   notifications.value.forEach(item => {
//     notificationId.forEach(id => {
//       if (id === item.id) { item.isSeen = true }
//     })
//   })
// }

// const markUnRead = (notificationId: number[]) => {
//   notifications.value.forEach(item => {
//     notificationId.forEach(id => {
//       if (id === item.id) { item.isSeen = false }
//     })
//   })
// }

// const handleNotificationClick = (notification: Notification) => {
//   if (!notification.isSeen) { markRead([notification.id]) }
// }
console.log(notifications)
</script>

<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @read="markRead"
    @unread="markUnRead"
    @click:notification="handleNotificationClick"
  />
</template>
