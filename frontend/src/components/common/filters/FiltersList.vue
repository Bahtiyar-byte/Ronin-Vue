<script setup lang="ts">
import type { CheckboxFilterItem } from '@/types/filters/interfaces'
import AppSelect from '@core/components/app-form-elements/AppSelect.vue'

const props = defineProps<{
  class?: string
}>()

const filters = defineModel<CheckboxFilterItem[]>('filters', { required: true })
</script>

<template>
  <VCol
    v-for="filter in filters"
    :key="filter.key"
    cols="12"
    sm="4"
    :class="props.class"
  >
    <AppSelect
      v-model="filter.value"
      :items="filter.options"
      :placeholder="filter.label"
      clearable
      clear-icon="tabler-x"
    />
  </VCol>
</template>
