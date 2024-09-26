import type { ActiveChat } from './useChat'
import type {
  ChatContact,
  ChatContactWithChat,
  ChatMessage,
  ChatOut,
} from '@db/apps/chat/types'

interface State {
  chatsContacts: ChatContactWithChat[]
  contacts: ChatContact[]
  profileUser: ChatContact | undefined
  activeChat: ActiveChat
}

export const useChatStore = defineStore('chat', {
  // ℹ️ arrow function recommended for full type inference
  state: (): State => ({
    contacts: [],
    chatsContacts: [],
    profileUser: undefined,
    activeChat: {
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
            message:
              'Can I get details of my last transaction I made last month? 🤔',
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
        about:
          'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
        avatar: '/src/assets/images/avatars/avatar-2.png',
        status: 'busy',
      },
    },
  }),
  actions: {
    async fetchChatsAndContacts(q: string) {
      const { data, error } = await useApi<any>(
        createUrl('/apps/chat/chats-and-contacts', {
          query: {
            q,
          },
        }),
      )

      if (error.value) {
        // console.log(error.value);
      } else {
        const { chatsContacts, contacts, profileUser } = data.value

        this.chatsContacts = chatsContacts
        this.contacts = contacts
        this.profileUser = profileUser
      }
    },

    async getChat(userId: ChatContact['id']) {
      const res = await $api(`/apps/chat/chats/${userId}`)

      this.activeChat = res
    },

    async sendMsg(message: ChatMessage['message']) {
      const senderId = this.profileUser?.id

      const response = await $api(
        `apps/chat/chats/${this.activeChat?.contact.id}`,
        {
          method: 'POST',
          body: { message, senderId },
        },
      )

      const { msg, chat }: { msg: ChatMessage; chat: ChatOut } = response

      // ? If it's not undefined => New chat is created (Contact is not in list of chats)
      if (chat !== undefined) {
        const activeChat = this.activeChat!

        this.chatsContacts.push({
          ...activeChat.contact,
          chat: {
            id: chat.id,
            lastMessage: [],
            unseenMsgs: 0,
            messages: [msg],
          },
        })

        if (this.activeChat) {
          this.activeChat.chat = {
            id: chat.id,
            messages: [msg],
            unseenMsgs: 0,
            userId: this.activeChat?.contact.id,
          }
        }
      } else {
        this.activeChat?.chat?.messages.push(msg)
      }

      // Set Last Message for active contact
      const contact = this.chatsContacts.find(c => {
        if (this.activeChat)
        { return c.id === this.activeChat.contact.id }

        return false
      }) as ChatContactWithChat

      contact.chat.lastMessage = msg
    },
  },
})
