<script setup lang="ts">
import type Job from '@/types/jobs/Job'
import { useEstimates } from '@/composables/useEstimates'
import { useJobs } from '@/composables/useJobs'

const {
  count: getEstimatesCount,

  // getList: getEstimatesList
} = useEstimates()

const { update: updateJob } = useJobs()

const jobData = defineModel<Job>('jobData', { required: true })

const estimatesCount = ref<number>()

const estimatesReqParams = { related_job: jobData.value.id }

onBeforeMount(async () => {
  estimatesCount.value = (await getEstimatesCount(estimatesReqParams)).data.value?.count
})

const submitProcessing = ref<boolean>(false)

const submit = async () => {
  const _jobData = prepareEntityToUpdate(jobData.value)

  const { data, isFetching } = await updateJob({
    ..._jobData,
    status: 'Approved',
  })

  watch(isFetching, newVal => {
    submitProcessing.value = newVal as boolean
  }, { immediate: true })

  watch(data, newVal => {
    jobData.value = newVal as Job
  })
}
</script>

<template>
  <VCardText v-if="estimatesCount && jobData.status !== 'Approved'">
    <VForm
      :disabled="submitProcessing"
      @submit.prevent="submit"
    >
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
              type="submit"
              text="Accept Estimates"
              :loading="submitProcessing"
            />
          </div>
        </template>
      </VAlert>
    </VForm>
  </VCardText>
</template>
