<script lang="ts" setup>
import { ref } from "vue"

definePage({
  meta: {
    layoutWrapperClasses: 'layout-content-height-fixed',
  },
})



const row1BarList = ref([
  {
    myBeginDate: "2024-07-24 13:00",
    myEndDate: "2024-07-25 19:00",
    ganttBarConfig: {
      // each bar must have a nested ganttBarConfig object ...
      id: "unique-id-1", // ... and a unique "id" property
      label: "Lorem ipsum dolor",
    }
  }
])
const row2BarList = ref([
  {
    myBeginDate: "2024-07-24 00:00",
    myEndDate: "2024-07-25 02:00",
    ganttBarConfig: {
      id: "another-unique-id-2",
      label: "Hey, look at me",
      style: {
        // arbitrary CSS styling for your bar
        background: "#e09b69",
        borderRadius: "20px",
        color: "black"
      }
    }
  }
])
</script>

<template>
  <VCard>
    <!-- <VLayout> -->
    <g-gantt-chart
      chart-start="2024-07-21 12:00"
      chart-end="2024-07-28 12:00"
      bar-start="myBeginDate"
      bar-end="myEndDate"
      push-on-overlap

    >
      <g-gantt-row label="Crew 1" :bars="row1BarList" />
      <g-gantt-row label="Crew 2" :bars="row2BarList" />
    </g-gantt-chart>
    <!-- </VLayout> -->
   </VCard>
</template>

