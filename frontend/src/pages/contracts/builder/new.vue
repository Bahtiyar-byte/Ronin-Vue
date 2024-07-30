<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'

definePage({
  meta: {
    action: 'create',
    subject: 'invoices',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { query: { estimateId?: string } }

const { getById: getEstimateById } = useEstimates()
const estimate = ref<Estimate>()

onBeforeMount(async () => {
  if (route.query.estimateId) {
    const { data } = await getEstimateById(route.query.estimateId)

    watch(data, newVal => {
      estimate.value = newVal as Estimate
    })
  }
})
</script>

<template>
  <div>
    {{ JSON.stringify(estimate) }}
  </div>
</template>
