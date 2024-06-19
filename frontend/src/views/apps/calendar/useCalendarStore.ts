import type { Event, NewEvent } from './types'
import { useAppointments } from '@/composables/useAppointments'
import type Appointment from '@/types/appointments/Appointment'

const { getList, update: updateAppointment } = useAppointments()

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
      if (event.extendedProps.objectData === undefined) {
        throw new Error('objectData is not defined')
      }

      const appointment = prepareEntityToUpdate(event.extendedProps.objectData) as Appointment

      console.log(event.start)

      appointment.start_time = (<Date>event.start).toISOString()
      appointment.end_time = (<Date>event.end).toISOString()
      appointment.subject = event.title as string

      return await updateAppointment(appointment)
    },
    async removeEvent(eventId: string) {
      return await $api(`/apps/calendar/${eventId}`, {
        method: 'DELETE',
      })
    },

  },
})
