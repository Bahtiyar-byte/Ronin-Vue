<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'
import WidgetCard from '@/components/widgets/WidgetCard.vue'
import type Job from '@/types/jobs/Job'
import { useEstimates } from '@/composables/useEstimates'
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'
import { useAbility } from '@/plugins/casl/composables/useAbility'

const jobData = defineModel<Job>('jobData', { required: true })

const { count: estimatesCount } = useEstimates()

const dialogsVisibility = reactive({
  estimates: false,
  documents: false,
})

const widgets = ref<WidgetCardProps[]>([
  {
    permission: { action: 'read', subject: 'appointments' },
    to: { name: 'calendar', query: { related_job: jobData.value.id } } as RouteLocationRaw,
    widget: {
      title: 'Appointments',
      value: 0,
      icon: 'material-symbols-video-call-outline',
      action: {
        title: 'Add appointment for this job',
        icon: 'tabler-plus',
        to: { name: 'calendar', query: { create_event: 1, job_id: jobData.value.id } } as RouteLocationRaw,
      },
    },
  },
  {
    permission: { action: 'read', subject: 'estimates' },
    action: () => {
      dialogsVisibility.estimates = !dialogsVisibility.estimates
    },
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
    permission: { action: 'read', subject: 'invoices' },
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
    permission: { action: 'read', subject: 'documents' },
    action: () => {
      dialogsVisibility.documents = !dialogsVisibility.documents
    },
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
      details: {
        title: 'Show details',
      },
    },
  },
  {
    permission: { action: 'read', subject: 'chats' },
    widget: {
      title: 'Communications',
      value: 0,
      icon: 'tabler-message-circle-2',
      iconColor: 'success',
      action: {
        title: 'Communications',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
    },
  },
  {
    permission: { action: 'read', subject: 'chats' },
    widget: {
      title: 'Crew',
      value: 0,
      icon: 'tabler-user',
      iconColor: 'primary',
      action: {
        title: 'Crew',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
    },
  },
])

const ability = useAbility()

const filteredWidgets = computed(() => {
  return widgets.value.filter(widget => widget.permission === undefined || ability.can(widget.permission?.action, widget.permission?.subject))
})

const estimatesSearchParams: GetEstimatesRequest = {
  related_job: jobData.value.id,
}
</script>

<template>
  <div class="mb-6">
    <VRow>
      <VCol
        v-for="(widgetData, id) in filteredWidgets"
        :key="`activity-widget-${id}`"
        cols="12"
        md="4"
        sm="6"
      >
        <WidgetCard v-bind="widgetData" />
      </VCol>
    </VRow>

    <EstimaesList
      v-model:is-dialog-visible="dialogsVisibility.estimates"
      v-model:search-params="estimatesSearchParams"
    />

    <DocumentsDialog v-model:is-dialog-visible="dialogsVisibility.documents" />
  </div>
</template>
