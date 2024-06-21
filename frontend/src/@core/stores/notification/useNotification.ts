import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'

interface Notification {
  id: string
  message: string
  timestamp: string
}

interface WebSocketOptions {
  headers: Record<string, string>
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications: Ref<Notification[]> = ref([])
  const ws: Ref<WebSocket | null> = ref(null)

  const connectWebSocket = () => {
    const accessToken = useCookie('accessToken').value

    if (!accessToken) {
      console.error('No access token found')

      return
    }

    const url = `ws://127.0.0.1:8080/ws/notifications/?token=${accessToken}`

    ws.value = new WebSocket(url)

    ws.value.onopen = () => {
      console.log('WebSocket connection opened')
    }

    ws.value.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)

      notifications.value.push({
        id: data.id,
        message: data.message,
        timestamp: data.timestamp,
      })
    }

    ws.value.onerror = error => {
      console.error('WebSocket error:', error)
    }

    ws.value.onclose = () => {
      console.log('WebSocket connection closed')
      ws.value = null
    }
  }

  const disconnectWebSocket = () => {
    if (ws.value) {
      ws.value.close()
    }
  }

  return {
    notifications,
    connectWebSocket,
    disconnectWebSocket,
  }
})
