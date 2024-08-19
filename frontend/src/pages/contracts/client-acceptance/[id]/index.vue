<script setup lang="ts">
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type Contract from '@/types/contracts/Contract'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const { getContractAcceptanceData } = usePublicApi()

const contractData = ref<Contract>()

const { data } = await getContractAcceptanceData(route.params.id)

watch(data, newVal => {
  contractData.value = newVal as Contract
}, { immediate: true })
</script>

<template>
  <div class="misc-wrapper">
    <h1>111</h1>

    <p>
      {{ JSON.stringify(contractData) }}
    </p>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss"
</style>
