<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import * as yup from 'yup'
import { useRoute } from 'vue-router'
import { useJobs } from '@/composables/useJobs'
import { hasKey } from '@core/utils/helpers'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type Job from '@/types/jobs/Job'

const { create: createJob, getById: getJobById, update: updateJob } = useJobs()
const route = useRoute()

const isUpdateMode = ref(false)
const pageTitle = ref('Create Job')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Jobs', to: { name: 'jobs' } },
  { title: 'New job', disabled: true },
])

const jobRef = ref<Job>()

const formFields = ref<Array<FormField | FormFieldsGroup>>([
  {
    title: 'General',
    fields: [
      {
        type: 'input',
        name: 'name',
        label: 'Name',
        value: '',
        rules: yup.string().required('Name is required'),
      },
      {
        type: 'select',
        name: 'category',
        label: 'Category',
        value: '',
        rules: yup.string().required('Category is required'),
      },
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        value: '',
        variants: [
          // { value: 'Lead', title: 'Lead' },
          // { value: 'Prospect', title: 'Prospect' },
        ],
        rules: yup.string().required('Status is required'),
      },
    ],
  },
])

const fetchJobData = async (id: string) => {
  const { data } = await getJobById(id)

  watch(data, (job: Job | null) => {
    if (job === null) {
      return
    }

    jobRef.value = job
    formFields.value.forEach(field => {
      if ('fields' in field) {
        // Если поле является группой, обрабатываем вложенные поля
        field.fields.forEach(subField => {
          if (hasKey(job, subField.name)) {
            subField.value = job[subField.name] as string
          }
        })
      } else if (hasKey(job, field.name)) {
        field.value = job[field.name] as string
      }
    })

    pageTitle.value = `Update ${job.name}`
    breadcrumbs.value[2] = { title: `Update ${job.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  const jobId = route.params.id as string
  if (jobId) {
    isUpdateMode.value = true
    await fetchJobData(jobId)
  }
})

const submitForm = async (values: Record<string, any>) => {
  const _jobData = {
    ...jobRef.value,
    ...values,
  } as Job

  const action = _jobData.id ? updateJob : createJob

  const { data } = await action(_jobData)

  watch(data, newVal => {
    console.log(newVal)
  })
}
</script>

<template>
  <ItemUpdate
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
    :fields="formFields"
    :submit-handler="submitForm"
  />
</template>
