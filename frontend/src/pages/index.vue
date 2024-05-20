<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import PipelineCard from '@/components/common/pipelines/PipelineCard.vue'
import PipelineDisplayItem from '@/types/pipiline/PipelineDisplayItem'
import { useContacts } from '@/composables/useContacts'

const currentPipelineItems = ref<PipelineDisplayItem[]>([])
const { count: contactsCount } = useContacts()

const currentPipelineCounts = ref({
  leadContacts: 0,
  prospectContacts: 0,
})

// Функция для обновления pipeline counts
const updatePipelineCount = async (stage: string, key: keyof typeof currentPipelineCounts.value) => {
  const { data } = await contactsCount({ stage })

  watch(data, newValue => {
    if (newValue === null) {
      return
    }

    currentPipelineCounts.value = {
      ...currentPipelineCounts.value,
      [key]: newValue.count,
    }
  })
}

onMounted(() => {
  const fetchData = async () => {
    await updatePipelineCount('Lead', 'leadContacts')
    await updatePipelineCount('Prospect', 'prospectContacts')
  }

  fetchData()
})

watchEffect(() => {
  const items = []

  items.push(new PipelineDisplayItem(
    'Leads',
    currentPipelineCounts.value.leadContacts,
    { name: 'root', query: { stage: 'Lead' } },
    'mdi-account-filter-outline',
  ))
  items.push(new PipelineDisplayItem(
    'Prospects',
    currentPipelineCounts.value.prospectContacts,
    { name: 'root', query: { stage: 'Prospect' } },
    'mdi-sale-outline',
  ))

  currentPipelineItems.value = items
})
</script>

<template>
  <div>
    <PipelineCard
      class="mb-6"
      title="Current pipeline"
      :pipeline-items="currentPipelineItems"
    />
  </div>
</template>
