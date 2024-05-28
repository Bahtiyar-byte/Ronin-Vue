<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import EntityField from '@/components/common/CRUD/EntityField.vue'
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'

const props = defineProps<{
  title: string
  breadcrumbs: BreadcrumbsItem[]
  fields: Array<FormField | FormFieldsGroup>
  submitHandler: (values: Record<string, any>) => Promise<void>
}>()

const formData = ref(
  props.fields.reduce((acc, field) => {
    if ('fields' in field) {
      field?.fields.forEach((subField: FormField) => {
        acc[subField.name] = subField.value || ''
      })
    } else {
      acc[field.name] = field.value || ''
    }

    return acc
  }, {} as Record<string, any>),
)

const validationSchema = computed(() =>
  toTypedSchema(
    yup.object().shape(
      props.fields.reduce((acc, field) => {
        if ('fields' in field) {
          field.fields.forEach(subField => {
            if (subField.rules !== undefined) {
              acc[subField.name] = subField.rules
            }
          })
        } else {
          if (field.rules !== undefined) {
            acc[field.name] = field.rules
          }
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
  newFields.forEach(field => {
    if ('fields' in field) {
      field.fields.forEach(subField => {
        setFieldValue(subField.name, subField.value)
      })
    } else {
      setFieldValue(field.name, field.value)
    }
  })
}, { deep: true })

const fieldAttrs = ref<Record<string, any>>({})

onMounted(() => {
  props.fields.forEach(field => {
    if ('fields' in field) {
      field.fields.forEach(subField => {
        const [value, attrs] = defineField(subField.name, { validateOnBlur: true })

        formData.value[subField.name] = value
        fieldAttrs.value[subField.name] = attrs
      })
    } else {
      const [value, attrs] = defineField(field.name, { validateOnBlur: true })

      formData.value[field.name] = value
      fieldAttrs.value[field.name] = attrs
    }
  })
})

const onSubmit = handleSubmit(async (values: Record<string, any>) => {
  await props.submitHandler(values)
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
          <template v-if="'fields' in field">
            <h5 class="mb-4 text-lg font-medium">
              {{ field.title }}
            </h5>
            <VRow>
              <VCol
                v-for="subField in field.fields"
                :key="subField.name"
                cols="12"
                md="6"
              >
                <EntityField
                  v-model="formData[subField.name]"
                  :field="subField"
                  :error-messages="errors[subField.name]"
                  :attrs="fieldAttrs[subField.name]"
                />
              </VCol>
            </VRow>
            <VDivider v-if="index < fields.length - 1" />
          </template>

          <EntityField
            v-else
            v-model="formData[field.name]"
            :field="field"
            :error-messages="errors[field.name]"
            :attrs="fieldAttrs[field.name]"
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
