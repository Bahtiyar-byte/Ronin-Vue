<script lang="ts" setup>
import { type UnwrapRef, onBeforeMount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import * as yup from 'yup'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
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

const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

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
        name: 'related_contact',
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

const fetchJobData = async (id: string) => {
  const { data } = await getJobById(id)

  watch(data, (job: Job | null) => {
    if (job === null) {
      return
    }

    const assignFieldValue = (field: UnwrapRef<FormField>, value: string | { id: string }) => {
      if (typeof value === 'object' && hasKey(value, 'id')) {
        field.value = value.id as string
      } else {
        field.value = value as string
      }
    }

    jobRef.value = job
    formFields.value.forEach(field => {
      if ('fields' in field) {
        // Если поле является группой, обрабатываем вложенные поля
        field.fields.forEach(subField => {
          if (hasKey(job, subField.name)) {
            assignFieldValue(subField, job[subField.name])
          }
        })
      } else if (hasKey(job, field.name)) {
        assignFieldValue(field, job[field.name])
      }
    })

    pageTitle.value = `Update ${job.name}`
    breadcrumbs.value[2] = { title: `Update ${job.name}`, disabled: true }
  })
}

const dataLoaded = ref<boolean>(false)

onBeforeMount(async () => {
  const processFormField = async (field: FormField) => {
    if (field.type === 'select') {
      const { data } = await getVariants('jobs', field.name)

      if (data.value === null) {
        return
      }

      field.variants = data.value
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

  const jobId = route.params.id as string
  if (jobId) {
    isUpdateMode.value = true
    await fetchJobData(jobId)
  }

  dataLoaded.value = true
})

useHead({
  title: computed(() => {
    return isUpdateMode.value && jobRef.value !== undefined ? `Edit ${jobRef.value.name}` : 'Create new job'
  }),
})

const submitForm = async (values: Record<string, any>) => {
  const _jobData = prepareEntityToUpdate({
    ...jobRef.value,
    ...values,
  }) as Job

  const action = _jobData.id ? updateJob : createJob

  const { data } = await action(_jobData)

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
    :fields="formFields as FormField[]"
    :submit-handler="submitForm"
  >
    <template #append_related_contactId>
      <VTooltip text="Add new contact">
        <template #activator="{ props }">
          <IconBtn
            v-bind="props"
            :to="{ name: 'contacts-create' }"
            target="_blank"
            class="ml-2"
          >
            <VIcon icon="tabler-plus" />
          </IconBtn>
        </template>
      </VTooltip>
    </template>
  </ItemUpdate>
</template>
