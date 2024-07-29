<script setup lang="ts">
import CompanyGeneralDocuments from '@/components/myorg/CompanyGeneralDocuments.vue'
</script>

<template>
  <div>
    <VBreadcrumbs
      :items="[
        {
          title: 'Home',
          to: { name: 'root' },
        },
        {
          title: 'My Org',
          disabled: true,
          to: { name: 'myorg' },
        },
      ]"
      class="!pl-0"
    />
    <VCard class="text-lg;">
      <CompanyGeneralDocuments />
    </VCard>
  </div>
</template>
