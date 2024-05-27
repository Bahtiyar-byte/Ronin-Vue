<script setup lang="ts">
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'

defineProps<{
  title: string
  breadcrumbs?: BreadcrumbsItem[]
}>()
</script>

<template>
  <VContainer class="!py-0">
    <VRow class="flex-col">
      <VCol>
        <h1 class="font-semibold text-2xl px-1">
          {{ title }}
        </h1>

        <VBreadcrumbs
          v-if="breadcrumbs"
          :items="breadcrumbs"
          class="!pl-0"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
