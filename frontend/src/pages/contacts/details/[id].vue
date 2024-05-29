<script setup lang="ts">
// import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue'
// import UserTabAccount from '@/views/apps/user/view/UserTabAccount.vue'
// import UserTabBillingsPlans from '@/views/apps/user/view/UserTabBillingsPlans.vue'
// import UserTabConnections from '@/views/apps/user/view/UserTabConnections.vue'
// import UserTabNotifications from '@/views/apps/user/view/UserTabNotifications.vue'
// import UserTabSecurity from '@/views/apps/user/view/UserTabSecurity.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useContacts } from '@/composables/useContacts'
import type Contact from '@/types/contacts/Contact'

const route = useRoute()

const userTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const contactData = ref<Contact>()
const contactName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useContacts().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    contactName.value = newVal.name
    contactData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

// if (contactData.value) {
//   const [firstName, lastName] = contactData.value.fullName.split(' ')
//
//   contactData.value.firstName = firstName
//   contactData.value.lastName = lastName
// }
</script>

<template>
  <VBreadcrumbs
    :items="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Contacts',
        to: { name: 'contacts' },
      },
      {
        title: contactName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="contactData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
<!--      <UserBioPanel :user-data="contactData" />-->
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
<!--          <UserTabAccount />-->
        </VWindowItem>

        <VWindowItem>
<!--          <UserTabSecurity />-->
        </VWindowItem>

        <VWindowItem>
<!--          <UserTabBillingsPlans />-->
        </VWindowItem>

        <VWindowItem>
<!--          <UserTabNotifications />-->
        </VWindowItem>

        <VWindowItem>
<!--          <UserTabConnections />-->
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Contact with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
