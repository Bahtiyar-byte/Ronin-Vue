<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useAppointments } from '@/composables/useAppointments'
import type Appointment from '@/types/appointments/Appointment'

import AppointmentInfoPanel from '@/components/appointments/AppointmentInfoPanel.vue'
import ActivityTab from '@/components/appointments/details/ActivityTab.vue'
import RelatedTab from '@/components/appointments/details/RelatedTab.vue'

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const appointmentTab = ref(null)

const tabs = [
  { icon: 'tabler-activity', title: 'Activity' },
  { icon: 'ph-link-light', title: 'Related' },
]

const appointmentData = ref<Appointment>()
const appointmentName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useAppointments().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    appointmentName.value = newVal.id
    appointmentData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return appointmentData.value !== undefined ? `${appointmentData.value.id} details` : null
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
        title: 'Appointments',
        to: { name: 'appointments' },
      },
      {
        title: appointmentName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="appointmentData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <AppointmentInfoPanel :appointment-data="appointmentData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="appointmentTab"
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
        v-model="appointmentTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <ActivityTab />
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
      Appointment with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
