<script setup lang="ts">
import { useJobs } from '@/composables/useJobs'
import type Job from '@/types/jobs/Job'
import { useTableManagement } from '@/utils/forms/useTableManagement'

const { getList, deleteJob } = useJobs()

const {
  items,
  pagination,
  sortBy,
  headers,
  filters,
  isLoading,
  searchQuery,
  selectedItems,
  deletionDialogOptions,
  handleItemDeletion,
} = useTableManagement<Job>('jobs', getList, deleteJob, [
  { title: 'Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
])
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    items-title="Jobs"
    :search-settings="{ placeholder: 'Search jobs' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Jobs',
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
        :to="{ name: 'jobs-create' }"
        prepend-icon="tabler-plus"
      >
        Create job
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

        <template #item.name="{ item }">
          <RouterLink :to="{ name: 'jobs-details-id', params: { id: item.id } }">
            {{ item.name }}
          </RouterLink>
        </template>

        <template #item.actions="{ item }">
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
    title="Are you sure you want to delete this job?"
  />
</template>
