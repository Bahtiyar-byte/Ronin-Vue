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

const removeNotification = (notificationMessage: string) => {
  // TODO:  delete function for notifications with id
  notifications.forEach((item, index) => {
    if (notificationMessage === item.message) { notifications.splice(index, 1) }
  })
}

const markRead = (notificationId: number[]) => {
  // TODO:  read function for notifications
}

const markUnRead = (notificationId: number[]) => {
  // TODO:  unread function for notifications
}

const handleNotificationClick = (notification: Notification) => {
}
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
