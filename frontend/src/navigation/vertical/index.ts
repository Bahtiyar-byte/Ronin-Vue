export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },

    // ToDo: We need some workaround to allow
    //  all users visit homepage but not only permitted to read contacts
    action: 'read',
    subject: 'contacts',
  },
  {
    title: 'Jobs',
    to: { name: 'jobs' },
    icon: { icon: 'material-symbols-task-outline' },
    action: 'read',
    subject: 'jobs',
  },
  {
    title: 'Contacts',
    to: { name: 'contacts' },
    icon: { icon: 'mdi-account-box-outline' },
    action: 'read',
    subject: 'contacts',
  },
  {
    title: 'Calendar',
    to: { name: 'calendar' },
    icon: { icon: 'tabler-calendar' },
    action: 'read',
    subject: 'invoices',
  },
  {
    title: 'Email',
    to: { name: 'email' },
    icon: { icon: 'tabler-mail' },
    action: 'read',
    subject: 'emails',
  },
  {
    title: 'Chat',
    to: { name: 'chat' },
    icon: { icon: 'tabler-message-circle-2' },
    action: 'read',
    subject: 'chats',
  },
]
