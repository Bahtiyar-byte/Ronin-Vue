<script setup lang="ts">
import AppTextField from '@core/components/app-form-elements/AppTextField.vue'
import AppSelect from '@core/components/app-form-elements/AppSelect.vue'
import AppAutocomplete from '@core/components/app-form-elements/AppAutocomplete.vue'
import type FormField from '@/types/forms/FormField'

const props = defineProps<{
  field: FormField
  modelValue: string | string[]
  errorMessages: string | string[]
  attrs: Record<string, any>
}>()

const value = defineModel<string | string[]>()
const field = props.field

if (field.type === 'autocomplete' && typeof field.autocomplete_function === 'function') {
  field.variants = await field.autocomplete_function() as Array<{ value: string; title: string }>
}

const getComponentType = (type: string) => {
  if (type === 'select') {
    return AppSelect
  } else if (type === 'autocomplete') {
    return AppAutocomplete
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
