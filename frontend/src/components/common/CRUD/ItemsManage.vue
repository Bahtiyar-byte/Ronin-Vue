<script setup lang="ts">
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'
import PageHeader from '@/components/common/PageHeader.vue'
import AppSelect from '@core/components/app-form-elements/AppSelect.vue'
import AppTextField from '@core/components/app-form-elements/AppTextField.vue'

defineProps<{
  itemsTitle: string
  breadcrumbs?: BreadcrumbsItem[]
  searchSettings?: {
    placeholder: string
  }
}>()

const searchQuery = defineModel<string>('searchQuery', { required: true })
const itemsPerPage = defineModel<number>('itemsPerPage', { required: true })

const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: 'All' },
]
</script>

<template>
  <PageHeader
    :title="itemsTitle"
    :breadcrumbs="breadcrumbs"
  />
  <VCard>
    <template v-if="$slots.filters">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>
      <VCardText>
        <VRow>
          <slot name="filters" />
        </VRow>
      </VCardText>
      <VDivider />
    </template>

    <VCardText class="d-flex flex-wrap gap-4">
      <div class="me-3 d-flex gap-3">
        <AppSelect
          v-model="itemsPerPage"
          :items="itemsPerPageOptions"
          style="inline-size: 6.25rem;"
        />
      </div>

      <VSpacer />

      <div class="app-search-filter d-flex align-center flex-wrap gap-4">
        <div
          v-if="searchSettings"
          style="inline-size: 15.625rem;"
        >
          <AppTextField
            v-model="searchQuery"
            :placeholder="searchSettings.placeholder"
          />
        </div>

        <slot name="buttons" />
      </div>
    </VCardText>

    <VDivider />

    <slot name="table" />
  </VCard>
</template>
