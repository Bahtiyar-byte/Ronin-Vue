<script setup lang="ts">
import coreConfig from '@core/config'

import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
</script>

<template>
  <div class="d-flex align-center app-logo">
    <VNodeRenderer :nodes="themeConfig.app.logoDocuments" />

    <h6 class="app-logo-title">
      {{ coreConfig.company.name }}
    </h6>
  </div>
</template>
