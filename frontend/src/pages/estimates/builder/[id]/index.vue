<script lang="ts" setup>
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const { getById } = useEstimates()
const estimate = ref<Partial<Estimate>>({})

onBeforeMount(async () => {
  const { data } = await getById(route.params.id)

  watch(data, newVal => {
    estimate.value = newVal as Estimate
  })
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="9"
    >
      <InvoiceEditable
        hide-controls
        :data="estimate as Estimate"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
    />
  </VRow>
</template>
