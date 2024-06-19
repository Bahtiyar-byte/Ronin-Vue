import type { Event, NewEvent } from './types'
import { useAppointments } from '@/composables/useAppointments'
import type Appointment from '@/types/appointments/Appointment'

const { getList, update: updateAppointment, create: createAppointment, deleteAppointment } = useAppointments()

const eventToAppointment = (e: Event): Appointment => {
  let appointment: Appointment = {}

  if (e.extendedProps.objectData !== undefined) {
    appointment = {
      ...prepareEntityToUpdate(e.extendedProps.objectData),
    }
  }

  if (e.start instanceof Date) {
    appointment.start_time = e.start.toISOString()
  } else {
    appointment.start_time = e.start
  }

  if (e.end instanceof Date) {
    appointment.end_time = e.end.toISOString()
  } else {
    appointment.end_time = e.end
  }

  appointment.notes = e.extendedProps.description
  appointment.subject = e.title as string

  return appointment
}

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
      const appointment = eventToAppointment(event)

      return await createAppointment(appointment)
    },
    async updateEvent(event: Event) {
      if (event.extendedProps.objectData === undefined) {
        throw new Error('objectData is not defined')
      }

      const appointment = eventToAppointment(event)

      return await updateAppointment(appointment)
    },
    async removeEvent(eventId: string) {
      return await deleteAppointment({
        id: eventId,
      })
    },
  },
})
