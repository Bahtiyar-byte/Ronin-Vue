<script setup lang="ts">
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'
import WidgetCard from '@/components/widgets/WidgetCard.vue'

const props = defineProps<{
  id: any
}>()

const widgets = ref<WidgetCardProps[]>([
  {
    widget: {
      title: 'Appointments',
      value: 0,
      icon: 'material-symbols-video-call-outline',
      action: {
        title: 'Create appointment with this contact',
        icon: 'tabler-plus',
        to: { name: 'calendar', query: { create_event: 1, contact_id: props.id } },
      },
    },
  },
  {
    widget: {
      title: 'Estimates',
      value: 0,
      icon: 'material-symbols-task-outline',
      action: {
        title: 'Create appointment with this contact',
        icon: 'tabler-plus',
        to: { name: 'estimates-builder', query: { contact_id: props.id } },
      },
    },
  },
  {
    widget: {
      title: 'Jobs',
      value: 0,
      icon: 'material-symbols-task-outline',
      action: {
        title: 'Add job for this contact',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
    },
  },
  {
    widget: {
      title: 'Invoices',
      value: 0,
      icon: 'ph-invoice-light',
      iconColor: 'success',
      action: {
        title: 'Issue invoice to this contact',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
    },
  },
  {
    widget: {
      title: 'Documents',
      value: 0,
      icon: 'ph-invoice-light',
      iconColor: 'info',
      action: {
        title: 'Attach new document',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
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
