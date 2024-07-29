<script lang="ts" setup>
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import Fleet from '@/components/scheduler/Fleet.vue'

definePage({
  meta: {
    action: 'manage',
    subject: 'basicActions',
    layoutWrapperClasses: 'layout-content-height-fixed',
  },
})

const state = reactive({
  chartStartDate: '2024-07-23 00:00',
  chartEndDate: '2024-07-24 00:00',
})

const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000

const handlePreviousWeek = () => {
  const date = new Date(state.chartStartDate)
  const previousDate = new Date(date.getTime() - twoDaysInMillis)

  state.chartEndDate = state.chartStartDate
  state.chartStartDate = dayjs(previousDate).format('YYYY-MM-DD HH:mm')
}

const handleNextWeek = () => {
  const date = new Date(state.chartEndDate)
  const nextDate = new Date(date.getTime() + twoDaysInMillis)

  state.chartStartDate = state.chartEndDate
  state.chartEndDate = dayjs(nextDate).format('YYYY-MM-DD HH:mm')
}

const row1BarList = ref([
  {
    myBeginDate: '2024-07-24 13:00',
    myEndDate: '2024-07-25 19:00',
    ganttBarConfig: {
      // each bar must have a nested ganttBarConfig object ...
      id: 'unique-id-1', // ... and a unique "id" property
      hasHandles: true,
      label: 'Shingles',
    },
  },
])

const row2BarList = ref([
  {
    myBeginDate: '2024-07-24 00:00',
    myEndDate: '2024-07-25 02:00',
    ganttBarConfig: {
      id: 'another-unique-id-2',
      label: 'Gutters',
      hasHandles: true,
      style: {
        // arbitrary CSS styling for your bar
        background: '#e09b69',
        borderRadius: '20px',
        color: 'black',
      },
    },
  },
])

const row3BarList = ref([
  {
    myBeginDate: '2024-07-24 00:00',
    myEndDate: '2024-07-25 02:00',
    ganttBarConfig: {
      id: 'another-unique-id-3',
      label: 'Soffit',
      hasHandles: true,
      style: {
        // arbitrary CSS styling for your bar
        background: 'purple',
        borderRadius: '20px',
        color: 'white',
      },
    },
  },
])

const row4BarList = ref([
  {
    myBeginDate: '2024-07-24 00:00',
    myEndDate: '2024-07-25 02:00',
    ganttBarConfig: {
      id: 'another-unique-id-4',
      label: 'Tile',
      hasHandles: true,
      style: {
        // arbitrary CSS styling for your bar
        background: '#e09b69',
        borderRadius: '20px',
        color: 'black',
      },
    },
  },
])

const row5BarList = ref([
  {
    myBeginDate: '2024-07-24 00:00',
    myEndDate: '2024-07-25 02:00',
    ganttBarConfig: {
      id: 'another-unique-id-5',
      label: 'Flat Roof',
      hasHandles: true,
      style: {
        // arbitrary CSS styling for your bar
        background: '#e09b69',
        borderRadius: '20px',
        color: 'black',
      },
    },
  },
])
</script>

<template>
  <div>
    <VCard>
      <div class="demo-space-x">
        <VBtn
          icon="tabler-arrow-left"
          rounded
          @click="handlePreviousWeek"
        />
        <VBtn
          icon="tabler-arrow-right"
          rounded
          @click="handleNextWeek"
        />
      </div>

      <!-- <VLayout> -->
      <GGanttChart
        :chart-start="state.chartStartDate"
        :chart-end="state.chartEndDate"
        bar-start="myBeginDate"
        bar-end="myEndDate"
        push-on-overlap
        precision="hour"
      >
        <GGanttRow
          label="Crew 1"
          style="color: 'red' !important"
          :bars="row1BarList"
        />
        <GGanttRow
          label="Crew 2"
          :bars="row2BarList"
        />
        <GGanttRow
          label="Crew 3"
          :bars="row3BarList"
        />
        <GGanttRow
          label="Crew 4"
          :bars="row4BarList"
        />
        <GGanttRow
          label="Crew 5"
          :bars="row5BarList"
        />
      </GGanttChart>
      <!-- </VLayout> -->
    </VCard>

    <!-- <VCard> -->
    <Fleet />
    <!-- </VCard> -->
  </div>
</template>
