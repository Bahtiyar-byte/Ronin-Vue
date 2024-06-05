<script setup lang="ts">
import { debounce } from 'lodash'
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

const fetchAutocompleteVariants = async (query: string = '') => {
  if (field.type === 'autocomplete' && typeof field.autocomplete_function === 'function') {
    field.variants = await field.autocomplete_function(query) as Array<{ value: string; title: string }>
  }
}

const debouncedFetchVariants = debounce((query: string) => {
  fetchAutocompleteVariants(query)
}, 400)

onBeforeMount(() => {
  fetchAutocompleteVariants()
})

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
  <div class="flex items-end">
    <slot name="prepend" />
    <Component
      :is="getComponentType(field.type)"
      v-model="value"
      :label="field.label"
      v-bind="attrs"
      :items="field.variants"
      :error-messages="errorMessages"
    />
    <!-- @update:search="debouncedFetchVariants" -->
    <slot name="append" />
  </div>
</template>
