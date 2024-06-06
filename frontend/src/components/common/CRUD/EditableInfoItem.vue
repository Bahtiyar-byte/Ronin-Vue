<script setup lang="ts">
import { type Ref } from 'vue'
import EditEnumField from '@/components/common/CRUD/EditEnumField.vue'
import EditAutocompleteField from '@/components/common/CRUD/EditAutocompleteField.vue'

const props = withDefaults(defineProps<{
  label: string
  value: string
  title: string
  fetchItems?: () => Promise<string[] | null>
  fetchAutocompleteItems?: (query: string) => Promise<string[] | { value: string; title: string }[] | undefined>
  onSave: (newValue: string) => Promise<Ref<boolean>>
  type: 'select' | 'autocomplete'
}>(), {
  type: 'select',
})
</script>

<template>
  <VListItem>
    <VListItemTitle class="flex items-center gap-1">
      <span class="font-medium">
        {{ label }}:
      </span>
      <EditEnumField
        v-if="props.type === 'select'"
        :value="value"
        :title="title"
        :fetch-items="fetchItems"
        :on-save="onSave"
      />
      <EditAutocompleteField
        v-else
        :value="value"
        :title="title"
        :fetch-items="fetchAutocompleteItems"
        :on-save="onSave"
      />
    </VListItemTitle>
  </VListItem>
</template>
