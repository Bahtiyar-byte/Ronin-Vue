<script setup lang="ts">
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useEstimates } from '@/composables/useEstimates'
import type Estimate from '@/types/estimates/Estimate'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const { getById, update: updateEstimate } = useEstimates()
const estimate = ref<Estimate>()

onBeforeMount(async () => {
  const { data } = await getById(route.params.id)

  watch(data, newVal => {
    estimate.value = newVal as Estimate
  })
})
</script>

<template>
  <div class="misc-wrapper">
    <h1>Accepting is currently not available</h1>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss"
</style>
