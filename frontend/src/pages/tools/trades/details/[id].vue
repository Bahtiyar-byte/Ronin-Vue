<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useTrades } from '@/composables/useTrades'
import type Trade from '@/types/trades/Trade'

import TradeInfoPanel from '@/components/trades/TradeInfoPanel.vue'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const tradeTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const tradeData = ref<Trade>()
const tradeName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useTrades().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    tradeName.value = newVal.name
    tradeData.value = newVal
  })

  watch(isFetching, newVal => {
    // console.lof('newVal ',newVal)
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return tradeData.value !== undefined ? `${tradeData.value.name} details` : null
  }),
})
</script>

<template>
  <VBreadcrumbs
    :items="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Trades',
        to: { name: 'tools-trades' },
      },
      {
        title: tradeName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="tradeData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <TradeInfoPanel :trade-data="tradeData" />
    </VCol>
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Trade with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
