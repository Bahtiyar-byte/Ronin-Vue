<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'lodash'
import type Job from '@/types/jobs/Job'
import type { SortItem } from '@core/types'

import { useJobs } from '@/composables/useJobs'

const { getList } = useJobs()

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  totalItems: 0,
})

const items = ref<Job[]>([])
const isLoading = ref(false)
const sortBy = ref<SortItem[]>([])
const searchQuery = ref<string>()

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
])

const fetchData = async () => {
  const requestParams = {
    limit: pagination.value.itemsPerPage,
    offset: (pagination.value.page - 1) * pagination.value.itemsPerPage,
    sortBy: '',
    sortDesc: '',
    q: searchQuery?.value ?? '',

    // status: 'Active',

    // ToDo: Remove this after implement search by 'q' on backend
    name: searchQuery?.value ?? '',
  }

  const [_sortBy] = sortBy.value
  if (_sortBy !== undefined) {
    requestParams.sortBy = _sortBy.key
    requestParams.sortDesc = (_sortBy?.order ?? 'desc') as string
  }

  const { data, isFetching } = await getList(requestParams)

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    pagination.value = {
      ...pagination.value,
      totalItems: newVal.count,
    }

    items.value = newVal.rows
  })
}

const debouncedFetchData = debounce(fetchData, 400)

watch([
  sortBy,
  searchQuery,
], debouncedFetchData, { immediate: true })
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    :show-title="false"
    :show-items-per-page="false"
    :search-settings="{
      placeholder: 'Search jobs',
    }"
  >
    <template #searchSectionTitle>
      <VCardTitle class="!px-0">
        Active jobs
      </VCardTitle>
    </template>

    <template #table>
      <VDataTable
        v-model:sort-by="sortBy"
        :items="items"
        :headers="headers"
        :loading="isLoading"
      >
        <template #bottom>
          <TablePagination
            v-model:page="pagination.page"
            :items-per-page="pagination.itemsPerPage"
            :total-items="pagination.totalItems"
          />
        </template>

        <template #item.actions="{ item }">
          <div class="text-nowrap">
            <IconBtn
              :to="{ name: 'jobs-details-id', params: { id: item.id } }"
              title="View"
            >
              <VIcon icon="tabler-eye" />
            </IconBtn>
            <IconBtn
              :to="{ name: 'jobs-update-id', params: { id: item.id } }"
              title="Edit"
            >
              <VIcon icon="tabler-edit" />
            </IconBtn>
          </div>
        </template>
      </VDataTable>
    </template>
  </ItemsManage>
</template>
