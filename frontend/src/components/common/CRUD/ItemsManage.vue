<script setup lang="ts">
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'
import PageHeader from '@/components/common/PageHeader.vue'

defineProps<{
  itemsTitle: string
  breadcrumbs?: BreadcrumbsItem[]
}>()
</script>

<template>
  <PageHeader
    :title="itemsTitle"
    :breadcrumbs="breadcrumbs"
  />

  <VCard>
    <VContainer>
      <VRow>
        <slot name="filters" />

        <div class="flex gap-2 ml-auto">
          <VMenu v-if="$slots['additional-actions']">
            <template #activator="{ props: activatorProps }">
              <VBtn
                variant="outlined"
                color="secondary"
                v-bind="activatorProps"
                prepend-icon="tabler-settings"
              >
                Actions
              </VBtn>
            </template>
            <VList>
              <slot name="additional-actions" />
            </VList>
          </VMenu>
          <slot name="buttons" />
        </div>
      </VRow>
    </VContainer>
  </VCard>

  <VCard class="mt-6">
    <VCardText>
      <slot name="table" />
    </VCardText>
  </VCard>
</template>
