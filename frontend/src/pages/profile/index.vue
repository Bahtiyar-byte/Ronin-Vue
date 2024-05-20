<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabSkeleton from '@/components/common/skeletons/TabSkeleton.vue'

const tab = ref(null)

const tabsList = [
  {
    name: 'General',
    component: defineAsyncComponent({
      loader: () => import('@/components/profile/tabs/GeneralTab.vue'),
      loadingComponent: TabSkeleton,
      delay: 50,
      timeout: 3000,
    }),
  },
  {
    name: 'Security',
    component: defineAsyncComponent({
      loader: () => import('@/components/profile/tabs/SecurityTab.vue'),
      loadingComponent: TabSkeleton,
      delay: 50,
      timeout: 3000,
    }),
  },
]
</script>

<template>
  <VTabs
    v-model="tab"
    class="mb-4"
  >
    <VTab
      v-for="tabsItem in tabsList"
      :key="`profile-tabs-item-${tabsItem.name}`"
      :value="tabsItem.name"
    >
      {{ tabsItem.name }}
    </VTab>
  </VTabs>
  <VWindow v-model="tab">
    <VWindowItem
      v-for="tabsItem in tabsList"
      :key="`profile-tabs-window-${tabsItem.name}`"
      :value="tabsItem.name"
    >
      <component :is="tabsItem.component" />
    </VWindowItem>
  </VWindow>
</template>
