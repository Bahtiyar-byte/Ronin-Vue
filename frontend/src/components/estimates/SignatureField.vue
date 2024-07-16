<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="border-t border-gray-700 dark:border-gray-950">
    <p class="text-sm mt-0.5">{{ title }}</p>
  </div>
</template>
