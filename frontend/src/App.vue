<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import { initConfigStore, useConfigStore } from '@core/stores/config'
import { hexToRgb } from '@layouts/utils'
import { useAbility } from '@/plugins/casl/composables/useAbility'
import { useCurrentUserStore } from '@core/stores/auth/currentUser'
import type { CurrentUser } from '@/types/users/User'
import type { Permission } from '@/types/roles/roles'
import { groupPermissions, permissionToAbilityRule } from '@/utils/roles'

const { user } = storeToRefs(useCurrentUserStore())

const { global } = useTheme()

const ability = useAbility()

watch(user, (currUser: CurrentUser | null) => {
  if (currUser === null) {
    return
  }

  if (currUser?.app_role_permissions.length) {
    const abilityRules = groupPermissions(
      currUser.app_role_permissions.map((permission: Permission) => permissionToAbilityRule(permission))
    )

    // Add ability to visit homepage, scheduler, etc.
    abilityRules.push({
      action: 'manage',
      subject: 'basicActions',
    })

    ability.update(abilityRules)
    useCookie('userAbilityRules').value = JSON.stringify(abilityRules)
  }
})

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()

useHead({
  titleTemplate: (title?: string) => !title ? 'Evans CRM' : `${title} | Evans CRM`,
})
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />

      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
