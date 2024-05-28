<script setup lang="ts">
import AppTextField from '@core/components/app-form-elements/AppTextField.vue'
import AppSelect from '@core/components/app-form-elements/AppSelect.vue'
import type FormField from '@/types/forms/FormField'

defineProps<{
  field: FormField
  modelValue: string | string[]
  errorMessages: string | string[]
  attrs: Record<string, any>
}>()

const value = defineModel<string | string[]>()

const getComponentType = (type: string) => {
  if (type === 'select') {
    return AppSelect
  }

  return AppTextField
}
</script>

<template>
  <Component
    :is="getComponentType(field.type)"
    v-model="value"
    :label="field.label"
    v-bind="attrs"
    :items="field.variants"
    :error-messages="errorMessages"
  />
</template>
