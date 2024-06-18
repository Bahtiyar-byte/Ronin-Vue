import type { Event, NewEvent } from './types'
import { useAppointments } from '@/composables/useAppointments'

const { getList } = useAppointments()

export const useCalendarStore = defineStore('calendar', {
  // arrow function recommended for full type inference
  state: () => ({

  }),
  actions: {
    async fetchEvents() {
      const { data } = await getList({})

      return data.value
    },
    async addEvent(event: NewEvent) {
      await $api('/apps/calendar', {
        method: 'POST',
        body: event,
      })
    },
    async updateEvent(event: Event) {
      return await $api(`/apps/calendar/${event.id}`, {
        method: 'PUT',
        body: event,
      })
    },
    async removeEvent(eventId: string) {
      return await $api(`/apps/calendar/${eventId}`, {
        method: 'DELETE',
      })
    },

  },
})
