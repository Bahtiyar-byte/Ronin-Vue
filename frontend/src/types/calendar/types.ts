export interface CalendarEvent {
  id?: string
  title?: string
  start: Date | string
  end: Date | string
  extendedProps?: Record<string, any>
}
