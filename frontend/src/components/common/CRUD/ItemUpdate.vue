<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

import type FormField from '@/types/forms/FormField'
import AppTextField from '@core/components/app-form-elements/AppTextField.vue'
import AppSelect from '@core/components/app-form-elements/AppSelect.vue'
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'

const props = defineProps<{
  title: string
  breadcrumbs: BreadcrumbsItem[]
  fields: FormField[]
  submitHandler: (values: Record<string, any>) => void
}>()

const formData = ref(
  props.fields.reduce((acc, field) => {
    acc[field.name] = field.value || ''

    return acc
  }, {} as Record<string, any>),
)

const validationSchema = computed(() =>
  toTypedSchema(
    yup.object().shape(
      props.fields.reduce((acc, field) => {
        if (field.rules !== undefined) {
          acc[field.name] = field.rules
        }

        return acc
      }, {} as Record<string, yup.Schema>),
    ),
  ),
)

const { errors, handleSubmit, defineField, setFieldValue } = useForm({
  validationSchema,
})

watch(props.fields, newFields => {
  newFields.forEach((field: FormField) => setFieldValue(field.name, field.value))
}, { deep: true })

const fieldAttrs = ref<Record<string, any>>({})

onMounted(() => {
  props.fields.forEach((field: FormField) => {
    const [value, attrs] = defineField(field.name, { validateOnBlur: true })

    formData.value[field.name] = value
    fieldAttrs.value[field.name] = attrs
  })
})

const getComponentType = (type: string) => {
  if (type === 'select') {
    return AppSelect
  }

  return AppTextField
}

const onSubmit = handleSubmit(async (values: Record<string, any>) => {
  props.submitHandler(values)
})
</script>

<template>
  <PageHeader
    :title="title"
    :breadcrumbs="breadcrumbs"
  />

  <VCard>
    <VForm @submit.prevent="onSubmit">
      <VCardText class="flex flex-column gap-4">
        <div
          v-for="(field, index) in fields"
          :key="index"
        >
          <Component
            :is="getComponentType(field.type)"
            v-model="formData[field.name]"
            :label="field.label"
            v-bind="fieldAttrs[field.name]"
            :items="field.variants"
            :error-messages="errors[field.name]"
          />
        </div>
      </VCardText>
      <VCardActions>
        <VBtn
          variant="elevated"
          type="submit"
        >
          Submit
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
