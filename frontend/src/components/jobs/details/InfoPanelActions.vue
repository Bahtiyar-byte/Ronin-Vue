<script setup lang="ts">
import type Job from '@/types/jobs/Job'
import { useEstimates } from '@/composables/useEstimates'

const { count: getEstimatesCount } = useEstimates()

const jobData = defineModel<Job>('jobData', { required: true })

const estimatesCount = ref<number>()

onBeforeMount(async () => {
  estimatesCount.value = (await getEstimatesCount({ related_job: jobData.value.id })).data.value?.count
})
</script>

<template>
  <VCardText v-if="estimatesCount">
    <VAlert
      variant="tonal"
      color="primary"
      title="Estimate Acceptance"
      text="There are related estimates for this job. Please use the button below to review and accept the estimates."
      icon="material-symbols-task-outline"
    >
      <template #default>
        <div class="mt-3">
          <VBtn
            text="Accept Estimates"
          />
        </div>
      </template>
    </VAlert>
  </VCardText>
</template>
