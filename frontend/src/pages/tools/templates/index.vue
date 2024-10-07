<script setup lang="ts">
import { useTemplates } from '@/composables/useTemplates'
import type Template from '@/types/templates/Template'
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useTableManagement } from '@/utils/forms/useTableManagement'

definePage({
  meta: {
    actions: 'read',
    subject: 'templates',
  },
})

const { getList, deleteTemplate } = useTemplates()

const headersDefinition = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Trade', key: 'related_trade', sortable: false },
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
} = useTableManagement<Template>('templates', getList, deleteTemplate, headersDefinition)
</script>

<template>
  <ItemsManage
    v-model:items-per-page="pagination.itemsPerPage"
    v-model:search-query="searchQuery"
    items-title="Templates"
    :search-settings="{ placeholder: 'Search templates' }"
    :breadcrumbs="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Templates',
        disabled: true,
      },
    ]"
  >
    <template #buttons>
      <VBtn
        :to="{ name: 'tools-templates-create' }"
        prepend-icon="tabler-plus"
      >
        Create template
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
          <RouterLink :to="{ name: 'tools-templates-details-id', params: { id: item.id } }">
            {{ item.name }}
          </RouterLink>
        </template>

        <template #item.related_trade="{ item }">
            {{ item.related_trade?.length }}
        </template>

        <template #item.actions="{ item }">
          <IconBtn
            :to="{ name: 'tools-templates-details-id', params: { id: item.id } }"
            title="View"
          >
            <VIcon icon="tabler-eye" />
          </IconBtn>
          <IconBtn
            :to="{ name: 'tools-templates-update-id', params: { id: item.id } }"
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
    title="Are you sure you want to delete this template?"
  />
</template>
