<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { FetchCountFunction } from '@/types/common/CountRequestTypes'
import type { AbilityRule } from '@/types/roles/roles'

import PipelineDisplayItem from '@/types/pipiline/PipelineDisplayItem'
import { useContacts } from '@/composables/useContacts'
import { useJobs } from '@/composables/useJobs'

import ActiveJobs from '@/components/jobs/ActiveJobs.vue'

import CrmActivityTimeline from '@/views/home/CrmActivityTimeline.vue'
import LaborTickets from '@/views/home/LaborTickets.vue'
import Invoice from '@/views/home/Invoice.vue'

definePage({
  meta: {
    action: 'manage',
    subject: 'basicActions',
  },
})

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

const createPipelineItem = (title: string, countKey: keyof typeof currentPipelineCounts.value, routeQuery: RouteLocationRaw, permission: AbilityRule, icon: string) => {
  return new PipelineDisplayItem(
    title,
    currentPipelineCounts.value[countKey],
    routeQuery,
    permission,
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
    createPipelineItem('Leads', 'leadContacts', { name: 'contacts', query: { status: 'Lead' } }, { action: 'read', subject: 'contacts' }, 'mdi-account-filter-outline'),
    createPipelineItem('Prospects', 'prospectContacts', { name: 'contacts', query: { status: 'Prospect' } }, { action: 'read', subject: 'contacts' }, 'mdi-sale-outline'),
    createPipelineItem('Approved', 'approvedJobs', { name: 'jobs', query: { status: 'Approved' } }, { action: 'read', subject: 'jobs' }, 'ic-outline-next-week'),
    createPipelineItem('Completed', 'completedJobs', { name: 'jobs', query: { status: 'Completed' } }, { action: 'read', subject: 'jobs' }, 'material-symbols-work-alert-outline'),
    createPipelineItem('Invoiced', 'invoicedJobs', { name: 'jobs', query: { status: 'Invoiced' } }, { action: 'read', subject: 'jobs' }, 'material-symbols-request-quote-outline'),
  ]
})
</script>

<template>
  <CurrentPipeline
    class="mb-6"
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
      <CrmActivityTimeline />
    </VCol>
    <VCol
      cols="12"
      md="4"
    />
  </VRow>
  <VRow>
    <VCol
      cols="6"
      md="6"
    >
      <LaborTickets />
    </VCol>

    <VCol>
      <Invoice />
    </VCol>
  </VRow>
</template>
