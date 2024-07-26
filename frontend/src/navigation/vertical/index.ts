export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
    action: 'manage',
    subject: 'basicActions',
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
  {
    title: 'Scheduler',
    to: { name: 'scheduler' },
    icon: { icon: 'tabler-calendar' },
    action: 'read',
    subject: 'chats',
  },
  {
    title: 'Crew',
    to: { name: 'crews' },
    icon: { icon: 'tabler-users ' },
    action: 'read',
    subject: 'chats',
  },
  {
    title: 'Settings',
    icon: { icon: 'tabler-settings' },

    // ToDo: Check array of permissions for nav groups
    action: 'read',
    subject: 'chats',
    children: [
      {
        title: 'Profile',
        to: 'settings-profile',
        action: 'manage',
        subject: 'basicActions',
      },
      {
        title: 'Roles',
        to: 'settings-roles',
        action: 'read',
        subject: 'roles',
      },
    ],
  },
]
