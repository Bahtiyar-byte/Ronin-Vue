<script setup lang="ts">
const tab = ref(null)

const tabsList = [
  { name: 'General' },
  { name: 'Security' },
]
</script>

<template>
  <VTabs
    v-model="tab"
  >
    <VTab
      v-for="tabsItem in tabsList"
      :key="`profile-tabs-item-${tabsItem.name}`"
    >
      {{ tabsItem.name }}
    </VTab>
  </VTabs>
  <VWindow v-model="tab">
    <VWindowItem
      v-for="tabsItem in tabsList"
      :key="`profile-tabs-window-${tabsItem.name}`"
    >
      <div class="max-h-fit">{{ tabsItem.name }}</div>
    </VWindowItem>
  </VWindow>
</template>
