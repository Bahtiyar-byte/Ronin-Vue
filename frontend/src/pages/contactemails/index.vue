<script setup lang="ts">
import { useContactEmails } from '@/composables/useContactEmails'
import type ContactEmail from '@/types/contactemails/ContactEmail'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

definePage({
  meta: {
    actions: 'read',
    subject: 'templates',
  },
})

const { getList, deleteEmail } = useContactEmails()

const headersDefinition = [
  { title: 'Email', key: 'email' },
  { title: 'Type', key: 'type' },
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
} = useTableManagement<ContactEmail>('contactemail', getList, deleteEmail, headersDefinition)
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    items-title="Contact Emails"
    :search-settings="{ placeholder: 'Search Contact Email' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Contact Emails',
        disabled: true,
      },
    ]"
  >
    <template #buttons>
      <VBtn
        :to="{ name: 'contactemails-create' }"
        prepend-icon="tabler-plus"
      >
        Create Contact Email
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
          <RouterLink :to="{ name: 'contactemails-details-id', params: { id: item.id } }">
            {{ item.email }}
          </RouterLink>
        </template>

        <template #item.type="{ item }">
            {{ item.type.toUpperCase() }}
        </template>

        <template #item.actions="{ item }">
          <IconBtn
            :to="{ name: 'contactemails-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'contactemails-update-id', params: { id: item.id } }"
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
    title="Are you sure you want to delete this email?"
  />
</template>
