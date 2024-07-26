<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'
import WidgetCard from '@/components/widgets/WidgetCard.vue'
import type Contact from '@/types/contacts/Contact'
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'
import { useAbility } from '@/plugins/casl/composables/useAbility'

const contactData = defineModel<Contact>('contactData', { required: true })

const { count: appointmentsCount } = useAppointments()
const { count: estimatesCount } = useEstimates()
const { count: jobsCount } = useJobs()

const dialogsVisibility = reactive({
  estimates: false,
  documents: false,
})

const estimatesSearchParams: GetEstimatesRequest = {
  related_contact: contactData.value.id,
}

const widgets = ref<WidgetCardProps[]>([
  {
    permission: { action: 'read', subject: 'appointments' },
    to: { name: 'calendar', query: { related_contact: contactData.value.id } } as RouteLocationRaw,
    widget: {
      title: 'Appointments',
      value: (await appointmentsCount({ related_contact: contactData.value.id })).data.value?.count,
      icon: 'material-symbols-video-call-outline',
      action: {
        title: 'Create appointment with this contact',
        icon: 'tabler-plus',
        to: { name: 'calendar', query: { create_event: 1, contact_id: contactData.value.id } } as RouteLocationRaw,
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
      value: (await estimatesCount({ related_contact: contactData.value.id })).data.value?.count,
      icon: 'material-symbols-task-outline',
      action: {
        title: 'Create estimate for this contact',
        icon: 'tabler-plus',
        to: { name: 'estimates-builder', query: { contact_id: contactData.value.id } } as RouteLocationRaw,
      },
    },
  },
  {
    permission: { action: 'read', subject: 'jobs' },
    to: { name: 'jobs', query: { related_contact: contactData.value.id } },
    widget: {
      title: 'Jobs',
      value: (await jobsCount({ related_contact: contactData.value.id })).data.value?.count,
      icon: 'material-symbols-task-outline',
      action: {
        title: 'Add job for this contact',
        icon: 'tabler-plus',
        to: {
          name: 'jobs-create',
          query: {
            related_contact: contactData.value.id,
          },
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
])

const ability = useAbility()

const filteredWidgets = computed(() => {
  return widgets.value.filter(widget => widget.permission === undefined || ability.can(widget.permission?.action, widget.permission?.subject))
})
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
