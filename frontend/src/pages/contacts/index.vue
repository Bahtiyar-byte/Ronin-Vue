<script setup lang="ts">
import type Contact from '@/types/contacts/Contact'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

definePage({
  meta: {
    actions: 'read',
    subject: 'contacts',
  },
})

const { getList, deleteContact } = useContacts()

const headersDefinition = [
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone', sortable: false },
  { title: 'Status', key: 'status' },
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
} = useTableManagement<Contact>('contacts', getList, deleteContact, headersDefinition)
</script>

<template>
  <div>
    <ItemsManage
      v-model:items-per-page="pagination.itemsPerPage"
      v-model:search-query="searchQuery"
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

          <template #item.name="{ item }">
            <RouterLink :to="{ name: 'contacts-details-id', params: { id: item.id } }">
              {{ item.name }}
            </RouterLink>
          </template>

          <template #item.email="{ item }">
            <span v-html="item.related_emails.map(email => email.email).join('<br>')"></span>
          </template>

          <template #item.phone="{ item }">
            <span v-html="item.related_phones.map(phone => phone.phone_number).join('<br>')"></span>
          </template>

          <template #item.actions="{ item }">
            <IconBtn
              :to="{ name: 'contacts-details-id', params: { id: item.id } }"
              title="View"
            >
              <VIcon icon="tabler-eye" />
            </IconBtn>
            <IconBtn
              v-if="$can('update', 'contacts')"
              :to="{ name: 'contacts-update-id', params: { id: item.id } }"
              title="Edit"
            >
              <VIcon icon="tabler-edit" />
            </IconBtn>
            <IconBtn
              v-if="$can('delete', 'contacts')"
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
      title="Are you sure you want to delete this contact?"
    />
  </div>
</template>
