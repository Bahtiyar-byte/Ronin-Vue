<script setup lang="ts">
import { useContactPhones } from '@/composables/useContactPhones'
import type ContactPhone from '@/types/contactphones/ContactPhone'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

definePage({
  meta: {
    actions: 'read',
    subject: 'templates',
  },
})

const { getList, deletePhone } = useContactPhones()

const headersDefinition = [
  { title: 'Phone Number', key: 'phone_number' },
  { title: 'Type', key: 'type' },
  { title: 'Primary', key: 'is_primary' },
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
} = useTableManagement<ContactPhone>('contactphones', getList, deletePhone, headersDefinition)
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    items-title="Contact Phones"
    :search-settings="{ placeholder: 'Search Phone Number' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Contact Phone',
        disabled: true,
      },
    ]"
  >
    <template #buttons>
      <VBtn
        :to="{ name: 'contactphones-create' }"
        prepend-icon="tabler-plus"
      >
        Create Phone Number
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

        <template #item.email="{ item }">
          <RouterLink :to="{ name: 'contactphones-details-id', params: { id: item.id } }">
            {{ item.phone_number }}
          </RouterLink>
        </template>

        <template #item.type="{ item }">
            {{ item.type.toUpperCase() }}
        </template>

        <template #item.is_primary="{ item }">
          {{ item.is_primary ? "Yes" : "No" }}
        </template>

        <template #item.actions="{ item }">
          <IconBtn
            :to="{ name: 'contactphones-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'contactphones-update-id', params: { id: item.id } }"
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
    title="Are you sure you want to delete this phone number?"
  />
</template>
