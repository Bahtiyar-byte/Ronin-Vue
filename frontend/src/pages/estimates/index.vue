<script setup lang="ts">
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import type Estimate from '@/types/estimates/Estimate'
import { useTableManagement } from '@/utils/forms/useTableManagement'

const { getList, deleteEstimate } = useEstimates()

const headersDefinition = [
  { title: 'Name', key: 'name' },
  { title: 'Created at', key: 'createdAt' },
  { title: 'Actions', key: 'actions', sortable: false },
]

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
} = useTableManagement<Estimate>('estimates', getList, deleteEstimate, headersDefinition)
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
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
