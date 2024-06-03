<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  title: string
  entities: {
    title: string
    icon: string
    to: RouteLocationRaw
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Quick add',
  entities: [
    {
      title: 'Contact',
      icon: 'mdi-account-box-outline',
      to: { name: 'contacts-create' },
    },
    {
      title: 'Job',
      icon: 'material-symbols-task-outline',
      to: { name: 'jobs-create' },
    },
  ],
})
</script>

<template>
  <VCard :title="props.title">
    <VCardText class="flex gap-3">
      <RouterLink
        v-for="(val, key) in props.entities"
        :key="`quick-create-${key}`"
        :to="val.to"
        class="flex flex-column items-center gap-1"
      >
        <div class="font-medium">
          {{ val.title }}
        </div>

        <VAvatar
          variant="tonal"
          rounded
          size="42"
          :title="val.title"
        >
          <VIcon
            :icon="val.icon"
            size="26"
          />
        </VAvatar>
      </RouterLink>
    </VCardText>
  </VCard>
</template>
