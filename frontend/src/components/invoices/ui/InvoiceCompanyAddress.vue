<script setup lang="ts">
import coreConfig from '@core/config'
</script>

<template>
  <div>
    <p
      v-for="(address, addressKey) in coreConfig.company.address.split('\n')"
      :key="`estimate-address-${addressKey}`"
      class="text-high-emphasis mb-0"
    >
      {{ address }}
    </p>
  </div>
</template>
