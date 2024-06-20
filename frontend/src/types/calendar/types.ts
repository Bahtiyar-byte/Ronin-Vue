import Contact from "../contacts/Contact"
import User from "../users/User"

export interface CalendarEvent {
  id?: string
  title?: string
  start: Date | string
  end: Date | string
  extendedProps?: Record<string, any>
  related_contact?: string | Contact,
  assigned_to?: User | null
}
