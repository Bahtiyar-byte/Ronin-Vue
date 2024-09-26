<script setup lang="ts">
import type { GetJobsRequest } from '@/types/jobs/GetJobsRequest'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const searchParams = defineModel<GetJobsRequest>('searchParams', { default: {} })

const { getList } = useJobs()

const { data: jobsList } = await getList(searchParams.value)
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
        <ActivityDialogHeader title="Related jobs" />

        <RouterLink
          v-for="(item, index) in jobsList?.rows"
          :key="index"
          :to="{ name: 'jobs-details-id', params: { id: item.id as string } }"
        >
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center gap-2">
              <p class="font-semibold">
                {{ item.name }}
              </p>
            </div>
          </div>
          <VDivider
            v-if="index !== (jobsList?.rows.length ?? 0) - 1"
            class="border-gray-300 !opacity-60"
          />
        </RouterLink>
      </VCardText>
    </VCard>
  </VDialog>
</template>
