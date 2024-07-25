<script setup lang="ts">
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'
import WidgetCard from '@/components/widgets/WidgetCard.vue'

const widgets = ref<WidgetCardProps[]>([
  {
    to: { name: 'root' },
    widget: {
      title: 'Teams',
      icon: 'tabler-users',
    },
  },
])
</script>

<template>
  <div class="mb-6">
    <VRow>
      <VCol
        v-for="(widgetData, id) in widgets"
        :key="`activity-widget-${id}`"
        cols="12"
        md="4"
        sm="6"
      >
        <WidgetCard v-bind="widgetData" />
      </VCol>
    </VRow>
  </div>
</template>
