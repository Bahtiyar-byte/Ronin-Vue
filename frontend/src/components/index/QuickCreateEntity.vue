<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { AbilityRule } from '@/types/roles/roles'
import { useAbility } from '@/plugins/casl/composables/useAbility'

interface Props {
  title?: string
  entities?: {
    title: string
    icon: string
    to: RouteLocationRaw
    permission: AbilityRule
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Quick add',
  entities: [
    {
      title: 'Contact',
      icon: 'mdi-account-box-outline',
      to: { name: 'contacts-create' } as RouteLocationRaw,
      permission: {
        action: 'create',
        subject: 'contacts',
      },
    },
    {
      title: 'Job',
      icon: 'material-symbols-task-outline',
      to: { name: 'jobs-create' } as RouteLocationRaw,
      permission: {
        action: 'create',
        subject: 'jobs',
      },
    },
  ],
})

const ability = useAbility()

const entities = computed(() => {
  return props.entities.filter(entity => ability.can(entity.permission.action, entity.permission.subject))
})
</script>

<template>
  <VCard :title="props.title">
    <VCardText class="flex gap-3">
      <RouterLink
        v-for="(val, key) in entities"
        :key="`quick-create-${key}`"
        :to="val.to as object"
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
