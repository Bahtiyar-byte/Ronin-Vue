<script lang="ts" setup>
import { type UnwrapRef, computed, onBeforeMount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useEstimates } from '@/composables/useEstimates'
import { hasKey } from '@core/utils/helpers'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type Estimate from '@/types/estimates/Estimate'
import { useFormFields } from '@/utils/forms/useFormFields'
import type FormField from '@/types/forms/FormField'
import { initialFieldEstimates } from '@/utils/initial_data/initialFieldsEstimates'

const { create: createEstimate, getById: getEstimateById, update: updateEstimate } = useEstimates()

const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const isUpdateMode = ref(false)
const pageTitle = ref('Create Estimate')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Estimates', to: { name: 'estimates' } },
  { title: 'New estimate', disabled: true },
])

const estimateRef = ref<Estimate>()

const { formFields, initializeFields } = useFormFields('estimates')

const assignFieldValue = (field: UnwrapRef<FormField>, value: string | { id: string }) => {
  if (typeof value === 'object' && value !== null && hasKey(value, 'id')) {
    field.value = (value as { id: string }).id
  } else {
    field.value = value as string
  }
}

const processFieldValues = (estimate: Estimate) => {
  formFields.value.forEach(field => {
    if ('fields' in field) {
      field.fields.forEach(subField => {
        if (hasKey(estimate, subField.name)) {
          const estimateValue = estimate[subField.name]
          if (typeof estimateValue === 'string') {
            assignFieldValue(subField, estimateValue)
          }
        }
      })
    } else if (hasKey(estimate, field.name)) {
      const estimateValue = estimate[field.name]
      if (typeof estimateValue === 'string') {
        assignFieldValue(field, estimateValue)
      }
    }
  })
}

const fetchEstimateData = async (id: string) => {
  const { data } = await getEstimateById(id)

  watch(data, (estimate: Estimate | null) => {
    if (estimate === null) {
      return
    }

    estimateRef.value = estimate
    processFieldValues(estimate)

    pageTitle.value = `Update ${estimate.name}`
    breadcrumbs.value[2] = { title: `Update ${estimate.name}`, disabled: true }
  })
}

const dataLoaded = ref<boolean>(false)

onBeforeMount(async () => {
  await initializeFields(initialFieldEstimates)

  const estimateId = route.params.id as string
  if (estimateId) {
    isUpdateMode.value = true
    await fetchEstimateData(estimateId)
  } else {
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (route.query[subField.name]) {
            subField.value = route.query[subField.name] as string
          }
        })
      } else if (route.query[field.name]) {
        field.value = route.query[field.name] as string
      }
    })
  }

  dataLoaded.value = true
})

useHead({
  title: computed(() => {
    return isUpdateMode.value && estimateRef.value !== undefined ? `Edit ${estimateRef.value.name}` : 'Create new estimate'
  }),
})

const submitForm = async (values: Record<string, any>) => {
  const _estimateData = {
    ...estimateRef.value,
    ...values,
  } as Estimate

  const action = _estimateData.id ? updateEstimate : createEstimate

  const { data } = await action(_estimateData)

  watch(data, newVal => {
    router.push({ name: 'estimates-details-id', params: { id: newVal?.id as string } })
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
