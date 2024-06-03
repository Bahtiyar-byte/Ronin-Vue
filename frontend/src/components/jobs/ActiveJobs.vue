<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'lodash'
import type { SortItem } from '@core/types'

const sortBy = ref<SortItem[]>([])
const searchQuery = ref<string>()

const fetchData = async () => {
  console.log('Fetching')
}

const debouncedFetchData = debounce(fetchData, 400)

watch([
  sortBy,
  searchQuery,
], debouncedFetchData, { immediate: true })
</script>

<template>
  <ItemsManage
    v-model:search-query="searchQuery"
    :show-title="false"
    :show-items-per-page="false"
    :search-settings="{
      placeholder: 'Search jobs',
    }"
  >
    <template #table>
      <p>111</p>
    </template>
  </ItemsManage>
</template>
