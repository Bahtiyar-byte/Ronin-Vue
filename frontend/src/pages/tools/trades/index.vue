<script setup lang="ts">
import { useTrades } from '@/composables/useTrades'
import type Trade from '@/types/trades/Trade'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

const { getList, deleteContact } = useTrades()

const headersDefinition = [
  { title: 'Name', key: 'name' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const {
  items,
  pagination,
  sortBy,
  headers,
  isLoading,
  searchQuery,
  selectedItems,
  deletionDialogOptions,
  handleItemDeletion,
} = useTableManagement<Trade>('trades', getList, deleteContact, headersDefinition)
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    items-title="Trades"
    :search-settings="{ placeholder: 'Search trades' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Trades',
        disabled: true,
      },
    ]"
  >
    <template #buttons>
      <VBtn
        :to="{ name: 'tools-trades-create' }"
        prepend-icon="tabler-plus"
      >
        Create trade
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
            :to="{ name: 'tools-trades-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'tools-trades-update-id', params: { id: item.id } }"
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
    title="Are you sure you want to delete this trade?"
  />
</template>
