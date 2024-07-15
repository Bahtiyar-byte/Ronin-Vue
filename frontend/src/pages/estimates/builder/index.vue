<script lang="ts" setup>
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
</script>

<template>
  <VRow>
    <!-- 👉 InvoiceEditable -->
    <VCol
      cols="12"
      md="9"
    >
      <InvoiceEditable
        v-model:data="estimateData"
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
        <VCardText>
          <!-- 👉 Send Invoice -->
          <VBtn
            block
            prepend-icon="tabler-send"
            class="mb-4"
          >
            Send Esimate
          </VBtn>

          <!-- 👉 Save -->
          <VBtn
            block
            color="secondary"
            variant="tonal"
            @click="handleSave"
          >
            Save
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
