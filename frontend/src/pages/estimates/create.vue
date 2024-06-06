<script lang="ts" setup>
import { type UnwrapRef, onBeforeMount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'

// import * as yup from 'yup'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useEstimates } from '@/composables/useEstimates'

// import { useContacts } from '@/composables/useContacts'
import { hasKey } from '@core/utils/helpers'
import { useFilters } from '@/composables/useFilters'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type Estimate from '@/types/estimates/Estimate'

const { create: createEstimate, getById: getEstimateById, update: updateEstimate } = useEstimates()

// const { autocomplete: autocompleteContacts } = useContacts()

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const isUpdateMode = ref(false)
const pageTitle = ref('Create Estimate')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Estimates', to: { name: 'estimates' } },
  { title: 'New estimate', disabled: true },
])

const { getVariants } = useFilters()
const estimateRef = ref<Estimate>()

const formFields = ref<Array<FormField | FormFieldsGroup>>([
  {
    title: 'General',
    fields: [],
  },
])

const fetchEstimateData = async (id: string) => {
  const { data } = await getEstimateById(id)

  watch(data, (estimate: Estimate | null) => {
    if (estimate === null) {
      return
    }

    const assignFieldValue = (field: UnwrapRef<FormField>, value: string | { id: string }) => {
      if (typeof value === 'object' && hasKey(value, 'id')) {
        field.value = value.id as string
      } else {
        field.value = value as string
      }
    }

    estimateRef.value = estimate
    formFields.value.forEach(field => {
      if ('fields' in field) {
        // Если поле является группой, обрабатываем вложенные поля
        field.fields.forEach(subField => {
          if (hasKey(estimate, subField.name)) {
            assignFieldValue(subField, estimate[subField.name])
          }
        })
      } else if (hasKey(estimate, field.name)) {
        assignFieldValue(field, estimate[field.name])
      }
    })

    pageTitle.value = `Update ${estimate.id}`
    breadcrumbs.value[2] = { title: `Update ${estimate.id}`, disabled: true }
  })
}

const dataLoaded = ref<boolean>(false)

onBeforeMount(async () => {
  const processFormField = async (field: FormField) => {
    if (field.type === 'select') {
      const { data } = await getVariants('estimates', field.name)

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

  const estimateId = route.params.id as string
  if (estimateId) {
    isUpdateMode.value = true
    await fetchEstimateData(estimateId)
  }

  dataLoaded.value = true
})

useHead({
  title: computed(() => {
    return isUpdateMode.value && estimateRef.value !== undefined ? 'Edit estimate' : 'Create new estimate'
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
    console.log(newVal)
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
