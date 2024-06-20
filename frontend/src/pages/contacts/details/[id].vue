<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useContacts } from '@/composables/useContacts'
import type Contact from '@/types/contacts/Contact'

import ContactInfoPanel from '@/components/contacts/ContactInfoPanel.vue'
import ActivityTab from '@/components/contacts/details/ActivityTab.vue'
import RelatedTab from '@/components/contacts/details/RelatedTab.vue'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const contactTab = ref(null)

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

useHead({
  title: computed(() => {
    return contactData.value !== undefined ? `${contactData.value.name} details` : null
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
      <ContactInfoPanel :contact-data="contactData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="contactTab"
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
        v-model="contactTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <ActivityTab :id = "route.params.id" />
        </VWindowItem>

        <VWindowItem>
          <RelatedTab />
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
