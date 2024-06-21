import type { CalendarApi, CalendarOptions, EventApi, EventSourceFunc } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { Event, NewEvent } from './types'
import { useConfigStore } from '@core/stores/config'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import type Appointment from '@/types/appointments/Appointment'

export const blankEvent: Event | NewEvent = {
  title: '',
  start: '',
  end: '',
  extendedProps: {
    description: '',
  },
}

export const useCalendar = (event: Ref<Event | NewEvent>, isEventHandlerSidebarActive: Ref<boolean>, isLeftSidebarOpen: Ref<boolean>) => {
  const configStore = useConfigStore()

  // 👉 Store
  const store = useCalendarStore()

  // 👉 Calendar template ref
  const refCalendar = ref()

  // ℹ️ Extract event data from event API
  const extractEventDataFromEventApi = (eventApi: EventApi) => {
    // @ts-expect-error EventApi has extendProps type Dictionary (Record<string, any>) and we have fully typed extended props => Type conflict
    const {
      id,
      title,
      start,
      end,
      extendedProps: { description, objectData, relatedContact, assignedTo },
    }: Event = eventApi

    return {
      id,
      title,
      start,
      end,
      extendedProps: {
        description,
        objectData,
        relatedContact,
        assignedTo,
      },
    }
  }

  // @ts-expect-error for nuxt workaround
  if (typeof process !== 'undefined' && process.server) {
    store.fetchEvents()
  }

  const appointmentToRawEvent = (a: Appointment): Event => {
    const getEntityId = (relatedEntity: string | { id?: string } | undefined): string => {
      if (typeof relatedEntity === 'string') {
        return relatedEntity
      }

      return relatedEntity?.id ?? ''
    }

    return {
      id: a.id,
      title: a.subject,

      // Convert string representation of date to Date object
      start: new Date(<string>a.start_time),
      end: new Date(<string>a.end_time),
      extendedProps: {
        description: a.notes as string,
        objectData: a,
        relatedContact: getEntityId(a.related_contact) as string,
        assignedTo: getEntityId(a.assigned_to) as string,
      },
    }
  }

  // 👉 Fetch events
  const fetchEvents: EventSourceFunc = (info, successCallback) => {
    // If there's no info => Don't make useless API call
    if (!info) {
      return
    }

    store.fetchEvents()
      .then(r => {
        if (r === null || r.rows === undefined) {
          return
        }

        successCallback(r.rows.map((a: Appointment) => appointmentToRawEvent(a)))
      })
      .catch(e => {
        console.error('Error occurred while fetching calendar events', e)
      })
  }

  // 👉 Calendar API
  const calendarApi = ref<null | CalendarApi>(null)

  // 👉 Update event in calendar [UI]
  const updateEventInCalendar = (updatedEventData: Event, propsToUpdate: (keyof Event)[], extendedPropsToUpdate: (keyof Event['extendedProps'])[]) => {
    const existingEvent = calendarApi.value?.getEventById(String(updatedEventData.id))

    if (!existingEvent) {
      console.warn('Can\'t found event in calendar to update')

      return
    }

    // ---Set event properties except date related
    // Docs: https://fullcalendar.io/docs/Event-setProp
    // dateRelatedProps => ['start', 'end', 'allDay']
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]

      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // --- Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end)

    // --- Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]

      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }

  // 👉 Remove event in calendar [UI]
  const removeEventInCalendar = (eventId: string) => {
    const _event = calendarApi.value?.getEventById(eventId)

    if (_event) {
      _event.remove()
    }
  }

  // 👉 refetch events
  const refetchEvents = () => {
    calendarApi.value?.refetchEvents()
  }

  // 👉 Add event
  const addEvent = (_event: NewEvent) => {
    store.addEvent(_event)
      .then(({ isFetching }) => {
        watch(isFetching, () => {
          refetchEvents()
        })
      })
  }

  // 👉 Update event
  const updateEvent = (_event: Event) => {
    // ℹ️ Making API call using $api('', { method: ... })
    store.updateEvent(_event)
      .then(r => {
        const { data } = r

        watch(data, newVal => {
          if (newVal === null) {
            throw new Error('Error on updating appointment')
          }

          const propsToUpdate = ['id', 'title'] as (keyof Event)[]
          const extendedPropsToUpdate = ['description', 'objectData'] as (keyof Event['extendedProps'])[]

          const rawEvent = {
            ...appointmentToRawEvent(newVal),
            extendedProps: {
              description: newVal.notes,
              objectData: newVal,
            },
          } as Event

          updateEventInCalendar(rawEvent, propsToUpdate, extendedPropsToUpdate)
        })
      })
      .finally(() => {
        refetchEvents()
      })
  }

  // 👉 Remove event
  const removeEvent = (eventId: string) => {
    store.removeEvent(eventId).then(() => {
      removeEventInCalendar(eventId)
    })
  }

  // 👉 Calendar options
  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'drawerToggler,prev,next title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    events: fetchEvents,

    // ❗ We need this to be true because when its false and event is allDay event and end date is same as start data then Full calendar will set end to null
    forceEventDuration: true,

    /*
    Enable dragging and resizing event
    Docs: https://fullcalendar.io/docs/editable
  */
    editable: true,

    /*
    Enable resizing event from start
    Docs: https://fullcalendar.io/docs/eventResizableFromStart
  */
    eventResizableFromStart: true,

    /*
    Automatically scroll the scroll-containers during event drag-and-drop and date selecting
    Docs: https://fullcalendar.io/docs/dragScroll
  */
    dragScroll: true,

    /*
    Max number of events within a given day
    Docs: https://fullcalendar.io/docs/dayMaxEvents
  */
    dayMaxEvents: 2,

    /*
    Determines if day names and week names are clickable
    Docs: https://fullcalendar.io/docs/navLinks
  */
    navLinks: true,

    eventClassNames() {
      return [
        // Background Color
        'bg-light-primary text-primary',
      ]
    },

    eventClick({ event: clickedEvent, jsEvent }) {
      // Prevent the default action
      jsEvent.preventDefault()

      if (clickedEvent.url) {
        // Open the URL in a new tab
        window.open(clickedEvent.url, '_blank')
      }

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      event.value = extractEventDataFromEventApi(clickedEvent)

      isEventHandlerSidebarActive.value = true
    },

    // customButtons
    dateClick(info) {
      event.value = { ...event.value, start: info.date }

      isEventHandlerSidebarActive.value = true
    },

    /*
      Handle event drop (Also include dragged event)
      Docs: https://fullcalendar.io/docs/eventDrop
      We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      updateEvent(extractEventDataFromEventApi(droppedEvent))
    },

    /*
      Handle event resize
      Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      if (resizedEvent.start && resizedEvent.end) {
        updateEvent(extractEventDataFromEventApi(resizedEvent))
      }
    },

    customButtons: {
      drawerToggler: {
        text: 'calendarDrawerToggler',
        click() {
          isLeftSidebarOpen.value = true
        },
      },
    },
  } as CalendarOptions

  // 👉 onMounted
  onMounted(() => {
    calendarApi.value = refCalendar.value.getApi()
  })

  // 👉 Jump to date on sidebar(inline) calendar change
  const jumpToDate = (currentDate: string) => {
    calendarApi.value?.gotoDate(new Date(currentDate))
  }

  watch(
    () => configStore.isAppRTL,
    val => {
      calendarApi.value?.setOption('direction', val ? 'rtl' : 'ltr')
    },
    { immediate: true },
  )

  return {
    refCalendar,
    calendarOptions,
    refetchEvents,
    fetchEvents,
    addEvent,
    updateEvent,
    removeEvent,
    jumpToDate,
  }
}
