<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useRoles } from '@/composables/useRoles'
import type Role from '@/types/roles/Role'

import RoleInfoPanel from '@/components/roles/RoleInfoPanel.vue'

definePage({
  meta: {
    action: 'read',
    subject: 'roles',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const roleTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const roleData = ref<Role>()
const roleName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useRoles().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    roleName.value = newVal.name
    roleData.value = newVal
  })

  watch(isFetching, newVal => {
    // console.lof('newVal ',newVal)
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return roleData.value !== undefined ? `${roleData.value.name} details` : null
  }),
})
</script>

<template>
  <VBreadcrumbs
    :items="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Roles',
        to: { name: 'settings-roles' },
      },
      {
        title: roleName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="roleData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <RoleInfoPanel :role-data="roleData" />
    </VCol>
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Role with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
