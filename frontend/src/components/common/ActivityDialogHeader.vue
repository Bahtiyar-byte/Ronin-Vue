<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div>
    <h4 class="text-2xl font-semibold text-center mb-6">
      {{ title }}
    </h4>
  </div>
</template>
