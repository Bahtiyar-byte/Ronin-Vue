<script lang="ts" setup>
import Crew from '@/components/scheduler/Crew.vue'
import LaborTicket from '@/components/scheduler/LaborTicket.vue'

const zoomInOut = ref(10)
const dateRange = ref(5)
const min = 1
const max = 6

const currentDate = new Date()
const formattedDateStart = currentDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()

const dateRangeStart = ref(null)

const dateRanges = ref([])

// const currentDate = new Date();

// Add 5 days to the current date
const nextFifthDay = new Date()

nextFifthDay.setDate(currentDate.getDate() + dateRange.value)

const dateRangeEnd = ref(null)

const getStartDate = type => {
  let startDate = new Date()
  if (dateRangeStart.value !== null && type === 'next') {
    startDate = dateRangeStart.value
    dateRangeStart.value = new Date(startDate.setDate(startDate.getDate() + dateRange.value))
  } else if (dateRangeStart.value !== null && type === 'prev') {
    startDate = dateRangeStart.value
    dateRangeStart.value = new Date(startDate.setDate(startDate.getDate() - dateRange.value))
  } else {
    dateRangeStart.value = startDate
  }
}

getStartDate()

const getEndDate = type => {
  let endDate = new Date()
  if (dateRangeEnd.value !== null && type === 'next') {
    endDate = dateRangeEnd.value
    dateRangeEnd.value = new Date(endDate.setDate(endDate.getDate() + dateRange.value))
  } else if (dateRangeEnd.value !== null && type === 'prev') {
    endDate = dateRangeEnd.value
    dateRangeEnd.value = new Date(endDate.setDate(endDate.getDate() - dateRange.value))
  } else {
    const currentDate = new Date()
    const nextFifthDay = new Date()

    nextFifthDay.setDate(currentDate.getDate() + dateRange.value)
    dateRangeEnd.value = nextFifthDay
  }
}

getEndDate()

const getDatesBetween = (startDate, endDate) => {
  const dates = []
  const currentDateTime = new Date(startDate)

  while (currentDateTime <= endDate) {
    dates.push(new Date(currentDateTime))
    currentDateTime.setDate(currentDateTime.getDate() + 1)
  }
  dateRanges.value = dates
}

const changeEndDate = () => {
  const endDate = new Date(dateRangeStart.value)

  dateRangeEnd.value = new Date(endDate.setDate(endDate.getDate() + dateRange.value))
}

const nextCalendar = () => {
  getStartDate('next')
  getEndDate('next')
  getDatesBetween(dateRangeStart.value, dateRangeEnd.value)
}

const prevCalendar = () => {
  getEndDate('prev')
  getStartDate('prev')
  getDatesBetween(dateRangeStart.value, dateRangeEnd.value)
}

const formatDateTime = date => {
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()
}

const getYearOfDate = date => {
  const datetime = new Date(date)

  return datetime.getFullYear()
}

getDatesBetween(dateRangeStart.value, dateRangeEnd.value)

const dayOfWeek = (date: Date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return days[date.getDay()]
}

const isDateWeekend = (date: Date) => {
  const weekDayNumber: number = date.getDay()

  return !!(weekDayNumber === 0 || weekDayNumber === 6)
}

const decrement = () => {
  if (dateRange.value > min)
  { dateRange.value -= 1 }
  changeEndDate()
  getDatesBetween(dateRangeStart.value, dateRangeEnd.value)
}

const increment = () => {
  if (dateRange.value < max)
  { dateRange.value += 1 }
  changeEndDate()
  getDatesBetween(dateRangeStart.value, dateRangeEnd.value)
}

const getTodayDate = () => {
  dateRangeStart.value = null
  dateRangeEnd.value = null
  getStartDate()
  getEndDate()
  getDatesBetween(dateRangeStart.value, dateRangeEnd.value)
}

const laborTickets = [
  {
    crew: { name: 'Evans Service Crew 1', color: '#E8D213' },
    laborTickets: [
      { id: 1, name: 'KAREEM LEZAMA', startDate: '2024-09-24', endDate: '2024-09-26', trade: 'Aluminum', template: 'Flashing' },
      { id: 2, name: 'BEN ANDERS', startDate: '2024-09-24', endDate: '2024-09-25', trade: 'Aluminum', template: 'Flashing' },
    ],
  },
  {
    crew: { name: 'Evans Service Crew 2', color: '#8bc541' },
    laborTickets: [
      { id: 3, name: 'DAVID JOHNSON', startDate: '2024-09-22', endDate: '2024-09-25', trade: 'Aluminum', template: 'Flashing' },
      { id: 4, name: 'MIKE ROBINS', startDate: '2024-09-21', endDate: '2024-09-24', trade: 'Aluminum', template: 'Flashing' },
    ],
  },
]

