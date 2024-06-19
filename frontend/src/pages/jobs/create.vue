// jobs/create.vue
<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useJobs } from '@/composables/useJobs'
import { hasKey } from '@core/utils/helpers'
import type Job from '@/types/jobs/Job'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsJobs } from '@/utils/initial_data/initialFieldsJobs'

const { create: createJob, getById: getJobById, update: updateJob } = useJobs()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Job')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Jobs', to: { name: 'jobs' } },
  { title: 'New job', disabled: true },
])

const { formFields, initializeFields } = useFormFields('jobs')
const jobRef = ref<Job>()
const dataLoaded = ref(false)

const fetchJobData = async (id: string) => {
  const { data } = await getJobById(id)

  watch(data, (job: Job | null) => {
    if (job === null) {
      return
    }

    jobRef.value = job
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(job, subField.name)) {
            subField.value = job[subField.name]
          }
        })
      } else if (hasKey(job, field.name)) {
        field.value = job[field.name]
      }
    })
    pageTitle.value = `Update ${job.name}`
    breadcrumbs.value[2] = { title: `Update ${job.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsJobs)

  const jobId = route.params.id as string
  if (jobId) {
    isUpdateMode.value = true
    await fetchJobData(jobId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && jobRef.value ? `Edit ${jobRef.value.name}` : 'Create new job')),
})

const submitForm = async (values: Record<string, any>) => {
  const jobData = { ...jobRef.value, ...values } as Job
  const action = jobData.id ? updateJob : createJob
  const { data } = await action(jobData)

  watch(data, newVal => {
    router.push({ name: 'jobs-details-id', params: { id: newVal?.id as string } })
  })
}
</script>

<template>
  <ItemUpdate
    v-if="dataLoaded"
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
    :fields="formFields"
    :submit-handler="submitForm"
  >
    <template #append_related_contactId>
      <VTooltip text="Add new contact">
        <template #activator="{ props }">
          <IconBtn v-bind="props" :to="{ name: 'contacts-create' }" target="_blank" class="ml-2">
            <VIcon icon="tabler-plus" />
          </IconBtn>
        </template>
      </VTooltip>
    </template>
  </ItemUpdate>
</template>
