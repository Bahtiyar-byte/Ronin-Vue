<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useCrews } from '@/composables/useCrews'
import type Crew from '@/types/crews/Crew'

import CrewInfoPanel from '@/components/crews/CrewInfoPanel.vue'

definePage({
  meta: {
    action: 'manage',
    subject: 'crew',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const templateTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const crewData = ref<Crew>()
const crewName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useCrews().getById(route.params.id)
  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    crewName.value = newVal.name
    crewData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return crewData.value !== undefined ? `${crewData.value.name} details` : null
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
        title: 'Crews',
        to: { name: 'crews' },
      },
      {
        title: crewName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="crewData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <CrewInfoPanel :crew-data="crewData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    />
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Crew with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