const isTicketStarts = (dayDate: string, ticketDate: string): boolean => {
  // Convert string dates to Date objects
  const day: Date = new Date(dayDate)
  const ticket: Date = new Date(ticketDate)

  const dayYear: number = day.getFullYear()
  const dayMonth: number = day.getMonth()
  const dayDay: number = day.getDate()

  const ticketYear: number = ticket.getFullYear()
  const ticketMonth: number = ticket.getMonth()
  const ticketDay: number = ticket.getDate()

  // Compare year, month, and day for equality
  return dayYear === ticketYear && dayMonth === ticketMonth && dayDay === ticketDay
}
</script>

<template>
  <div class="scheduler__container">
    <div class="top_schedule_header">
      <div class="left__buttons">
        <div class="today__button">
          <VBtn
            color="primary"
            @click="getTodayDate"
          >
            Today
          </VBtn>
        </div>

        <div class="date_periods">
          <div class="date__period__button__style">
            <VBtn
              variant="text"
              color="primary"
              icon="tabler-arrow-left"
              rounded
              @click="prevCalendar"
            />
          </div>

          <div class="date__range">
            <div>{{ formatDateTime(dateRangeStart) }} - {{ formatDateTime(dateRangeEnd) }}</div>
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-around;
              "
            >
              <div>{{ getYearOfDate(dateRangeStart) }}</div>
              <div>{{ getYearOfDate(dateRangeEnd) }}</div>
            </div>
          </div>

          <div class="date__period__button__style">
            <VBtn
              variant="text"
              color="primary"
              icon="tabler-arrow-right"
              rounded
              @click="nextCalendar"
            />
          </div>
        </div>

        <div class="date__zoom">
          <VSlider
            v-model="dateRange"
            color="primary"
            :step="1"
            :min="min"
            :max="max"
            :thumb-label="false"
            track-color="secondary"
          >
            <template #prepend>
              <VBtn
                size="small"
                variant="text"
                icon="tabler-minus"
                color="primary"
                rounded
                @click="decrement"
              />
            </template>

            <template #append>
              <VBtn
                size="small"
                variant="text"
                icon="tabler-plus"
                color="primary"
                rounded
                @click="increment"
              />
            </template>
          </VSlider>
        </div>
      </div>

      <div class="right__buttons">
        <VMenu :close-on-content-click="false">
          <template #activator="{ props }">
            <VBtn
              color="primary"
              v-bind="props"
            >
              Filter
            </VBtn>
          </template>

          <VList
            lines="six"
            density="compact"
            select-strategy="classic"
            class="action-item-group-list"
          >
            <VListItem value="showAllScheduledEvents">
              <template #prepend="{ isActive }">
                <VListItemAction start>
                  <VCheckbox
                    :model-value="isActive"
                    color="primary"
                    class="mt-1"
                  />
                </VListItemAction>
              </template>

              <VListItemTitle>Show all Scheduled Events</VListItemTitle>
            </VListItem>

            <VListItem value="selectEvents">
              <template #prepend="{ isActive }">
                <VListItemAction start>
                  <VCheckbox
                    :model-value="isActive"
                    color="primary"
                    class="mt-1"
                  />
                </VListItemAction>
              </template>

              <VListItemTitle>Select Events</VListItemTitle>
            </VListItem>

            <VListItem value="showAllScheduledTrades">
              <template #prepend="{ isActive }">
                <VListItemAction start>
                  <VCheckbox
                    :model-value="isActive"
                    color="primary"
                    class="mt-1"
                  />
                </VListItemAction>
              </template>

              <VListItemTitle>Show all Scheduled Trades</VListItemTitle>
            </VListItem>

            <VListItem value="selectTrades">
              <template #prepend="{ isActive }">
                <VListItemAction start>
                  <VCheckbox
                    :model-value="isActive"
                    color="primary"
                    class="mt-1"
                  />
                </VListItemAction>
              </template>

              <VListItemTitle>Select Trades</VListItemTitle>
            </VListItem>

            <VListItem value="showAllScheduledCrews">
              <template #prepend="{ isActive }">
                <VListItemAction start>
                  <VCheckbox
                    :model-value="isActive"
                    color="primary"
                    class="mt-1"
                  />
                </VListItemAction>
              </template>

              <VListItemTitle>Show all Scheduled Crews</VListItemTitle>
            </VListItem>

            <VListItem value="selectCrews">
              <template #prepend="{ isActive }">
                <VListItemAction start>
                  <VCheckbox
                    :model-value="isActive"
                    color="primary"
                    class="mt-1"
                  />
                </VListItemAction>
              </template>

              <VListItemTitle>Select Crews</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </div>

    <div class="main__scheduler">
      <div class="main__scheduler__top">
        <div class="main__scheduler__top__crews">
          <b>CREWS</b>
        </div>

        <div class="main__scheduler__top__dates">
          <div
            v-for="(singleDate, indexRange) in dateRanges"
            :key="`range_${indexRange}`"
            class="main__scheduler__top__dates__single__day"
          >
            <b style="margin-right: 2px;"> {{ dayOfWeek(singleDate) }} </b> {{ formatDateTime(singleDate) }}
          </div>
        </div>
      </div>

      <div class="main__scheduler__bottom">
        <div
          v-for="(crew, index) in laborTickets"
          :key="`crew_${index}`"
          class="main__scheduler__bottom__trade"
        >
          <div class="crew__container">
            <Crew :crew="crew.crew" />
          </div>
          <div class="main__scheduler__bottom__trade__labor__tickets">
            <div class="main__scheduler__bottom__trade__content">
              <div
                v-for="(singleTicket, indexTicket) in crew.laborTickets"
                :key="`singleTicket_${indexTicket}`"
                class="main__scheduler__trade__row"
              >
                <div
                  v-for="(singleDate, indexDay) in dateRanges"
                  :key="`singleDay_${indexDay}`"
                  class="main__scheduler__bottom__trade__content__single__day"
                  :style="{ background: isDateWeekend(singleDate) ? '#E9EAF5' : '#fff' }"
                >
                  <LaborTicket
                    v-if="isTicketStarts(singleDate, singleTicket.startDate)"
                    :ticket="singleTicket"
                    :days-of-scheduler="dateRange + 1"
                    :color="crew.crew.color"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scheduler__container {
  width: 100%;
  padding-bottom: 20px;
}

