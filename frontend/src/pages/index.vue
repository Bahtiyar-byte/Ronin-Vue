<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { FetchCountFunction } from '@/types/common/CountRequestTypes'

import PipelineDisplayItem from '@/types/pipiline/PipelineDisplayItem'
import { useContacts } from '@/composables/useContacts'
import { useJobs } from '@/composables/useJobs'

import PipelineCard from '@/components/common/pipelines/PipelineCard.vue'
import QuickCreateEntity from '@/components/index/QuickCreateEntity.vue'

// import CrmAnalyticsSales from '@/components/dashboards/CrmAnalyticsSales.vue'
// import CrmRevenueGrowth from '@/components/dashboards/CrmRevenueGrowth.vue'
import ActiveJobs from '@/components/jobs/ActiveJobs.vue'

const currentPipelineItems = ref<PipelineDisplayItem[]>([])
const { count: contactsCount } = useContacts()
const { count: jobsCount } = useJobs()

const currentPipelineCounts = ref({
  leadContacts: 0,
  prospectContacts: 0,
  approvedJobs: 0,
  completedJobs: 0,
  invoicedJobs: 0,
})

const updatePipelineCount = async (fetchCount: FetchCountFunction, params: object, key: keyof typeof currentPipelineCounts.value) => {
  const { data } = await fetchCount(params)

  watch(data, newValue => {
    if (newValue === null) {
      return
    }

    currentPipelineCounts.value = {
      ...currentPipelineCounts.value,
      [key]: newValue.count,
    }
  }, { immediate: true })
}

const createPipelineItem = (title: string, countKey: keyof typeof currentPipelineCounts.value, routeQuery: RouteLocationRaw, icon: string) => {
  return new PipelineDisplayItem(
    title,
    currentPipelineCounts.value[countKey],
    routeQuery,
    icon,
  )
}

onMounted(() => {
  const fetchData = async () => {
    await updatePipelineCount(contactsCount, { status: 'Lead' }, 'leadContacts')
    await updatePipelineCount(contactsCount, { status: 'Prospect' }, 'prospectContacts')
    await updatePipelineCount(jobsCount, { status: 'Approved' }, 'approvedJobs')
    await updatePipelineCount(jobsCount, { status: 'Completed' }, 'completedJobs')
    await updatePipelineCount(jobsCount, { status: 'Invoiced' }, 'invoicedJobs')
  }

  fetchData()
})

watchEffect(() => {
  currentPipelineItems.value = [
    createPipelineItem('Leads', 'leadContacts', { name: 'contacts', query: { stage: 'Lead' } }, 'mdi-account-filter-outline'),
    createPipelineItem('Prospects', 'prospectContacts', { name: 'contacts', query: { stage: 'Prospect' } }, 'mdi-sale-outline'),
    createPipelineItem('Approved', 'approvedJobs', { name: 'jobs', query: { status: 'Approved' } }, 'ic-outline-next-week'),
    createPipelineItem('Completed', 'completedJobs', { name: 'jobs', query: { status: 'Completed' } }, 'material-symbols-work-alert-outline'),
    createPipelineItem('Invoiced', 'invoicedJobs', { name: 'jobs', query: { status: 'Invoiced' } }, 'material-symbols-request-quote-outline'),
  ]
})
</script>

<template>
  <PipelineCard
    class="mb-6"
    title="Current pipeline"
    :pipeline-items="currentPipelineItems"
  />

  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <ActiveJobs />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VCard
        title="Tools component will be here"
        class="mb-6"
      />

      <!-- <CrmRevenueGrowth /> -->
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <QuickCreateEntity class="mb-6" />

      <!-- <CrmAnalyticsSales /> -->
    </VCol>
  </VRow>
</template>
