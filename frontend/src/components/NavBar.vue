<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useLayoutStore } from '@/stores/layout.js'
import {
  // mdiForwardburger,
  mdiBackburger,
  // mdiClose,
  // mdiDotsVertical,
  mdiMenu,
  // mdiAccount,
  // mdiCogOutline,
  // mdiEmail,
  // mdiLogout,
} from '@mdi/js'
import NavBarItem from '@/components/NavBarItem.vue'
import AppLogo from "@/components/common/AppLogo.vue";
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import UserAvatar from '@/components/UserAvatar.vue'
// import BaseIcon from '@/components/BaseIcon.vue'

const dropdownActive = ref(false);

const authStore = useAuthStore()

const currentUser = computed(() => authStore.currentUser)

const layoutStore = useLayoutStore()

const isNavBarVisible = computed(() => !layoutStore.isFullScreen)

const isAsideExpanded = computed(() => layoutStore.isAsideExpanded)

const menuToggleIcon = computed(() => isAsideExpanded.value ? mdiBackburger : mdiMenu)
const menuToggleTitle = computed(() => isAsideExpanded.value ? `Hide menu` : `Show menu`)

const menuToggle = () => layoutStore.asideToggle()

// const menuOpenLg = () => {
//   layoutStore.asideLgToggle(true)
// }

const logout = () => {
  authStore.logoutUser()
}
</script>

<template>
<!--  <VAppBar></VAppBar>-->
  <v-app-bar
    tag="nav"
    v-show="isNavBarVisible"
    class="main-navbar top-0 right-0 fixed flex bg-white h-14 z-30 w-screen transition-position ease-in-out lg:w-auto lg:items-stretch"
    :class="{/*'!left-60': isAsideExpanded, */'left-0': !isAsideExpanded}"
    height="auto"
  >
    <div class="flex-1 items-stretch justify-between flex h-14">
      <NavBarItem>
        <v-btn
          variant="plain"
          :icon="menuToggleIcon"
          :title="menuToggleTitle"
          @click.prevent="menuToggle"
        />

        <AppLogo />
      </NavBarItem>

      <NavBarMenu v-model="dropdownActive">
        <NavBarItemLabel
          :label="currentUser?.firstName || 'Admin'"
          class-name="line-clamp-2 max-w-[150px]"
        >
          <UserAvatar v-if="!currentUser?.avatar?.length"
                      class="w-10 h-10 md:mr-6"
          />
          <img v-else
               class="rounded-full w-6 h-6 mr-3 inline-flex"
               :src="currentUser.avatar[0].publicUrl"
               :alt="currentUser.avatar[0].name"
          />
        </NavBarItemLabel>
      </NavBarMenu>
    </div>

    <template v-if="dropdownActive" #extension>
      <div
        class="text-sm border-b border-gray-100 lg:border-b-0 lg:border-gray-200 lg:border-t lg:bg-white lg:absolute
          lg:top-0 lg:right-0 lg:max-w-[320px] min-w-[170px] lg:z-20 lg:shadow-md lg:rounded-b lg:dark:bg-gray-800
          dark:border-gray-700"
      >
        <NavBarItem :to="{ name: 'Profile' }">
          <NavBarItemLabel
            icon="mdi-account"
            label="My Profile"
            is-v-icon
          />
        </NavBarItem>

        <BaseDivider nav-bar />
        <NavBarItem
          @click="logout"
        >
          <NavBarItemLabel
            icon="mdi-logout"
            label="Log Out"
            is-v-icon
          />
        </NavBarItem>
      </div>
    </template>
    </v-app-bar>


</template>
