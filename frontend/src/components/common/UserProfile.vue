<script setup lang="ts">
import { useRouter } from 'vue-router'
import VueAvatar from '@webzlodimir/vue-avatar'
import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'
import { logout } from '@/utils/auth'

import '@webzlodimir/vue-avatar/dist/style.css'

const router = useRouter()

const user = useCurrentUserStore().user

const userName = computed(() => {
  if (!user) {
    return ''
  }

  const { name, firstName, lastName } = user

  if (name) {
    return name
  }

  return [firstName, lastName].filter(Boolean).join(' ')
})
</script>

<template>
  <VAvatar
    class="cursor-pointer"
    color="primary"
    variant="tonal"
  >
    <VueAvatar
      :border="false"
      :username="userName"
      color="#fff"
      :size="40"
    />

    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <VueAvatar
                :border="false"
                :username="userName"
                color="#fff"
                :size="40"
              />
            </VListItemAction>
          </template>

          <VListItemTitle
            v-if="userName.length"
            class="font-weight-semibold"
          >
            {{ userName }}
          </VListItemTitle>
          <VListItemSubtitle>
            <a :href="`mailto:${user?.email}`">{{ user?.email }}</a>
          </VListItemSubtitle>
        </VListItem>

        <VDivider class="my-2" />

        <!-- 👉 Profile -->
        <VListItem :to="{ name: 'profile' }">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-user"
              size="22"
            />
          </template>

          <VListItemTitle>Profile</VListItemTitle>
        </VListItem>

        <!-- Divider -->
        <VDivider class="my-2" />

        <!-- 👉 Logout -->
        <VListItem @click.prevent="logout(router)">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-logout"
              size="22"
            />
          </template>

          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VAvatar>
</template>

<style scoped>
VueAvatar {
  font-family: inherit
}
</style>
