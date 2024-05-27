<script setup lang="ts">
import { ref, watch } from 'vue'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import { useContacts } from '@/composables/useContacts'
import type { SortItem } from '@core/types'
import type Contact from '@/types/contacts/Contact'
import type { CheckboxFilterItem, FilterItem } from '@/types/filters/interfaces'

const items = ref<Contact[]>([])
const { getList } = useContacts()

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  totalItems: 0,
})

const sortBy = ref<SortItem[]>([])

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone', sortable: false },
  { title: 'Stage', key: 'stage' },
])

const filterValues = ref<{ [key: string]: string | string[] }>({})

const filters = ref<(FilterItem | CheckboxFilterItem)[]>([
  { type: 'text', key: 'name', label: 'Name' },
  { type: 'text', key: 'email', label: 'Email' },
  { type: 'text', key: 'phone', label: 'Phone' },
  { type: 'checkbox', key: 'stage', label: 'Stage', options: [] },
])

const isLoading = ref(false)

const fetchData = async () => {
  const requestParams = {
    limit: pagination.value.itemsPerPage,
    offset: (pagination.value.page - 1) * pagination.value.itemsPerPage,
    sortBy: '',
    sortDesc: '',
    ...filterValues.value,
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

const onApplyFilters = (newFilterValues: { [key: string]: string | string[] }) => {
  filterValues.value = newFilterValues
  fetchData()
}

watch([() => pagination.value.page, () => pagination.value.itemsPerPage, sortBy], fetchData, { immediate: true })

const selectedItems = ref<[]>()

const deleteSelected = async () => {
  alert(`You are trying to delete contacts: ${selectedItems.value?.join(', ')}`)
}
</script>

<template>
  <ItemsManage
    items-title="Contacts"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Contacts',
        disabled: true,
      },
    ]"
  >
    <template #filters>
      <FiltersList
        :filters="filters"
        :on-apply="onApplyFilters"
        class="flex gap-2"
      />
    </template>

    <template #additional-actions>
      <VListItem
        base-color="error"
        @click="deleteSelected"
      >
        Delete Selected
      </VListItem>
    </template>

    <template #buttons>
      <VBtn :to="{ name: 'contacts-update' }">
        Create
      </VBtn>
    </template>

    <template #table>
      <VDataTable
        v-model="selectedItems"
        v-model:page="pagination.page"
        v-model:items-per-page="pagination.itemsPerPage"
        v-model:sort-by="sortBy"
        :items="items"
        :headers="headers"
        :server-items-length="pagination.totalItems"
        :loading="isLoading"
        show-select
      />
    </template>
  </ItemsManage>
</template>
