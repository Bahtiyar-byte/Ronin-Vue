<script setup lang="ts">
import { useSlots } from 'vue'
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'
import PageHeader from '@/components/common/PageHeader.vue'
import AppSelect from '@core/components/app-form-elements/AppSelect.vue'
import AppTextField from '@core/components/app-form-elements/AppTextField.vue'

interface Props {
  itemsTitle?: string
  breadcrumbs?: BreadcrumbsItem[]
  searchSettings?: {
    placeholder: string
  }
  showTitle?: boolean
  showItemsPerPage?: boolean
  cardTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  showItemsPerPage: true,
})

const searchQuery = defineModel<string>('searchQuery')
const itemsPerPage = defineModel<number>('itemsPerPage')

const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: 'All' },
]

const slots = useSlots()
const showButtonsContainer = props.searchSettings || slots.buttons
const showButtonsWrapper = props.showItemsPerPage || showButtonsContainer
</script>

<template>
  <PageHeader
    v-if="props.showTitle"
    :title="itemsTitle as string"
    :breadcrumbs="breadcrumbs"
  />
  <VCard :title="cardTitle">
    <template v-if="$slots.filters">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>
      <VCardText>
        <VRow>
          <slot name="filters" />
        </VRow>
      </VCardText>
      <VDivider class="!opacity-60" />
    </template>

    <VCardText
      v-if="showButtonsWrapper"
      class="d-flex flex-wrap gap-4"
    >
      <slot name="searchSectionTitle" />

      <div
        v-if="props.showItemsPerPage"
        class="me-3 d-flex gap-3"
      >
        <AppSelect
          v-model="itemsPerPage"
          :items="itemsPerPageOptions"
          style="inline-size: 6.25rem;"
        />
      </div>

      <VSpacer />

      <div
        v-if="searchSettings || showButtonsContainer"
        class="app-search-filter d-flex align-center flex-wrap gap-4"
      >
        <div
          v-if="searchSettings"
          style="inline-size: 15.625rem;"
        >
          <AppTextField
            v-model="searchQuery"
            :placeholder="searchSettings.placeholder"
            clearable
          />
        </div>

        <slot name="buttons" />
      </div>
    </VCardText>

    <VDivider
      v-if="showButtonsWrapper"
      class="!opacity-60"
    />

    <slot name="table" />
  </VCard>
</template>
