<script setup lang="ts">
import type { BreadcrumbsItem } from '@/types/breadcrumbs/BreadcrumbsItem'

defineProps<{
  title: string
  breadcrumbs?: BreadcrumbsItem[]
}>()
</script>

<template>
  <div class="px-6">
    <h1 class="font-semibold text-2xl px-1">
      {{ title }}
    </h1>

    <VBreadcrumbs
      v-if="breadcrumbs"
      :items="breadcrumbs"
      class="!pl-0"
    />
  </div>
</template>
