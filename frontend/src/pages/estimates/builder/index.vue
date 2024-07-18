<script lang="ts" setup>
import { type Ref } from 'vue'

import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'

// Type: Invoice data
import type EstimateSection from '@/types/estimateSections/EstimateSection'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id?: string } }

const { create: createEstimate, getById: getEstimate } = useEstimates()
const { create: createEstimateSection } = useEstimateSections()

const estimateData = ref<Partial<Estimate>>({
  createdAt: new Date(),
  related_contact: null,
  sections: [],
})

onBeforeMount(async () => {
  if (route.params.id !== undefined) {
    const { data } = await getEstimate(route.params.id)

    watch(data, newVal => {
      estimateData.value = newVal as Estimate
    })
  }
})

const addProduct = (value: Partial<EstimateSection>) => {
  estimateData.value = {
    ...estimateData.value,
    sections: [
      ...(estimateData.value.sections || []),
      value,
    ],
  }
}

const removeSection = (id: number) => {
  estimateData.value.sections?.splice(id, 1)
}

const router = useRouter()

const hideControls = ref<boolean>(false)
const loading = ref<boolean>(false)

const estimateId = ref<string | undefined>(route.params.id)

const redirectToPreview = async () => {
  await router.push({
    name: 'estimates-builder-id',
    params: {
      id: estimateId.value as string,
    },
  })
}

const handleSave = async (redirect?: boolean) => {
  const processRedirect = redirect ?? false

  // const opt = {
  //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  // }
  //
  // hideControls.value = true
  //
  // generatePdf().set(opt).toContainer().toCanvas().toImg().outputPdf('blob').then(async (blob: Blob) => {

  // hideControls.value = false

  // attachments: [await blob.text()],

  const { data } = await createEstimate({
    ...prepareEntityToUpdate(estimateData),
    notifyContact: false,
  })

  watch(data, async (newVal: Estimate | null) => {
    if (newVal === null) {
      return
    }

    estimateId.value = newVal.id

    const createSectionsPromises = estimateData.value.sections?.map(sectionData => createEstimateSection(prepareEntityToUpdate({
      ...sectionData,
      related_estimate: newVal.id,
    }))) as Promise<{ data: Ref<EstimateSection | null>; isFetching: Readonly<Ref<boolean>>; error: Ref<any> }>[]

    await Promise.all(createSectionsPromises)

    if (processRedirect) {
      await redirectToPreview()
    }
  })

  // })
}

const handlePreview = async () => {
  if (estimateId.value === undefined) {
    await handleSave(true)
  } else {
    await redirectToPreview()
  }
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
      <VCard
        :loading="loading"
        class="mb-8 !sticky top-4"
      >
        <VCardText class="space-y-3">
          <!-- 👉 Send Invoice -->
          <VBtn
            block
            variant="tonal"
            color="secondary"
            @click="handleSave"
          >
            Save
          </VBtn>

          <VBtn
            block
            @click="handlePreview"
          >
            Preview
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
