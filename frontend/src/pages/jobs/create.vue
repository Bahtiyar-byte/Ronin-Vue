<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import * as yup from 'yup'
import { useRoute } from 'vue-router'
import { useJobs } from '@/composables/useJobs'
import { useContacts } from '@/composables/useContacts'
import { hasKey } from '@core/utils/helpers'
import { useFilters } from '@/composables/useFilters'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type Job from '@/types/jobs/Job'

const { create: createJob, getById: getJobById, update: updateJob } = useJobs()
const { autocomplete: autocompleteContacts } = useContacts()

const route = useRoute()

const isUpdateMode = ref(false)
const pageTitle = ref('Create Job')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Jobs', to: { name: 'jobs' } },
  { title: 'New job', disabled: true },
])

const { getVariants } = useFilters()
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
        variants: [],
        rules: yup.string().required('Category is required'),
      },
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        value: '',
        variants: [],
        rules: yup.string().required('Status is required'),
      },
      {
        type: 'select',
        name: 'type',
        label: 'Type',
        value: '',
        variants: [],
        rules: yup.string(),
      },
      {
        type: 'autocomplete',
        name: 'related_contactId',
        label: 'Related contact',
        value: '',
        autocomplete_function: async (query: string = '') => {
          const { data } = await autocompleteContacts(query)

          if (data.value === null) {
            return
          }

          return data.value.map(item => ({ value: item.id, title: item.label }))
        },
        rules: yup.string(),
      },
    ],
  },
])

onBeforeMount(async () => {
  const processFormField = async (field: FormField) => {
    if (field.type === 'select') {
      const { data } = await getVariants('jobs', field.name)

      watch(data, newVal => {
        if (newVal === null) {
          return
        }

        field.variants = newVal
      })
    }
  }

  const promises = (formFields.value as Array<FormField | FormFieldsGroup>).map(async (val: FormField | FormFieldsGroup) => {
    if ('fields' in val) {
      for (const field of val.fields) {
        await processFormField(field)
      }
    } else {
      await processFormField(val)
    }
  })

  await Promise.all(promises)
})

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
