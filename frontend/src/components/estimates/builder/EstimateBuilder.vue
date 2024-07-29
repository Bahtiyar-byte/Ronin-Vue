<script setup lang="ts">
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'

// Type: Invoice data
import type EstimateSection from '@/types/estimateSections/EstimateSection'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id?: string } }

const { create: createEstimate, update: updateEstimate, getById: getEstimate } = useEstimates()
const { create: createEstimateSection } = useEstimateSections()

const estimateData = ref<Partial<Estimate>>({
  name: 'New estimate',
  createdAt: new Date(),
  related_contact: null,
  sections: [],
})

onBeforeMount(async () => {
  if (route.params.id !== undefined) {
    const { data } = await getEstimate(route.params.id)

    watch(data, newVal => {
      estimateData.value = {
        ...newVal as Estimate,
        sections: newVal?.estimate_sections_related_estimate ?? [],
      }
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

  const action = estimateData.value.id ? updateEstimate : createEstimate

  const { data } = await action({
    ...prepareEntityToUpdate(estimateData.value),
    notifyContact: false,
  })

  watch(data, async (newVal: Estimate | null) => {
    if (newVal === null) {
      return
    }

    estimateData.value = {
      ...newVal,
      sections: estimateData.value.sections,
    }
    estimateId.value = newVal.id

    const createSectionsPromises = estimateData.value.sections?.map(sectionData => {
      if (sectionData.id === undefined) {
        return createEstimateSection(prepareEntityToUpdate({
          ...sectionData,
          related_estimate: newVal.id,
        }))
      }

      return false
    }).filter(Boolean)

    await Promise.all(createSectionsPromises as Promise<any>[])

    if (processRedirect) {
      await redirectToPreview()
    }
  })
}

const handlePreview = async () => {
  await handleSave(true)
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
      <div class="sticky top-4">
        <VCard
          :loading="loading"
          class="mb-6"
        >
          <VCardText class="space-y-3">
            <!-- 👉 Send Invoice -->
            <VBtn
              block
              variant="tonal"
              color="secondary"
              @click="() => handleSave()"
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

        <VCard>
          <VCardText class="space-y-3">
            <AppTextField
              v-model="estimateData.name"
              label="Estimate name"
              aria-required="true"
            />
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>
