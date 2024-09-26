<script setup lang="ts">
import { debounce } from 'lodash'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppointments } from '@/composables/useAppointments'
import { useFilters } from '@/composables/useFilters'
import type Appointment from '@/types/appointments/Appointment'
import type { CheckboxFilterItem } from '@/types/filters/interfaces'
import type { SortItem } from '@core/types'

import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'appointments',
  },
})

const items = ref<Appointment[]>([])
const { getList, deleteAppointment } = useAppointments()

const { getVariants } = useFilters()

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  totalItems: 0,
})

const sortBy = ref<SortItem[]>([])

const headers = ref([
  { title: 'Subject', key: 'subject' },
  { title: 'Actions', key: 'actions', sortable: false },
])

const route = useRoute()

const filters = ref<(CheckboxFilterItem)[]>([])

onBeforeMount(async () => {
  const promises = Object.values(filters.value).map(async val => {
    if (val.options !== undefined && val.options.length === 0) {
      const { data } = await getVariants('appointments', val.key)

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
  }, { immediate: true })
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
  onAccept: async () => { },
})

const handleItemDeletion = async (appointment: Appointment) => {
  deletionDialogOptions.value = {
    visible: true,
    onAccept: async () => {
      const { isFetching } = await deleteAppointment(appointment)

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
    v-model:search-query="searchQuery"
    items-title="Appointments"
    :search-settings="{ placeholder: 'Search appointments' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Appointments',
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
        :to="{ name: 'appointments-create' }"
        prepend-icon="tabler-plus"
      >
        Create appointment
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
            :to="{ name: 'appointments-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            v-if="$can('update', 'appointments')"
            :to="{ name: 'appointments-update-id', params: { id: item.id } }"
            title="Edit"
          >
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn
            v-if="$can('delete', 'appointments')"
            @click="() => handleItemDeletion(item)"
          >
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>
      </VDataTable>
    </template>
  </ItemsManage>

  <ConfirmDialog
    v-model:is-visible="deletionDialogOptions.visible"
    :on-accept="deletionDialogOptions.onAccept"
    title="Are you sure you want to delete this appointment?"
  />
</template>
