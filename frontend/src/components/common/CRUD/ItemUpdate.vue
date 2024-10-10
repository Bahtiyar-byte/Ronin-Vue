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
  isUpdateMode: boolean
}>()

const isVisibleMaterial = defineModel<boolean>('isVisibleMaterial', { required: true })

const materialDescription = defineModel<string>('materialDescription', { required: true })
const quantity = defineModel<string>('quantity', { required: true })
const unit = defineModel<string>('unit', { required: true })

const initializeFormData = (fields: Array<FormField | FormFieldsGroup>) => {
  const data = {} as Record<string, any>

  fields.forEach(field => {
    if ('fields' in field) {
      field.fields.forEach(subField => {
        data[subField.name] = subField.value || ''
      })
    } else {
      data[field.name] = field.value || ''
    }
  })

  return data
}

const initializeValidationSchema = (fields: Array<FormField | FormFieldsGroup>) => {
  const schema = {} as Record<string, yup.Schema>

  fields.forEach(field => {
    if ('fields' in field) {
      field.fields.forEach(subField => {
        if (subField.rules !== undefined) {
          schema[subField.name] = subField.rules
        }
      })
    } else if (field.rules !== undefined) {
      schema[field.name] = field.rules
    }
  })

  return yup.object().shape(schema)
}

const formData = ref(initializeFormData(props.fields))
const validationSchema = computed(() => toTypedSchema(initializeValidationSchema(props.fields)))

const { errors, handleSubmit, defineField, setFieldValue } = useForm({
  validationSchema,
})

const updateFieldValues = (fields: Array<FormField | FormFieldsGroup>) => {
  fields.forEach(field => {
    if ('fields' in field) {
      field.fields.forEach(subField => {
        setFieldValue(subField.name, subField.value)
      })
    } else {
      setFieldValue(field.name, field.value)
    }
  })
}

watch(props.fields, newFields => {
  updateFieldValues(newFields)
}, { deep: true })

const fieldAttrs = ref<Record<string, any>>({})

const setupFieldAttributes = (fields: Array<FormField | FormFieldsGroup>) => {
  fields.forEach(field => {
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
}

onMounted(() => {
  setupFieldAttributes(props.fields)
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
                  :error-messages="errors[subField.name] as string"
                  :attrs="fieldAttrs[subField.name]"
                >
                  <template
                    v-if="$slots[`append_${subField.name}`]"
                    #append
                  >
                    <slot :name="`append_${subField.name}`" />
                  </template>
                </EntityField>
              </VCol>
            </VRow>
            <VDivider v-if="index < fields.length - 1" />
          </template>

          <EntityField
            v-else
            v-model="formData[field.name]"
            :field="field"
            :error-messages="errors[field.name] as string"
            :attrs="fieldAttrs[field.name]"
          >
            <template
              v-if="$slots[`prepend_${fieldAttrs.name}`]"
              #append
            >
              <slot :name="`append_${fieldAttrs.name}`" />
            </template>
          </EntityField>

          <VBtn
            v-if="props.fields[0]['title'] === 'Create New Order'"
            class="my-2" color="primary"
            @click="isVisibleMaterial = !isVisibleMaterial"
          >
            Add Material
          </VBtn>

          <VForm v-show="isVisibleMaterial" @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <label
                      class="v-label text-body-2 text-high-emphasis"
                      for="materialDescription"
                    >Material Description</label>
                    <VTextarea
                      id="materialDescription"
                      v-model="materialDescription"
                      placeholder="Material Description"
                      persistent-placeholder
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VRow>
                      <VCol
                        cols="12"
                        md="12"
                      >
                        <label
                          class="v-label text-body-2 text-high-emphasis"
                          for="quantity"
                        >Quantity</label>
                        <AppTextField
                          id="quantity"
                          v-model="quantity"
                          placeholder="Quantity"
                          persistent-placeholder
                        />
                      </VCol>
                    </VRow>

                    <VRow>
                      <VCol
                        cols="12"
                        md="12"
                      >
                        <label
                          class="v-label text-body-2 text-high-emphasis"
                          for="unit"
                        >Unit</label>
                        <AppTextField
                          id="unit"
                          v-model="unit"
                          placeholder="Unit"
                          persistent-placeholder
                        />
                      </VCol>
                    </VRow>
                  </VCol>
                </VRow>


              </VCol>
            </VRow>
          </VForm>

        </div>
      </VCardText>
      <VCardActions>
        <VBtn
          variant="elevated"
          type="submit"
        >
          {{ props.isUpdateMode ? 'Update' : 'Create' }}
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
