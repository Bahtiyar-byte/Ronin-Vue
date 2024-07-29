<script setup lang="ts">
import type { GetDocumentsRequest } from '@/types/documents/GetDocumentsRequest'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const searchParams = defineModel<GetDocumentsRequest>('searchParams', { default: {} })

const { getList } = useDocuments()

const { data: documentsList } = await getList(searchParams.value)
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 750"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <VCard class="sm:!p-10 !p-2">
      <VCardText>
        <!-- 👉 Title -->
        <ActivityDialogHeader title="Related documents" />

        <RouterLink
          v-for="(item, index) in documentsList?.rows"
          :key="index"
          :to="{ name: 'root' }"
        >
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center gap-2">
              <p class="font-semibold">
                {{ item.name }}
              </p>
            </div>
          </div>
          <VDivider
            v-if="index !== (documentsList?.rows.length ?? 0) - 1"
            class="border-gray-300 !opacity-60"
          />
        </RouterLink>
      </VCardText>
    </VCard>
  </VDialog>
</template>
