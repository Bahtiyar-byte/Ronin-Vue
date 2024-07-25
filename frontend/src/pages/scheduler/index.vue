<script lang="ts" setup>
import { ref } from 'vue'

definePage({
  meta: {
    layoutWrapperClasses: 'layout-content-height-fixed',
  },
})

const row1BarList = ref([
  {
    myBeginDate: '2024-07-24 13:00',
    myEndDate: '2024-07-25 19:00',
    ganttBarConfig: {
      // each bar must have a nested ganttBarConfig object ...
      id: 'unique-id-1', // ... and a unique "id" property
      label: 'Lorem ipsum dolor',
    },
  },
])

const row2BarList = ref([
  {
    myBeginDate: '2024-07-24 00:00',
    myEndDate: '2024-07-25 02:00',
    ganttBarConfig: {
      id: 'another-unique-id-2',
      label: 'Hey, look at me',
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
      label: 'Hey, look at me',
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
      label: 'Hey, look at me',
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
      label: 'Hey, look at me',
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
  <VCard>
    <!-- <VLayout> -->
    <GGanttChart
      chart-start="2024-07-23 00:00"
      chart-end="2024-07-24 23:00"
      bar-start="myBeginDate"
      bar-end="myEndDate"
      push-on-overlap
      precision="hour"
    >
      <GGanttRow
        label="Crew 1"
        style="color: 'red' !important;"
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
</template>
