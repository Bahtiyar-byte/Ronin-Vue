<script setup lang="ts">
import { type Ref } from 'vue'
import EditEnumField from '@/components/common/CRUD/EditEnumField.vue'
import EditAutocompleteField from '@/components/common/CRUD/EditAutocompleteField.vue'
import ContactAutocompleteField from "@/views/apps/calendar/edit/ContactAutocompleteField.vue"
const props = withDefaults(defineProps<{
  label: string
  value: string
  title: string
  fetchItems?: () => Promise<string[] | null>
  fetchAutocompleteItems?: (query: string) => Promise<string[] | { value: string; title: string }[] | undefined>
  onSave: (newValue: string) => Promise<Ref<boolean>>
  type?: 'select' | 'autocomplete',
  calendar?: boolean
}>(), {
  type: 'select',
  calendar: false
})

</script>

<template>
  <VListItem :style="{ padding: calendar ? '0' : '' }">
    <VListItemTitle class='flex items-center gap-1'>
      <span class=" font-medium" v-show="!calendar">
        {{ label }}:
      </span>
      <EditEnumField v-if="props.type === 'select'" :value="value" :title="title" :fetch-items="fetchItems"
        :on-save="onSave" />
      <ContactAutocompleteField v-else-if="calendar" :value="value" :title="title" :fetch-items="fetchAutocompleteItems"
        :on-save="onSave" />
      <EditAutocompleteField v-else :value="value" :title="title" :fetch-items="fetchAutocompleteItems"
        :on-save="onSave" />
    </VListItemTitle>
  </VListItem>
</template>
