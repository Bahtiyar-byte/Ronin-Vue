<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'

defineProps<{
  handleDownload: () => void
  handlePrint: () => void
  route: RouteLocationNormalizedLoaded
}>()

const estimate = defineModel<Estimate>('estimate', { required: true })
const loading = defineModel<boolean>('loading')
const isSendEstimateSidebarVisible = defineModel<boolean>('isSendEstimateSidebarVisible')
</script>

<template>
  <div class="!sticky top-4">
    <VCard
      :loading="loading"
      class="mb-8"
    >
      <VCardText class="space-y-3">
        <VBtn
          block
          prepend-icon="tabler-send"
          @click="isSendEstimateSidebarVisible = !isSendEstimateSidebarVisible"
        >
          Send
        </VBtn>

        <VBtn
          block
          variant="tonal"
          color="secondary"
          prepend-icon="tabler-download"
          @click="handleDownload"
        >
          Download
        </VBtn>

        <div class="flex gap-2.5">
          <VBtn
            class="flex-1"
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-printer"
            @click="handlePrint"
          >
            Print
          </VBtn>
          <VBtn
            v-if="$can('update', 'estimates')"
            class="flex-1"
            variant="tonal"
            color="secondary"
            :to="{ name: 'estimates-builder-id-edit', params: route.params }"
          >
            Edit
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <VCard v-if="estimate.name?.length">
      <VCardText class="space-y-3">
        <p>{{ estimate.name }}</p>
      </VCardText>
    </VCard>
  </div>
</template>
