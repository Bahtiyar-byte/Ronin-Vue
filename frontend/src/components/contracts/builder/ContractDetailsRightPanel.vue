<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Contract from '@/types/contracts/Contract'

defineProps<{
  handleDownload: () => void
  handlePrint: () => void
  route: RouteLocationNormalizedLoaded
}>()

const contract = defineModel<Contract>('contract', { required: true })
const loading = defineModel<boolean>('loading')
const isSendContractSidebarVisible = defineModel<boolean>('isSendContractSidebarVisible')
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
          @click="isSendContractSidebarVisible = !isSendContractSidebarVisible"
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
            v-if="$can('update', 'contracts')"
            class="flex-1"
            variant="tonal"
            color="secondary"
            :to="{ name: 'contracts-builder-id-edit', params: route.params }"
          >
            Edit
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <VCard v-if="contract.name?.length">
      <VCardText class="space-y-3">
        <p>{{ contract.name }}</p>
      </VCardText>
    </VCard>
  </div>
</template>
