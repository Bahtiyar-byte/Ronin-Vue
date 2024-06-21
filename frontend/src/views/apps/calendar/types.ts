import type { Except } from 'type-fest'
import type { CalendarEvent } from '@/types/calendar/types'
import type Appointment from '@/types/appointments/Appointment'

export interface Event extends CalendarEvent {
  extendedProps: {
    description: string
    objectData?: Appointment
    relatedContact?: string
    assignedTo?: string
  }
}

export type NewEvent = Except<Event, 'id'>
