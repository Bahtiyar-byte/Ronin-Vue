<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useAddress } from '@/composables/useAddress'
import type Address from '@/types/address/Address'

import AddressInfoPanel from '@/components/address/AddressInfoPanel.vue'

definePage({
  meta: {
    actions: 'read',
    subject: 'address',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const addressData = ref<Address>()
const addressName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useAddress().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    addressName.value = newVal.street
    addressData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return addressData.value !== undefined ? `${addressData.value.street} details` : null
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
        title: 'Addresses',
        to: { name: 'addresses' },
      },
      {
        title: addressName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="addressData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <AddressInfoPanel :address-data="addressData" />
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
      Address with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
