<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useContactEmails } from '@/composables/useContactEmails'
import type ContactEmail from '@/types/contactemails/ContactEmail'

definePage({
  meta: {
    actions: 'read',
    subject: 'templates',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const contactEmailData = ref<ContactEmail>()
const contactEmailEmail = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useContactEmails().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    contactEmailEmail.value = newVal.email
    contactEmailData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return contactEmailData.value !== undefined ? `${contactEmailData.value.email} details` : null
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
        title: 'Contact Emails',
        to: { name: 'contactemails' },
      },
      {
        title: contactEmailEmail,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="contactEmailData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <ContactEmailInfoPanel :contact-email-data="contactEmailData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    />
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Contact Email with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
