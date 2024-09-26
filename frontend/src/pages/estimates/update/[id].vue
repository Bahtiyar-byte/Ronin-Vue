<script setup lang="ts">
import Create from '@/pages/estimates/create.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'estimates',
  },
})
</script>

<template>
  <Create />
</template>
