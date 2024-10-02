<script setup lang="ts">
import { useAddress } from '@/composables/useAddress'
import type Address from '@/types/address/Address'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

definePage({
  meta: {
    action: 'manage',
    subject: 'crew',
  },
})

const { getList, deleteAddress } = useAddress()

const headersDefinition = [
  { title: 'Street', key: 'street' },
  { title: 'Suit/Apartment/Unit', key: 'suite_apt_unit' },
  { title: 'City', key: 'city' },
  { title: 'State', key: 'state' },
  { title: 'Zip Code', key: 'zip' },
  { title: 'Mailing Address', key: 'is_mailing_address' },
  { title: 'Location', key: 'is_location' },
  { title: 'Billing Address', key: 'is_billing_Address' },
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
} = useTableManagement<Address>('addresses', getList, deleteAddress, headersDefinition)
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    items-title="Addresses"
    :search-settings="{ placeholder: 'Search address' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Address',
        disabled: true,
      },
    ]"
  >
    <template #buttons>
      <VBtn
        :to="{ name: 'addresses-create' }"
        prepend-icon="tabler-plus"
      >
        Create address
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

        <template #item.street="{ item }">
          {{ item.street }}
        </template>

        <template #item.city="{ item }">
          {{ item.city }}
        </template>

        <template #item.is_mailing_address="{ item }">
          {{ item.is_mailing_address ? 'Yes' : 'No' }}
        </template>

        <template #item.is_location="{ item }">
          {{ item.is_location ? 'Yes' : 'No' }}
        </template>

        <template #item.is_billing_Address="{ item }">
          {{ item.is_billing_Address ? 'Yes' : 'No' }}
        </template>

        <template #item.actions="{ item }">
          <IconBtn
            :to="{ name: 'addresses-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'addresses-update-id', params: { id: item.id } }"
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
    title="Are you sure you want to delete this address?"
  />
</template>
