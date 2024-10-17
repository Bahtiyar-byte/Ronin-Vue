<script lang="ts" setup>
import Fleet from '@/components/scheduler/Fleet.vue'
import NewSchedule from '@/components/scheduler/NewSchedule.vue'

definePage({
  meta: {
    action: 'manage',
    subject: 'basicActions',
  },
})
</script>

<template>
  <div>
    <VCard class="mb-3">
      <NewSchedule />
    </VCard>
    <Fleet />
  </div>
</template>
