<script lang="ts" setup>
import { useChatStore } from '@/views/apps/chat/useChatStore'
import type { ChatOut } from '@db/apps/chat/types'

const store = useChatStore()

interface MessageGroup {
  senderId: ChatOut['messages'][number]['senderId']
  messages: Omit<ChatOut['messages'][number], 'senderId'>[]
}

const contact = computed(() => ({
  id: store.activeChat?.contact.id,
  avatar: store.activeChat?.contact.avatar,
}))

// Feedback icon
const resolveFeedbackIcon = (feedback: ChatOut['messages'][number]['feedback']) => {
  if (feedback.isSeen)
  { return { icon: 'tabler-checks', color: 'success' } }
  else if (feedback.isDelivered)
  { return { icon: 'tabler-checks', color: undefined } }
  else
  { return { icon: 'tabler-check', color: undefined } }
}

// const msgGroups = computed(() => {
//   let messages: ChatOut['messages'] = []

//   const _msgGroups: MessageGroup[] = []

//   if (store.activeChat!.chat) {
//     messages = store.activeChat!.chat.messages

//     let msgSenderId = messages[0].senderId

//     let msgGroup: MessageGroup = {
//       senderId: msgSenderId,
//       messages: [],
//     }

//     messages.forEach((msg, index) => {
//       if (msgSenderId === msg.senderId) {
//         msgGroup.messages.push({
//           message: msg.message,
//           time: msg.time,
//           feedback: msg.feedback,
//         })
//       }
//       else {
//         msgSenderId = msg.senderId
//         _msgGroups.push(msgGroup)
//         msgGroup = {
//           senderId: msg.senderId,
//           messages: [
//             {
//               message: msg.message,
//               time: msg.time,
//               feedback: msg.feedback,
//             },
//           ],
//         }
//       }

//       if (index === messages.length - 1)
//         _msgGroups.push(msgGroup)
//     })
//   }

//   return _msgGroups
// })

const msgGroups = {
  chat: {
    id: 1,
    userId: 2,
    unseenMsgs: 0,
    messages: [
      {
        message: 'Hi',
        time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true,
        },
      },
      {
        message: 'Hello. How can I help You?',
        time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
        senderId: 2,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true,
        },
      },
      {
        message: 'Can I get details of my last transaction I made last month? 🤔',
        time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true,
        },
      },
      {
        message: 'We need to check if we can provide you such information.',
        time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
        senderId: 2,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true,
        },
      },
      {
        message: 'I will inform you as I get update on this.',
        time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
        senderId: 2,
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true,
        },
      },
      {
        message: 'If it takes long you can mail me at my mail address.',
        time: 'Wed Jul 17 2024 00:29:56 GMT+0500 (Turkmenistan Standard Time)',
        senderId: 11,
        feedback: {
          isSent: true,
          isDelivered: false,
          isSeen: false,
        },
      },
    ],
  },
  contact: {
    id: 2,
    fullName: 'Harriet McBride',
    role: 'UI/UX Designer',
    about: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
    avatar: '/src/assets/images/avatars/avatar-2.png',
    status: 'busy',
  },
}
</script>

<template>
  <div class="chat-log pa-6">
    <div
      v-for="(msgGrp, index) in msgGroups"
      :key="msgGrp.senderId + String(index)"
      class="chat-group d-flex align-start"
      :class="[{
        'flex-row-reverse': msgGrp.senderId !== contact.id,
        'mb-6': msgGroups.length - 1 !== index,
      }]"
    >
      <div
        class="chat-avatar"
        :class="msgGrp.senderId !== contact.id ? 'ms-4' : 'me-4'"
      >
        <VAvatar size="32">
          <VImg :src="msgGrp.senderId === contact.id ? contact.avatar : store.profileUser?.avatar" />
        </VAvatar>
      </div>
      <div
        class="chat-body d-inline-flex flex-column"
        :class="msgGrp.senderId !== contact.id ? 'align-end' : 'align-start'"
      >
        <div
          v-for="(msgData, msgIndex) in msgGrp.messages"
          :key="msgData.time"
          class="chat-content py-2 px-4 elevation-2"
          style="background-color: rgb(var(--v-theme-surface));"
          :class="[
            msgGrp.senderId === contact.id ? 'chat-left' : 'bg-primary text-white chat-right',
            msgGrp.messages.length - 1 !== msgIndex ? 'mb-2' : 'mb-1',
          ]"
        >
          <p class="mb-0 text-base">
            {{ msgData.message }}
          </p>
        </div>
        <div :class="{ 'text-right': msgGrp.senderId !== contact.id }">
          <VIcon
            v-if="msgGrp.senderId !== contact.id"
            size="16"
          >
            <!-- {{ resolveFeedbackIcon(msgGrp.messages[msgGrp.messages.length - 1].feedback).icon }} -->
          </VIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=scss>
.chat-log {
  .chat-body {
    max-inline-size: calc(100% - 6.75rem);

    .chat-content {
      border-end-end-radius: 6px;
      border-end-start-radius: 6px;

      p {
        overflow-wrap: anywhere;
      }

      &.chat-left {
        border-start-end-radius: 6px;
      }

      &.chat-right {
        border-start-start-radius: 6px;
      }
    }
  }
}
</style>
