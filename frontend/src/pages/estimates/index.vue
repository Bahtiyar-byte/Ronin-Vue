<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'lodash'
import { useRoute } from 'vue-router'
import { useEstimates } from '@/composables/useEstimates'
import { useFilters } from '@/composables/useFilters'
import type { SortItem } from '@core/types'
import type Estimate from '@/types/estimates/Estimate'
import type { CheckboxFilterItem } from '@/types/filters/interfaces'

import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

const items = ref<Estimate[]>([])
const { getList, deleteEstimate } = useEstimates()

const { getVariants } = useFilters()

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  totalItems: 0,
})

const sortBy = ref<SortItem[]>([])

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Created at', key: 'createdAt' },
  { title: 'Actions', key: 'actions', sortable: false },
])

const route = useRoute()

const filters = ref<(CheckboxFilterItem)[]>([
  { type: 'checkbox', key: 'status', label: 'Status', options: [], value: [] },
])

onBeforeMount(async () => {
  const promises = Object.values(filters.value).map(async val => {
    if (val.options !== undefined && val.options.length === 0) {
      const { data } = await getVariants('estimates', val.key)

      if (data.value === null) {
        return
      }

      val.options = data.value
    }
  })

  await Promise.all(promises)

  Object.entries(route.query).forEach(([key, val]) => {
    const filter = filters.value.find(f => f.key === key)
    if (filter && val?.length) {
      filter.value = val as string
    }
  })
})

const isLoading = ref(false)
const searchQuery = ref<string>('')

const fetchData = async () => {
  const requestParams = {
    limit: pagination.value.itemsPerPage,
    offset: (pagination.value.page - 1) * pagination.value.itemsPerPage,
    sortBy: '',
    sortDesc: '',
    ...Object.fromEntries(filters.value.map(filter => [filter.key, filter?.value ?? ''])),
    q: searchQuery?.value ?? '',

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
  () => pagination.value.page,
  () => pagination.value.itemsPerPage,
  () => JSON.stringify(filters.value.map(filter => filter.value)),
  sortBy,
  searchQuery,
], debouncedFetchData, { immediate: true })

const selectedItems = ref<[]>()

interface IDeletionDialogOptions {
  visible: boolean
  onAccept: () => Promise<void>
}

const deletionDialogOptions = ref<IDeletionDialogOptions>({
  visible: false,
  onAccept: async () => {},
})

const handleItemDeletion = async (estimate: Estimate) => {
  deletionDialogOptions.value = {
    visible: true,
    onAccept: async () => {
      const { isFetching } = await deleteEstimate(estimate)

      watch(isFetching, async () => {
        await fetchData()
      })
    },
  }
}
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:filters="filters"
    v-model:search-query="searchQuery"
    items-title="Estimates"
    :search-settings="{ placeholder: 'Search estimates' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Estimates',
        disabled: true,
      },
    ]"
  >
    <template #filters>
      <FiltersList
        :filters="filters"
        class="flex gap-2"
      />
    </template>

    <template #buttons>
      <VBtn
        :to="{ name: 'estimates-create' }"
        prepend-icon="tabler-plus"
      >
        Create estimate
      </VBtn>
    </template>

    <template #table>
      <VDataTable
        v-model="selectedItems"
        v-model:sort-by="sortBy"
        :items="items"
        :headers="headers"
        :loading="isLoading"
        show-select
      >
        <template #bottom>
          <TablePagination
            v-model:page="pagination.page"
            :items-per-page="pagination.itemsPerPage"
            :total-items="pagination.totalItems"
          />
        </template>

        <template #item.actions="{ item }">
          <IconBtn
            :to="{ name: 'estimates-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'estimates-update-id', params: { id: item.id } }"
            title="Edit"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="() => handleItemDeletion(item)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>
      </VDataTable>
    </template>
  </ItemsManage>

  <ConfirmDialog
    v-model:is-visible="deletionDialogOptions.visible"
    :on-accept="deletionDialogOptions.onAccept"
    title="Are you sure you want to delete this estimate?"
  />
</template>
