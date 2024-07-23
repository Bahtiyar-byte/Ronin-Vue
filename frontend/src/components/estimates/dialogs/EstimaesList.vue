<script setup lang="ts">
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const searchParams = defineModel<GetEstimatesRequest>('searchParams', { default: {} })

const { getList } = useEstimates()

const { data: estimatesList } = await getList(searchParams.value)
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
        <h4 class="text-2xl font-semibold text-center mb-6">
          Related estimates
        </h4>

        <RouterLink
          v-for="(item, index) in estimatesList?.rows"
          :key="index"
          :to="{ name: 'estimates-builder-id', params: { id: item.id } }"
        >
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center gap-2">
              <VIcon
                icon="tabler-file-type-pdf"
                :size="24"
              />
              <p class="font-semibold">
                {{ item.name }}
              </p>
            </div>
          </div>
          <VDivider
            v-if="index !== (estimatesList?.rows.length ?? 0) - 1"
            class="border-gray-300 !opacity-60"
          />
        </RouterLink>
      </VCardText>
    </VCard>
  </VDialog>
</template>
