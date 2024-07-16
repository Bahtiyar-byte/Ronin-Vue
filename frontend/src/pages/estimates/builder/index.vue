<script lang="ts" setup>
import html2pdf from 'html2pdf.js'

import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'

// Type: Invoice data
import type EstimateSection from '@/types/estimateSections/EstimateSection'

const estimateData = reactive<Partial<Estimate>>({
  createdAt: new Date(),
  related_contact: null,
  sections: [],
})

const addProduct = (value: Partial<EstimateSection>) => {
  estimateData.sections?.push(value)
}

const removeSection = (id: number) => {
  estimateData.sections?.splice(id, 1)
}

const handleSave = () => {
  console.log(estimateData)
}

const generatePdf = () => {
  const element = document.getElementById('invoice-editable')

  return html2pdf().from(element)
}

const hideControls = ref<boolean>(false)

const handleDownload = () => {
  hideControls.value = true

  generatePdf().save('estimate.pdf').then(() => {
    hideControls.value = false
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
        v-model:data="estimateData"
        :hide-controls="hideControls"
        @push="addProduct"
        @remove-section="removeSection"
      />
    </VCol>

    <!-- 👉 Right Column: Invoice Action -->
    <VCol
      cols="12"
      md="3"
    >
      <VCard class="mb-8 !sticky top-4">
        <VCardText class="space-y-4">
          <!-- 👉 Send Invoice -->
          <VBtn
            block
            prepend-icon="tabler-send"
            @click="handleSave"
          >
            Send Esimate
          </VBtn>
          <VBtn
            block
            color="secondary"
            variant="tonal"
            prepend-icon="tabler-download"
            @click="handleDownload"
          >
            Print / Download
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
