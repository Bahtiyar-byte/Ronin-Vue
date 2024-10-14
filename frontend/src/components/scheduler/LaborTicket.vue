<script lang="ts" setup>
// import LaborTicketDialogFullscreen from '@/components/scheduler/LaborTicketDialogFullscreen.vue'
import LaborTicketDialogFullscreen2 from '@/components/scheduler/LaborTicketDialogFullscreen.vue'

const props = defineProps<Props>()

interface Props {
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
  daysOfScheduler: number
  color: string,
  crew: {}
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

const contactName = ref('')

onMounted(() => {
  if (props.ticket.related_order?.related_estimate?.related_contact) {
    const contact = props.ticket.related_order?.related_estimate?.related_contact

    contactName.value = `${contact.fi} ${contact.la}`
  }
})

getDayDuration(props.ticket.start_date, props.ticket.end_date)
</script>

<template>
  <div
    class="labor__ticket"
    :style="{ width: `calc(100% / ${daysOfScheduler} * ${dayDuration} - 2px)`, background: `${color}` }"
  >

    <div class="labor__ticket__content">
<!--      <div style="background: 'yellow'; height: 30px; width: 40px;" >-->
<!--        <VBtn-->
<!--          icon="tabler-star"-->
<!--          variant="tonal"-->
<!--          color="success"-->
<!--          size="x-small"-->
<!--        />-->
<!--      </div>-->
      <span class="labor__ticket__trade">  {{ contactName }} </span>
      <!--      <span class="labor__ticket__trade">{{ ticket.trade }} / {{ ticket.name }}</span> -->
      <!--      <span class="labor__ticket__name">{{ ticket.name }}</span> -->
    </div>
    <div class="labor__ticket__details__icon">
      <LaborTicketDialogFullscreen2 :ticket="props.ticket" :color="color" :crew="props.crew" :daysOfScheduler="daysOfScheduler" />
    </div>
  </div>
</template>

<style scoped>
.labor__ticket {
  min-height: 30px;
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
  flex-direction: row;
  align-items: center;
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
