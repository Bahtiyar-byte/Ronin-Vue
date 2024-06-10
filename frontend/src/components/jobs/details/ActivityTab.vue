<script setup lang="ts">
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'
import WidgetCard from '@/components/widgets/WidgetCard.vue'
import type Job from '@/types/jobs/Job'
import { useEstimates } from '@/composables/useEstimates'

const jobData = defineModel<Job>('jobData', { required: true })

const { count: estimatesCount } = useEstimates()

const widgets = ref<WidgetCardProps[]>([
  {
    widget: {
      title: 'Appointments',
      value: 0,
      icon: 'material-symbols-video-call-outline',
      action: {
        title: 'Add appointment for this job',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
    },
  },
  {
    to: { name: 'estimates', query: { related_job: jobData.value.id } },
    widget: {
      title: 'Estimates',
      value: (await estimatesCount({ related_job: jobData.value.id })).data.value?.count,
      icon: 'material-symbols-task-outline',
      action: {
        title: 'Add estimate for this job',
        icon: 'tabler-plus',
        to: {
          name: 'estimates-create',
          query: computed(() => {
            return {
              related_job: jobData.value?.id || '',
              related_contact: jobData.value?.related_contact?.id || '',
            }
          }),
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
