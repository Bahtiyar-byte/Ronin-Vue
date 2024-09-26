<script lang="ts" setup>
// import LaborTicketDialogFullscreen from '@/components/scheduler/LaborTicketDialogFullscreen.vue'
import LaborTicketDialogFullscreen2 from '@/components/scheduler/LaborTicketDialogFullscreen.vue'

const props = defineProps<Props>()

interface Props {
  ticket: { id: number; name: string; startDate: string; endDate: string; trade: string; template: string }
  daysOfScheduler: number
  color: string
}

const dayDuration = ref(1)

const getDayDuration = (startDate: string, endDate: string): void => {
  // Convert the startDate and endDate from strings to Date objects
  const start: Date = new Date(startDate)
  const end: Date = new Date(endDate)

  // Get the time difference in milliseconds
  const timeDiff: number = end.getTime() - start.getTime()

  // Convert time difference from milliseconds to days
  const dayDiff: number = timeDiff / (1000 * 3600 * 24) + 1// 1000 ms/s, 3600 s/h, 24 h/day

  dayDuration.value = dayDiff
}

getDayDuration(props.ticket.startDate, props.ticket.endDate)
</script>

<template>
  <div
    class="labor__ticket"
    :style="{ width: `calc(100% / ${daysOfScheduler} * ${dayDuration} - 2px)`, background: `${color}` }"
  >
    <div class="labor__ticket__content">
      <span class="labor__ticket__trade">{{ ticket.trade }} / {{ ticket.template }}</span>
      <span class="labor__ticket__name">{{ ticket.name }}</span>
    </div>
    <div class="labor__ticket__details__icon">
      <LaborTicketDialogFullscreen2 />
    </div>
  </div>
</template>

<style scoped>
.labor__ticket {
  min-height: 47px;
  color: #000;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  margin-right: 5px !important;
  padding-left: 5px;
}

.labor__ticket__content{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.labor__ticket__trade {
  font-size: 0.7em;
}

.labor__ticket__name {
  font-size: 0.7em;
}

.labor__ticket__details__icon {
  display: flex;
  align-items: center;
  max-width: 30px;
  width: 100%;
  background: #edfadc;
}
</style>
