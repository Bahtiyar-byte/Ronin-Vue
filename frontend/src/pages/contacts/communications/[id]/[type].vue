<script setup lang="ts">
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import pdf from '@images/icons/project-icons/pdf.png'

definePage({
  meta: {
    action: 'read',
    subject: 'chats',
  },
})

const communicationTypes = {
  emails: 'tabler-mail-opened',
  chat: 'tabler-message-circle-2',
  sms: 'tabler-message',
  calls: 'tabler-phone',
}

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string; type: string } }

// ToDo: Refactor!
interface CommunicationsItem {
  type: 'emails' | 'chat' | 'calls' | 'sms'
  title: string
  message: string
  attachments?: { filename: string; extension: string }[]
  date: Date
}

const messages = computed<CommunicationsItem[]>(() => {
  return [
    {
      type: 'emails',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'emails',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'chat',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'chat',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'calls',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'calls',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'chat',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
    {
      type: 'chat',
      title: 'Jane Williams',
      message: `he process of recording the key project details and producing the
              documents that are required to implement it successfully. Simply
              put, it's an umbrella term which includes all the documents
              created over the course of the project.`,
      date: new Date(),
    },
  ].filter(msg => {
    if (route.params.type === 'general') {
      return true
    }

    return msg.type === route.params.type
  })
})

const resolveIcon = (message: CommunicationsItem): string => {
  if (message.type === 'emails') {
    return communicationTypes.emails
  } else if (message.type === 'chat') {
    return communicationTypes.chat
  } else if (message.type === 'calls') {
    return communicationTypes.calls
  } else if (message.type === 'sms') {
    return communicationTypes.sms
  }

  return ''
}
</script>

<template>
  <div>
    <PageHeader
      title="Communication"
      :breadcrumbs="[
        {
          title: 'Home',
          to: { name: 'root' },
        },
        {
          title: 'Contacts',
          to: { name: 'contacts' },
        },
        {
          title: 'Contact name',
          to: { name: 'contacts-details-id', params: { id: route.params.id } },
        },
        {
          title: 'Communications',
          disabled: true,
        },
      ]"
    />

    <VTimeline
      align="start"
      line-inset="19"
      truncate-line="start"
      justify="center"
      :density="$vuetify.display.smAndDown ? 'compact' : 'default'"
      class="mt-4"
    >
      <VTimelineItem
        v-for="(message, idx) in messages"
        :key="`timeline-item-${idx}`"
        fill-dot
        size="small"
      >
        <template #opposite>
          <span class="app-timeline-meta"> 2 month's ago </span>
        </template>
        <template #icon>
          <div class="v-timeline-avatar-wrapper rounded-circle">
            <VAvatar
              size="32"
              color="primary"
              variant="tonal"
            >
              <VIcon
                :icon="resolveIcon(message)"
                size="20"
              />
            </VAvatar>
          </div>
        </template>
        <!-- 👉 Header -->
        <VCard class="mb-10 mt-n4">
          <VCardItem class="pb-4">
            <VCardTitle>
              {{ message.title }}
            </VCardTitle>
          </VCardItem>
          <VCardText>
            <!-- 👉 Content -->
            <p class="app-timeline-text mb-3">
              {{ message.message }}
            </p>
            <div class="d-inline-flex align-items-center timeline-chip">
              <img
                :src="pdf"
                height="20"
                class="me-2"
                alt="img"
              >
              <span class="app-timeline-text font-weight-medium">
                documentation.pdf
              </span>
            </div>
          </VCardText>
        </VCard>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>

<style lang="scss">
.v-timeline-avatar-wrapper {
  background-color: rgb(var(--v-theme-surface));
}
</style>
