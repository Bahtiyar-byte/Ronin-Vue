<script lang="ts" setup>
import html2pdf from 'html2pdf.js'

import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'

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

const isSendPaymentSidebarVisible = ref<boolean>(false)

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
    const { data: resultData, isFetching } = await sendEstimate(estimate.value, {
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
  <VRow>
    <VCol
      cols="12"
      md="9"
    >
      <InvoiceEditable
        id="invoice-editable"
        hide-controls
        :data="estimate as Estimate"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
      class="print:!hidden"
    >
      <div class="!sticky top-4">
        <VCard
          :loading="loading"
          class="mb-8"
        >
          <VCardText class="space-y-3">
            <VBtn
              block
              prepend-icon="tabler-send"
              @click="isSendPaymentSidebarVisible = !isSendPaymentSidebarVisible"
            >
              Send
            </VBtn>

            <VBtn
              block
              variant="tonal"
              color="secondary"
              prepend-icon="tabler-download"
              @click="handleDownload"
            >
              Download
            </VBtn>

            <div class="flex gap-2.5">
              <VBtn
                class="flex-1"
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-printer"
                @click="handlePrint"
              >
                Print
              </VBtn>
              <VBtn
                class="flex-1"
                variant="tonal"
                color="secondary"
                :to="{ name: 'estimates-builder-id-edit', params: route.params }"
              >
                Edit
              </VBtn>
            </div>
          </VCardText>
        </VCard>

        <VCard v-if="estimate.name?.length">
          <VCardText class="space-y-3">
            <p>{{ estimate.name }}</p>
          </VCardText>
        </VCard>
      </div>
    </VCol>

    <InvoiceSendInvoiceDrawer
      v-if="estimate.id !== undefined"
      v-model:isDrawerOpen="isSendPaymentSidebarVisible"
      v-model:estimate-data="estimate"
      @submit="handleSending"
    />
  </VRow>
</template>
