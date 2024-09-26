<script lang="ts" setup>
import UserBioPanel from '@/components/settings/view/UserBioPanel.vue'
import avatar1 from '@images/avatars/avatar-1.png'

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
</script>

<template>
  <VCard>
    <VCardItem>
      <!-- General profile information will be placed here -->
      <UserBioPanel :user-data="userData" />
    </VCardItem>
  </VCard>
</template>
