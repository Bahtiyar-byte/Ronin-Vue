<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useJobs } from '@/composables/useJobs'
import type Job from '@/types/jobs/Job'

import JobInfoPanel from '@/components/jobs/JobInfoPanel.vue'
import ActivityTab from '@/components/jobs/details/ActivityTab.vue'
import RelatedTab from '@/components/jobs/details/RelatedTab.vue'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const jobTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const jobData = ref<Job>()
const jobName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useJobs().getById(route.params.id)

  watch(data, newVal => {
    jobName.value = newVal.name as string
    jobData.value = newVal as Job
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return jobData.value !== undefined ? `${jobData.value.name} details` : null
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
        title: 'Jobs',
        to: { name: 'jobs' },
      },
      {
        title: jobName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="jobData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <JobInfoPanel @update:job-data="(j) => jobData = j" :job-data="jobData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="jobTab"
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
        v-model="jobTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <ActivityTab :job-data="jobData" />
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
      Job with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
