import {
  mdiDesktopMac,
  mdiSquareEditOutline,
  mdiTable,
  mdiLock,
  mdiFileDocumentOutline
} from '@mdi/js'

const externalLink = () => {
  return process.env.NODE_ENV === 'production' ? window.location.origin + '/api-docs' : 'http://localhost:8080/api-docs';
}

export default [
  'General',
  [
    {
      to: '/',
      label: 'Dashboard',
      icon: mdiDesktopMac
    }
  ],
  'Entities',
  [

  {
    to: '/users',
    label: 'Users',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Users/UsersView.vue'),
},

  {
    to: '/contacts',
    label: 'Contacts',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Contacts/ContactsView.vue'),
},

  {
    to: '/appointments',
    label: 'Appointments',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Appointments/AppointmentsView.vue'),
},

  {
    to: '/jobs',
    label: 'Jobs',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Jobs/JobsView.vue'),
},

  {
    to: '/estimates',
    label: 'Estimates',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Estimates/EstimatesView.vue'),
},

  {
    to: '/trades',
    label: 'Trades',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Trades/TradesView.vue'),
},

  {
    to: '/templates',
    label: 'Templates',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Templates/TemplatesView.vue'),
},

  {
    to: '/documents',
    label: 'Documents',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Documents/DocumentsView.vue'),
},

  {
    to: '/images',
    label: 'Images',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Images/ImagesView.vue'),
},

  {
    to: '/roles',
    label: 'Roles',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Roles/RolesView.vue'),
},

  {
    to: '/teams',
    label: 'Teams',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Teams/TeamsView.vue'),
},

  {
    to: '/invoices',
    label: 'Invoices',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Invoices/InvoicesView.vue'),
},

    {
      to: '/change_password',
      label: 'Change Password',
      icon: mdiLock,
      component: () => import('@/views/ChangePasswordView.vue'),
    },
    {
      href: externalLink(),
      label: 'API docs',
      icon: mdiFileDocumentOutline,
    },
  ],
]
