<script setup lang="ts">
// import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
// import type Contract from '@/types/contracts/Contract'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

// const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
//
// const { getContractAcceptanceData } = usePublicApi()
//
// const estimateData = ref<Contract>()
//
// const { data } = await getContractAcceptanceData(route.params.id)
//
// watch(data, newVal => {
//   estimateData.value = newVal as Contract
// })
</script>

<template>
  <div class="misc-wrapper">
    <h1>Accepting is currently not available</h1>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss"
</style>