.left__buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 600px;
  width: 100%;
}

.right__buttons {
  display: flex;
  justify-content: flex-start;
}

.top_schedule_header {
  padding: 10px 15px 10px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f6f6f4;
}

.date__zoom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.date_periods {
  display: flex;
  flex-direction: row;
  margin-left: 20px;
}

.date__range {
  margin-left: 5px;
  margin-right: 5px;
}

.date__period__button__style {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main__scheduler__top {
  display: flex;
  flex-direction: row;
}

.main__scheduler__top__crews {
  width: 100%;
  max-width: 125px;
  padding: 3px;
  padding-top: 10px;
  background: #ebebed;
}

.main__scheduler__top__dates {
  width: 100%;
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
  position: sticky !important;
  top: 0;
  z-index: 2000;
}

.main__scheduler__top__dates__single__day {
  min-width: 14.2%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 3px;
}

.crew__container {
  max-width: 125px;
  width: 100%;
  padding-right: 3px;
  background: #ebebed;
}

.main__scheduler__bottom {
  background-color: #fff;
}

.main__scheduler__bottom__trade {
  display: flex;
  flex-direction: row;
}

.main__scheduler__bottom__trade__labor__tickets {
  border-left: 1px solid gray;
  width: 100%;
}

.main__scheduler__bottom__trade__title {
  padding-left: 10px;
  font-weight: bold;
  background: #ebebed;
  width: 100%;
}

.main__scheduler__bottom__trade__content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.main__scheduler__bottom__trade__content__single__day {
  min-width: 14.2%;
  width: 100%;
  display: flex;
  border-right: 1px solid gray;
  min-height: 47px;
  padding: 1px 0 1px 1px;
}

.weekend__styles {
  z-index: 211;
}

.date__zoom {
  width: 100%;
  max-width: 200px;
}

.single__row {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.main__scheduler__trade__row {
  width: 100%;
  display: flex;
  flex-direction: row;
  /* margin-bottom: 2px; */
  background-color: #fff;
  position: relative;
}
</style>
