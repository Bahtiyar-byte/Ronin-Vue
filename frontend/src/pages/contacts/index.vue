<script setup lang="ts">
import ItemsManage from '@/components/common/CRUD/ItemsManage.vue'

// const searchQuery = ref('')
const items = ref([]) // Ваши данные для таблицы

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone', sortable: false },
  { title: 'Stage', key: 'stage' },
])

const deleteSelected = async () => {
  alert('Currently no deletion implemented :(')
}
</script>

<template>
  <ItemsManage items-title="Contacts">
    <template #additional-actions>
      <VListItem
        base-color="error"
        @click="deleteSelected"
      >
        Delete Selected
      </VListItem>
    </template>

    <template #buttons>
      <VBtn :to="{ name: 'root' }">
        Create
      </VBtn>
    </template>

    <template #table>
      <VDataTable
        :items="items"
        :headers="headers"
      />
    </template>
  </ItemsManage>
</template>
