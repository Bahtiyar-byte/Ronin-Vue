<script setup>
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { mdiMenu } from '@mdi/js'
import AsideMenuList from '@/components/AsideMenuList.vue'
import NavBarItem from '@/components/NavBarItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import {computed} from "vue";

defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})

const styleStore = useStyleStore()

const layoutStore = useLayoutStore()
const isAsideExpanded = computed(() => layoutStore.isAsideExpanded)

// const menuClick = () => {
  //
// }
</script>

<template>
  <v-navigation-drawer
    app
    tag="aside"
    class="mt-14"
    v-model="isAsideExpanded"
    permanent
  >

<!--    :class="{ 'lg:!w-60': isAsideExpanded }"-->
<!--    expand-on-hover-->
<!--    rail-->
<!--    :rail-width="60"-->

    <v-list nav>
      <template
        v-for="(menuGroup, index) in menu"
        :key="`aside-g-${index}`"
      >
        <v-list-subheader>{{ menuGroup.title }}</v-list-subheader>

        <v-list-item
          v-for="(menuItem, i) in menuGroup.items"
          :key="`aside-menu-item-${i}`"
          :to="menuItem.to"
        >
          <v-list-item-title
            class="flex items-center !text-[1.1rem] leading-relaxed"
          >
            <v-icon class="mr-4" :icon="menuItem.icon" />

            {{ menuItem.label }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

<!--    <template>-->
<!--      <p-->
<!--        v-if="typeof menuGroup === 'string'"-->
<!--        :key="`a-${index}`"-->
<!--        class="p-3 text-xs uppercase menu-title"-->
<!--        :class="styleStore.asideMenuLabelStyle"-->
<!--      >-->
<!--        {{ menuGroup }}-->
<!--      </p>-->
<!--      <AsideMenuList-->
<!--        v-else-->
<!--        :key="`b-${index}`"-->
<!--        :menu="menuGroup"-->
<!--        @menu-click="menuClick"-->
<!--      />-->
<!--    </template>-->
  </v-navigation-drawer>

<!--  <aside-->
<!--    v-show="!layoutStore.isFullScreen"-->
<!--    id="aside"-->
<!--    class="w-60 fixed top-0 z-40 h-screen transition-position lg:left-0 overflow-y-auto-->
<!--    dark:border-r dark:border-gray-800 dark:bg-gray-900/70 lg:dark:bg-gray-900 xl:dark:bg-gray-900/70 app-sidebar"-->
<!--    :class="[ styleStore.asideStyle, layoutStore.isAsideMobileExpanded ? 'left-0' : '-left-60', layoutStore.isAsideLgActive ? 'block' : 'lg:hidden xl:block' ]"-->
<!--  >-->
<!--    <div-->
<!--      class="flex flex-row w-full flex-1 h-14 items-center dark:bg-transparent app-sidebar-brand"-->
<!--      :class="[ styleStore.asideBrandStyle ]"-->
<!--    >-->
<!--      <NavBarItem-->
<!--        type="hidden lg:flex xl:hidden"-->
<!--        :active-color="styleStore.asideMenuCloseLgStyle"-->
<!--        active-->
<!--        @click="layoutStore.asideLgToggle(false)"-->
<!--      >-->
<!--        <BaseIcon-->
<!--          :path="mdiMenu"-->
<!--          class="cursor-pointer"-->
<!--          size="24"-->
<!--        />-->
<!--      </NavBarItem>-->
<!--      <div class="flex-1 px-3">-->
<!--        <span class="text-xl font-black">Ronin</span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div>-->

<!--    </div>-->
<!--  </aside>-->
</template>
