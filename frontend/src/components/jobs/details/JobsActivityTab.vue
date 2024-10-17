<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'
import type Job from '@/types/jobs/Job'
import CreateUpdateOrderDialog from '@/components/orders/CreateUpdateOrderDialog.vue'
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'
import { useAbility } from '@/plugins/casl/composables/useAbility'

const jobData = defineModel<Job>('jobData', { required: true })

const { count: estimatesCount } = useEstimates()
const { count: orderCount } = useOrders()
const { count: laborTicketCount } = useLaborTickets()
const { count: invoicesCount } = useInvoices()
const { count: documentsCount } = useDocuments()

const isVisibleOrderCreateForm = ref(false)
const isVisibleLaborTicketCreateForm = ref(false)

const dialogsVisibility = reactive({
  estimates: false,
  invoices: false,
  documents: false,
  orders: false,
  laborTickets: false,
})

const laborTicketAmount = ref('')

const handleLaborTicketAmount = async () => {
  laborTicketAmount.value = (await laborTicketCount({ related_job: jobData.value.id })).data.value?.count
}

const orderAmount = ref('')

const handleOrderAmount = async () => {
  orderAmount.value = (await orderCount({ related_job: jobData.value.id })).data.value?.count
}

onMounted(async () => {
  await handleOrderAmount()
  await handleLaborTicketAmount()
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
        to: { name: 'estimates-builder', query: { contact_id: jobData.value.related_contact?.id } } as RouteLocationRaw,
      },
    },
  },
  {
    permission: { action: 'read', subject: 'invoices' },
    action: () => {
      dialogsVisibility.invoices = !dialogsVisibility.invoices
    },
    widget: {
      title: 'Invoices',
      value: (await invoicesCount({ related_job: jobData.value.id })).data.value?.count,
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
      value: (await documentsCount({ related_job: jobData.value.id })).data.value?.count,
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
    to: { name: 'contacts-communications-id-type', params: { id: jobData.value.related_contact?.id, type: 'general' } },
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
  {
    permission: { action: 'read', subject: 'chats' },
    action: () => {
      dialogsVisibility.orders = !dialogsVisibility.orders
    },
    widget: {
      title: 'Order',
      value: orderAmount,
      icon: 'tabler-clipboard-list',
      iconColor: 'primary',
      action: {
        title: 'Add New Order',
        icon: 'tabler-plus',
        to: {
          name: 'root',
        },
      },
    },
  },
  {
    permission: { action: 'read', subject: 'chats' },
    action: () => {
      dialogsVisibility.laborTickets = !dialogsVisibility.laborTickets
    },
    widget: {
      title: 'Labor Ticket',
      value: laborTicketAmount,
      icon: 'tabler-checklist',
      iconColor: 'primary',
      action: {
        title: 'Add New Labor Ticket',
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

const invoicesSearchParams: GetEstimatesRequest = estimatesSearchParams
const documentsSearchParams: GetEstimatesRequest = estimatesSearchParams
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
        <WidgetCard
          v-bind="widgetData"
          v-model:isVisibleOrderCreateForm="isVisibleOrderCreateForm"
          v-model:isVisibleLaborTicketCreateForm="isVisibleLaborTicketCreateForm"
        />
      </VCol>
    </VRow>

    <EstimaesList
      v-model:is-dialog-visible="dialogsVisibility.estimates"
      v-model:search-params="estimatesSearchParams"
    />

    <OrdersList
      v-model:is-dialog-visible="dialogsVisibility.orders"
      v-model:search-params="estimatesSearchParams"
    />

    <LaborTicketsList
      v-model:is-dialog-labor-ticket-visible="dialogsVisibility.laborTickets"
      v-model:search-params="estimatesSearchParams"
    />

    <InvoicesListDialog
      v-model:is-dialog-visible="dialogsVisibility.invoices"
      v-model:search-params="invoicesSearchParams"
    />

    <DocumentsListDialog
      v-model:is-dialog-visible="dialogsVisibility.documents"
      v-model:search-params="documentsSearchParams"
    />

    <CreateUpdateOrderDialog
      v-model:is-dialog-visible="isVisibleOrderCreateForm"
      v-model:search-params="estimatesSearchParams"
      @handle-order-amount="handleOrderAmount"
    />

    <CreateUpdateLaborTicketDialog
      v-model:is-dialog-visible="isVisibleLaborTicketCreateForm"
      v-model:search-params="estimatesSearchParams"
      @handle-labor-ticket-amount="handleLaborTicketAmount"
    />
  </div>
</template>
