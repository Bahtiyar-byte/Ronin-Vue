<script lang="ts" setup>
import html2pdf from 'html2pdf.js'

import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'

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
  generatePdf().save('estimate.pdf')
}

const handlePrint = () => {
  window.print()
}

const isSendEstimateSidebarVisible = ref<boolean>(false)

const handleSending = async (data: {
  emailTo: string
  subject: string
  message: string
}) => {
  loading.value = true

  const opt = {
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  }

  generatePdf().set(opt).toContainer().toCanvas().toImg().outputPdf('blob').then(async (blob: Blob) => {
    const { isFetching } = await sendEstimate(estimate.value, {
      ...prepareEntityToUpdate(data),
      attachments: [blob],
    })

    watch(isFetching, newVal => {
      loading.value = newVal
    })
  })
}
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
          v-model:estimate="estimate as Estimate"
          v-model:is-send-estimate-sidebar-visible="isSendEstimateSidebarVisible"
          :handle-download="handleDownload"
          :handle-print="handlePrint"
          :route="route"
        />
      </template>
    </InvoiceBuilderLayout>

    <InvoiceSendInvoiceDrawer
      v-if="estimate.id !== undefined"
      v-model:isDrawerOpen="isSendEstimateSidebarVisible"
      v-model:estimate-data="estimate"
      @submit="handleSending"
    />
  </div>
</template>
