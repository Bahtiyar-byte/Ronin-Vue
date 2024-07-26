<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import UserBioPanel from '@/components/settings/view/UserBioPanel.vue'
import UserTabSecurity from '@/components/settings/view/UserTabSecurity.vue'

const route = useRoute('apps-user-view-id')

const userTab = ref(null)

const tabs = [
  { icon: 'tabler-lock', title: 'Security' },
]

// const { data: userData } = await useApi<any>(`/apps/users/${route.params.id}`)

const userData = {
  id: 1,
  fullName: 'Galasasen Slixby',
  company: 'Yotz PVT LTD',
  role: 'editor',
  username: 'gslixby0',
  country: 'El Salvador',
  contact: '(479) 232-9151',
  email: 'gslixby0@abc.net.au',
  currentPlan: 'enterprise',
  status: 'inactive',
  avatar: avatar1,
  billing: 'Manual-Credit Card',
  projectDone: 23,
  taskDone: 55,
}

if (userData) {
  const [firstName, lastName] = userData.fullName.split(' ')

  userData.firstName = firstName
  userData.lastName = lastName
}
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabSecurity />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <div v-else>
    <VAlert
      type="error"
      variant="tonal"
    >
      Invoice with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
