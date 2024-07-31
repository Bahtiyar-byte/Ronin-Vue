<script setup lang="ts">
import Create from '@/pages/settings/roles/create.vue'
definePage({
  meta: {
    action: 'read',
    subject: 'roles',
  },
})
</script>

<template>
  <Create />
</template>
