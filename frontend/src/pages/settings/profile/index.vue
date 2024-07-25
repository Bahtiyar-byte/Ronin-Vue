<script lang="ts" setup>
import UserInfo from '@/components/settings/user/index.vue'

definePage({
  meta: {
    layoutWrapperClasses: 'layout-content-height-fixed',
  },
})
</script>

<template>
  <VCard>
    <UserInfo />
  </VCard>
</template>
