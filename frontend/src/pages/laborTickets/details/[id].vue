<script lang="ts" setup>
import html2pdf from 'html2pdf.js'

import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type LaborTicket from '@/types/laborTickets/LaborTicket'
import LaborTicketEditable from '@/views/apps/laborTicket/LaborTicketEditable.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'estimates',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const { getById, sendEstimate } = useLaborTickets()
const laborTicket = ref<Partial<LaborTicket>>({})

const isVisibleAddButton = ref(true)

const loading = ref<boolean>(false)
const isDocuSealVisible = ref<boolean>(false)
const isDocuSealToken = ref<string>('')

onBeforeMount(async () => {
  const { data, isFetching } = await getById(route.params.id)

  watch(data, newVal => {
    laborTicket.value = {
      ...newVal as LaborTicket,
    }
  })

  watch(isFetching, newVal => {
    // loading.value = newVal
  }, { immediate: true })
})

const generatePdf = () => {
  const element = document.getElementById('laborTicket-editable')

  return html2pdf().from(element)
}

const handleDownload = () => {
  console.log('herer download ', laborTicket.value.name)
  isVisibleAddButton.value = false
  generatePdf().save(`${laborTicket.value.name}.pdf`).then(() => {
    isVisibleAddButton.value = true
  })
    .catch(error => {
      console.error('Error generating PDF:', error)
      isVisibleAddButton.value = true // Re-enable button on error
    })
}

const handlePrint = () => {
  isVisibleAddButton.value = false

  setTimeout(() => {
    window.print()
  }, 1000)

  setTimeout(() => {
    isVisibleAddButton.value = true
  }, 1000)
}

const isSendEstimateSidebarVisible = ref<boolean>(false)

const snackbars = reactive({
  emailSent: false,
  emailError: false,
})

const handleSending = async (data: {
  emailTo: string
  subject: string
  message: string
}) => {
  loading.value = true

  const opt = {
    title: 'Invoice',
    subject: 'Invoice for services',
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  }

  generatePdf().set(opt).toContainer().toCanvas().toImg().outputPdf('blob').then(async (blob: Blob) => {
    const { data: sendingResult, isFetching } = await sendEstimate(prepareEntityToUpdate(estimate.value), {
      ...data,
      attachments: [blob],
    })

    watch(isFetching, newVal => {
      loading.value = newVal
    })

    watch(sendingResult, newVal => {
      if (newVal?.sent) {
        snackbars.emailSent = true
        isDocuSealVisible.value = true
        isDocuSealToken.value = newVal.sent
      } else if (newVal?.sent === false) {
        snackbars.emailError = true
      }
    })
  })
}

watch(isSendEstimateSidebarVisible, newVal => {
  if (newVal === true) {
    handleSending({
      emailTo: 'info@thedigitalronin.com',
      subject: 'Estimate subject',
      message: 'Estimate message',
    })
  }
})
</script>

<template>
  <div>
    <InvoiceBuilderLayout right-panel-class="print:!hidden">
      <template #leftColumn>
        <LaborTicketEditable
          id="laborTicket-editable"
          v-model:isVisibleAddButton="isVisibleAddButton"
          hide-controls
          :data="laborTicket as LaborTicket"
        />
      </template>

      <template #rightColumn>
        <LaborTicketDetailsRightPanel
          v-model:loading="loading"
          v-model:is-send-estimate-sidebar-visible="isSendEstimateSidebarVisible"
          :handle-download="handleDownload"
          :handle-print="handlePrint"
          :route="route"
        />
      </template>
    </InvoiceBuilderLayout>

    <!--    <InvoiceSendInvoiceDrawer -->
    <!--      v-if="estimate.id !== undefined" -->
    <!--      v-model:drawer-opened="isSendEstimateSidebarVisible" -->
    <!--      v-model:estimate-data="estimate" -->
    <!--      @submit="handleSending" -->
    <!--    /> -->

    <VSnackbar
      v-model="snackbars.emailError"
      color="error"
      :timeout="3500"
    >
      Order was not sent. Some error occurred.
    </VSnackbar>
  </div>
</template>
