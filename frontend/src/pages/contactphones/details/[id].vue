<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useContactPhones } from '@/composables/useContactPhones'
import type ContactPhone from '@/types/contactphones/ContactPhone'

definePage({
  meta: {
    actions: 'read',
    subject: 'templates',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const contactPhoneData = ref<ContactPhone>()
const contactPhoneNumber = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useContactPhones().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    contactPhoneNumber.value = newVal.phone_number
    contactPhoneData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return contactPhoneData.value !== undefined ? `${contactPhoneData.value.phone_number} details` : null
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
        title: contactPhoneNumber,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="contactPhoneData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <ContactPhoneInfoPanel :contact-phone-data="contactPhoneData" />
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
      Contact Phone with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
