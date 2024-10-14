<script lang="ts" setup>
import html2pdf from 'html2pdf.js'

import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'
import InvoiceSectionManageDocuSeal from '@/views/apps/invoice/InvoiceSectionManageDocuSeal.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'estimates',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const { getById, sendEstimate } = useEstimates()
const estimate = ref<Partial<Estimate>>({})

const loading = ref<boolean>(false)
const isDocuSealVisible = ref<boolean>(false)
const isDocuSealToken = ref<string>("")


onBeforeMount(async () => {
  const { data, isFetching } = await getById(route.params.id)

  watch(data, newVal => {
    estimate.value = {
      ...newVal as Estimate,
      sections: newVal?.estimate_sections_related_estimate ?? [],
    }
  })

  watch(isFetching, newVal => {
    loading.value = newVal
  }, { immediate: true })
})

const generatePdf = () => {
  const element = document.getElementById('invoice-editable')

  return html2pdf().from(element)
}

const handleDownload = () => {
  generatePdf().save(`${estimate.value.name}.pdf`)
}

const handlePrint = () => {
  window.print()
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
        <InvoiceEditable
          id="invoice-editable"
          hide-controls
          :data="estimate as Estimate"
        />
      </template>

      <template #rightColumn>
        <EstimateDetailsRightPanel
          v-model:loading="loading"
          v-model:estimate="estimate"
          v-model:is-send-estimate-sidebar-visible="isSendEstimateSidebarVisible"
          :handle-download="handleDownload"
          :handle-print="handlePrint"
          :route="route"
        />
      </template>
    </InvoiceBuilderLayout>

    <InvoiceSectionManageDocuSeal v-model:dialog-visible="isDocuSealVisible" v-model:token="isDocuSealToken" />

<!--    <InvoiceSendInvoiceDrawer-->
<!--      v-if="estimate.id !== undefined"-->
<!--      v-model:drawer-opened="isSendEstimateSidebarVisible"-->
<!--      v-model:estimate-data="estimate"-->
<!--      @submit="handleSending"-->
<!--    />-->

    <VSnackbar
      v-model="snackbars.emailError"
      color="error"
      :timeout="3500"
    >
      Estimate was not sent. Some error occurred.
    </VSnackbar>
  </div>
</template>
