<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useEstimates } from '@/composables/useEstimates'
import type Estimate from '@/types/estimates/Estimate'

import EstimateInfoPanel from '@/components/estimates/EstimateInfoPanel.vue'
import ActivityTab from '@/components/estimates/details/ActivityTab.vue'
import RelatedTab from '@/components/estimates/details/RelatedTab.vue'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const estimateTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const estimateData = ref<Estimate>()
const estimateName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useEstimates().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    estimateName.value = newVal.name as string
    estimateData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return estimateData.value !== undefined ? `${estimateData.value.name} details` : null
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
        title: 'Estimates',
        to: { name: 'estimates' },
      },
      {
        title: estimateName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="estimateData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <EstimateInfoPanel :estimate-data="estimateData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="estimateTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="estimateTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <ActivityTab />
        </VWindowItem>

        <VWindowItem>
          <RelatedTab />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Estimate with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
