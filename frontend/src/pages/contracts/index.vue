<script setup lang="ts">
import type Contract from '@/types/contracts/Contract'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

definePage({
  meta: {
    actions: 'read',
    subject: 'contracts',
  },
})

const { getList, deleteContract } = useContracts()

const headersDefinition = [
  { title: 'Name', key: 'name' },
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
} = useTableManagement<Contract>('contracts', getList, deleteContract, headersDefinition)
</script>

<template>
  <div>
    <ItemsManage
      v-model:items-per-page="pagination.itemsPerPage"
      v-model:search-query="searchQuery"
      items-title="Contracts"
      :search-settings="{ placeholder: 'Search contracts' }"
      :breadcrumbs="[
        {
          title: 'Home',
          to: { name: 'root' },
        },
        {
          title: 'Contracts',
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
          v-if="$can('create', 'contracts')"
          :to="{ name: 'contracts-builder-new' }"
          prepend-icon="tabler-plus"
        >
          Create contract
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
            <RouterLink :to="{ name: 'contracts-builder-id', params: { id: item.id } }">
              {{ item.name }}
            </RouterLink>
          </template>

          <template #item.actions="{ item }">
            <IconBtn
              :to="{ name: 'contracts-builder-id', params: { id: item.id } }"
              title="View"
            >
              <VIcon icon="tabler-eye" />
            </IconBtn>
            <IconBtn
              v-if="$can('update', 'contracts')"
              :to="{ name: 'contracts-builder-id-edit', params: { id: item.id } }"
              title="Edit"
            >
              <VIcon icon="tabler-edit" />
            </IconBtn>
            <IconBtn
              v-if="$can('delete', 'contracts')"
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
      title="Are you sure you want to delete this contract?"
    />
  </div>
</template>
