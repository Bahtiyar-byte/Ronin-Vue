<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'lodash'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import { useContacts } from '@/composables/useContacts'
import type { SortItem } from '@core/types'
import type Contact from '@/types/contacts/Contact'
import type { CheckboxFilterItem } from '@/types/filters/interfaces'

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
  { title: 'Actions', key: 'actions', sortable: false },
])

const filters = ref<(CheckboxFilterItem)[]>([
  { type: 'checkbox', key: 'stage', label: 'Stage', options: ['Lead', 'Prospect', 'Customer'], value: [] },
])

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
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    v-model:filters="filters"
    items-title="Contacts"
    :search-settings="{ placeholder: 'Search contacts' }"
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
        class="flex gap-2"
      />
    </template>

    <template #buttons>
      <VBtn
        :to="{ name: 'contacts-create' }"
        prepend-icon="tabler-plus"
      >
        Create contact
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
            :to="{ name: 'contacts-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'contacts-update-id', params: { id: item.id } }"
            title="Edit"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn
            @click="(e: any) => {
              console.log(e)
            }"
          >
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>
      </VDataTable>
    </template>
  </ItemsManage>
</template>
