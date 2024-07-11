<script setup lang="ts">
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'
import { useEstimateSectionTemplates } from '@/composables/useEstimateSectionTemplates'

defineProps<{
  showCancel: boolean
}>()

const emit = defineEmits<{
  (e: 'cancelCreation'): void
  (e: 'templateCreated', value: Partial<EstimateSectionTemplate>): void
}>()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string()
        .required('Please specify name.')
        .min(3, 'Name is too short - should be 3 chars minimum.'),
      description: yup.string()
        .required('Please specify description.')
        .min(10, 'Description is too short - should be 10 chars minimum.'),
    }),
  ),
})

const [name, nameAttrs] = defineField('name', {
  validateOnBlur: true,
})

const [description, descriptionAttrs] = defineField('description', {
  validateOnBlur: true,
})

const errorText = ref('')
const formProcessing = ref(false)

const { create } = useEstimateSectionTemplates()

const onSubmit = handleSubmit(async (values: Partial<EstimateSectionTemplate>) => {
  const { isFetching } = await create(values)

  watch(isFetching, newValue => {
    formProcessing.value = newValue
    emit('templateCreated', values)
    emit('cancelCreation')
  }, { immediate: true })
})
</script>

<template>
  <VCard>
    <VForm
      :disabled="formProcessing"
      @submit.prevent="onSubmit"
    >
      <VCardText>
        <VAlert
          v-show="errorText.length"
          type="error"
          title="Error occurred"
          :text="errorText"
          class="mb-10"
        />

        <AppTextField
          v-model="name"
          v-bind="nameAttrs"
          :error-messages="errors.name"
          label="Template name"
        />

        <AppTextarea
          v-model="description"
          v-bind="descriptionAttrs"
          :error-messages="errors.description"
          label="Template description"
          class="mt-4"
        />
      </VCardText>

      <VCardActions class="d-flex justify-between">
        <VBtn
          variant="plain"
          color="grey-500"
          type="button"
          :disabled="formProcessing"
          @click="$emit('cancelCreation')"
        >
          Cancel
        </VBtn>

        <VBtn
          type="submit"
          :disabled="formProcessing"
        >
          Save
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
