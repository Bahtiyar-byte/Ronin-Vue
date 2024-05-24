<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxFilterItem, FilterItem } from '@/types/filters/interfaces'

const props = defineProps<{
  class?: string
  filters: FilterItem[]
  onApply: (filterValues: { [key: string]: string | string[] }) => void
}>()

const filterValues = ref<{ [key: string]: string | string[] }>({})

const applyFilters = () => {
  props.onApply(filterValues.value)
}

props.filters.forEach(filter => {
  if (!filterValues.value[filter.key]) {
    filterValues.value[filter.key] = filter.type === 'checkbox' ? [] : ''
  }
})

const isFilterApplied = (filterKey: string) => {
  const value = filterValues.value[filterKey]
  if (Array.isArray(value)) {
    return value.length > 0
  }

  return value !== ''
}

const resetFilter = (filterKey: string) => {
  filterValues.value[filterKey] = Array.isArray(filterValues.value[filterKey]) ? [] : ''
}
</script>

<template>
  <div :class="props.class">
    <VBtn @click="applyFilters">
      Apply Filters
    </VBtn>
    <div
      v-for="filter in filters"
      :key="filter.key"
    >
      <VMenu :close-on-content-click="false">
        <template #activator="{ props: menuProps }">
          <VBtn
            v-bind="menuProps"
            variant="outlined"
          >
            <template
              v-if="isFilterApplied(filter.key)"
              #append
            >
              <VIcon
                icon="tabler-circle-x"
                @click="resetFilter(filter.key)"
              />
            </template>

            {{ filter.label }}
          </VBtn>
        </template>
        <VCard class="w-[290px] max-w-full">
          <VCardText>
            <div v-if="filter.type === 'text'">
              <VTextField
                v-model="filterValues[filter.key]"
                :label="filter.label"
                clearable
              />
            </div>
            <div v-else-if="filter.type === 'checkbox'">
              <p>{{ filter.label }}</p>
              <VCheckbox
                v-for="option in (filter as CheckboxFilterItem).options"
                :key="option.value"
                v-model="filterValues[filter.key]"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
              />
            </div>
          </VCardText>
        </VCard>
      </VMenu>
    </div>
  </div>
</template>
