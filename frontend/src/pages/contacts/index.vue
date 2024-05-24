<script setup lang="ts">
import { ref, watch } from 'vue'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import { useContacts } from '@/composables/useContacts'
import type { SortItem } from '@core/types'
import type Contact from '@/types/contacts/Contact'

// const searchQuery = ref('')
const items = ref<Contact[]>([]) // Ваши данные для таблицы
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

const fetchData = async () => {
  const requestParams = {
    limit: pagination.value.itemsPerPage,
    offset: (pagination.value.page - 1) * pagination.value.itemsPerPage,
    sortBy: '',
    sortDesc: '',
  }

  const [_sortBy] = sortBy.value
  if (_sortBy !== undefined) {
    requestParams.sortBy = _sortBy.key
    requestParams.sortDesc = (_sortBy?.order ?? 'desc') as string
  }

  const { data } = await getList(requestParams)

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

watch([() => pagination.value.page, () => pagination.value.itemsPerPage, sortBy], fetchData, { immediate: true })

const deleteSelected = async () => {
  alert('Currently no deletion implemented :(')
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
    <template #additional-actions>
      <VListItem
        base-color="error"
        @click="deleteSelected"
      >
        Delete Selected
      </VListItem>
    </template>

    <template #buttons>
      <VBtn :to="{ name: 'root' }">
        Create
      </VBtn>
    </template>

    <template #table>
      <VDataTable
        v-model:page="pagination.page"
        v-model:items-per-page="pagination.itemsPerPage"
        v-model:sort-by="sortBy"
        :items="items"
        :headers="headers"
        :server-items-length="pagination.totalItems"
      />
    </template>
  </ItemsManage>
</template>
