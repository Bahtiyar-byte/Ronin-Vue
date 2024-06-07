<script setup lang="ts">
import type Estimate from '@/types/estimates/Estimate'

defineProps<{
  estimateData: Estimate
}>()

const estimateEditVisible = defineModel<boolean>('estimateEditVisible', {
  default: true,
})
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="estimateData.name as string">
        <VCardText>
          <!-- 👉 Details -->
          <h5 class="text-[1.05rem] leading-[1.5] font-medium">
            Details
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <!-- 👉 Estimate Details list -->
          <VList class="card-list mt-2" />
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="estimateEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'estimates-update-id', params: { id: estimateData.id } }"
            variant="elevated"
            class="w-full"
          >
            Edit
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
