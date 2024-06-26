import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Tables from '@/views/TablesView.vue'
import decode from 'jwt-decode';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = decode(token);
  if (!data) return;
  return date < data.exp;
}

const routes = [

  {
    meta: {
      title: 'Dashboard',
    },
    path: '/',
    name: 'Dashboard',
    component: Home
  },

    {
      meta: {
        title: 'Users'
      },
      path: '/users',
      name: 'Users',
      component: () => import('@/views/CRUD/Users/UsersView.vue'),
    },
    {
      meta: {
        title: 'New Users'
      },
      path: '/users/new',
      name: 'NewUsers',
      component: () => import('@/views/CRUD/Users/UsersNew.vue'),
    },
    {
      meta: {
        title: 'Edit Users'
      },
      path: '/users/:id/edit',
      name: 'EditUsers',
      component: () => import('@/views/CRUD/Users/UsersEdit.vue'),
    },

    {
      meta: {
        title: 'Contacts'
      },
      path: '/contacts',
      name: 'Contacts',
      component: () => import('@/views/CRUD/Contacts/ContactsView.vue'),
    },
    {
      meta: {
        title: 'New Contacts'
      },
      path: '/contacts/new',
      name: 'NewContacts',
      component: () => import('@/views/CRUD/Contacts/ContactsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Contacts'
      },
      path: '/contacts/:id/edit',
      name: 'EditContacts',
      component: () => import('@/views/CRUD/Contacts/ContactsEdit.vue'),
    },

    {
      meta: {
        title: 'Addresses'
      },
      path: '/addresses',
      name: 'Addresses',
      component: () => import('@/views/CRUD/Addresses/AddressesView.vue'),
    },
    {
      meta: {
        title: 'New Addresses'
      },
      path: '/addresses/new',
      name: 'NewAddresses',
      component: () => import('@/views/CRUD/Addresses/AddressesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Addresses'
      },
      path: '/addresses/:id/edit',
      name: 'EditAddresses',
      component: () => import('@/views/CRUD/Addresses/AddressesEdit.vue'),
    },

    {
      meta: {
        title: 'Estimates'
      },
      path: '/estimates',
      name: 'Estimates',
      component: () => import('@/views/CRUD/Estimates/EstimatesView.vue'),
    },
    {
      meta: {
        title: 'New Estimates'
      },
      path: '/estimates/new',
      name: 'NewEstimates',
      component: () => import('@/views/CRUD/Estimates/EstimatesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Estimates'
      },
      path: '/estimates/:id/edit',
      name: 'EditEstimates',
      component: () => import('@/views/CRUD/Estimates/EstimatesEdit.vue'),
    },

    {
      meta: {
        title: 'Jobs'
      },
      path: '/jobs',
      name: 'Jobs',
      component: () => import('@/views/CRUD/Jobs/JobsView.vue'),
    },
    {
      meta: {
        title: 'New Jobs'
      },
      path: '/jobs/new',
      name: 'NewJobs',
      component: () => import('@/views/CRUD/Jobs/JobsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Jobs'
      },
      path: '/jobs/:id/edit',
      name: 'EditJobs',
      component: () => import('@/views/CRUD/Jobs/JobsEdit.vue'),
    },

    {
      meta: {
        title: 'Roles'
      },
      path: '/roles',
      name: 'Roles',
      component: () => import('@/views/CRUD/Roles/RolesView.vue'),
    },
    {
      meta: {
        title: 'New Roles'
      },
      path: '/roles/new',
      name: 'NewRoles',
      component: () => import('@/views/CRUD/Roles/RolesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Roles'
      },
      path: '/roles/:id/edit',
      name: 'EditRoles',
      component: () => import('@/views/CRUD/Roles/RolesEdit.vue'),
    },

    {
      meta: {
        title: 'Permissions'
      },
      path: '/permissions',
      name: 'Permissions',
      component: () => import('@/views/CRUD/Permissions/PermissionsView.vue'),
    },
    {
      meta: {
        title: 'New Permissions'
      },
      path: '/permissions/new',
      name: 'NewPermissions',
      component: () => import('@/views/CRUD/Permissions/PermissionsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Permissions'
      },
      path: '/permissions/:id/edit',
      name: 'EditPermissions',
      component: () => import('@/views/CRUD/Permissions/PermissionsEdit.vue'),
    },

    {
      meta: {
        title: 'Templates'
      },
      path: '/templates',
      name: 'Templates',
      component: () => import('@/views/CRUD/Templates/TemplatesView.vue'),
    },
    {
      meta: {
        title: 'New Templates'
      },
      path: '/templates/new',
      name: 'NewTemplates',
      component: () => import('@/views/CRUD/Templates/TemplatesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Templates'
      },
      path: '/templates/:id/edit',
      name: 'EditTemplates',
      component: () => import('@/views/CRUD/Templates/TemplatesEdit.vue'),
    },

    {
      meta: {
        title: 'Trades'
      },
      path: '/trades',
      name: 'Trades',
      component: () => import('@/views/CRUD/Trades/TradesView.vue'),
    },
    {
      meta: {
        title: 'New Trades'
      },
      path: '/trades/new',
      name: 'NewTrades',
      component: () => import('@/views/CRUD/Trades/TradesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Trades'
      },
      path: '/trades/:id/edit',
      name: 'EditTrades',
      component: () => import('@/views/CRUD/Trades/TradesEdit.vue'),
    },

    {
      meta: {
        title: 'Invoices'
      },
      path: '/invoices',
      name: 'Invoices',
      component: () => import('@/views/CRUD/Invoices/InvoicesView.vue'),
    },
    {
      meta: {
        title: 'New Invoices'
      },
      path: '/invoices/new',
      name: 'NewInvoices',
      component: () => import('@/views/CRUD/Invoices/InvoicesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Invoices'
      },
      path: '/invoices/:id/edit',
      name: 'EditInvoices',
      component: () => import('@/views/CRUD/Invoices/InvoicesEdit.vue'),
    },

    {
      meta: {
        title: 'Orders'
      },
      path: '/orders',
      name: 'Orders',
      component: () => import('@/views/CRUD/Orders/OrdersView.vue'),
    },
    {
      meta: {
        title: 'New Orders'
      },
      path: '/orders/new',
      name: 'NewOrders',
      component: () => import('@/views/CRUD/Orders/OrdersNew.vue'),
    },
    {
      meta: {
        title: 'Edit Orders'
      },
      path: '/orders/:id/edit',
      name: 'EditOrders',
      component: () => import('@/views/CRUD/Orders/OrdersEdit.vue'),
    },

    {
      meta: {
        title: 'Images'
      },
      path: '/images',
      name: 'Images',
      component: () => import('@/views/CRUD/Images/ImagesView.vue'),
    },
    {
      meta: {
        title: 'New Images'
      },
      path: '/images/new',
      name: 'NewImages',
      component: () => import('@/views/CRUD/Images/ImagesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Images'
      },
      path: '/images/:id/edit',
      name: 'EditImages',
      component: () => import('@/views/CRUD/Images/ImagesEdit.vue'),
    },

    {
      meta: {
        title: 'Documents'
      },
      path: '/documents',
      name: 'Documents',
      component: () => import('@/views/CRUD/Documents/DocumentsView.vue'),
    },
    {
      meta: {
        title: 'New Documents'
      },
      path: '/documents/new',
      name: 'NewDocuments',
      component: () => import('@/views/CRUD/Documents/DocumentsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Documents'
      },
      path: '/documents/:id/edit',
      name: 'EditDocuments',
      component: () => import('@/views/CRUD/Documents/DocumentsEdit.vue'),
    },

    {
      meta: {
        title: 'Emails'
      },
      path: '/emails',
      name: 'Emails',
      component: () => import('@/views/CRUD/Emails/EmailsView.vue'),
    },
    {
      meta: {
        title: 'New Emails'
      },
      path: '/emails/new',
      name: 'NewEmails',
      component: () => import('@/views/CRUD/Emails/EmailsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Emails'
      },
      path: '/emails/:id/edit',
      name: 'EditEmails',
      component: () => import('@/views/CRUD/Emails/EmailsEdit.vue'),
    },

    {
      meta: {
        title: 'Chats'
      },
      path: '/chats',
      name: 'Chats',
      component: () => import('@/views/CRUD/Chats/ChatsView.vue'),
    },
    {
      meta: {
        title: 'New Chats'
      },
      path: '/chats/new',
      name: 'NewChats',
      component: () => import('@/views/CRUD/Chats/ChatsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Chats'
      },
      path: '/chats/:id/edit',
      name: 'EditChats',
      component: () => import('@/views/CRUD/Chats/ChatsEdit.vue'),
    },

    {
      meta: {
        title: 'Appointments'
      },
      path: '/appointments',
      name: 'Appointments',
      component: () => import('@/views/CRUD/Appointments/AppointmentsView.vue'),
    },
    {
      meta: {
        title: 'New Appointments'
      },
      path: '/appointments/new',
      name: 'NewAppointments',
      component: () => import('@/views/CRUD/Appointments/AppointmentsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Appointments'
      },
      path: '/appointments/:id/edit',
      name: 'EditAppointments',
      component: () => import('@/views/CRUD/Appointments/AppointmentsEdit.vue'),
    },

    {
      meta: {
        title: 'Tasks'
      },
      path: '/tasks',
      name: 'Tasks',
      component: () => import('@/views/CRUD/Tasks/TasksView.vue'),
    },
    {
      meta: {
        title: 'New Tasks'
      },
      path: '/tasks/new',
      name: 'NewTasks',
      component: () => import('@/views/CRUD/Tasks/TasksNew.vue'),
    },
    {
      meta: {
        title: 'Edit Tasks'
      },
      path: '/tasks/:id/edit',
      name: 'EditTasks',
      component: () => import('@/views/CRUD/Tasks/TasksEdit.vue'),
    },

    {
      meta: {
        title: 'Contracts'
      },
      path: '/contracts',
      name: 'Contracts',
      component: () => import('@/views/CRUD/Contracts/ContractsView.vue'),
    },
    {
      meta: {
        title: 'New Contracts'
      },
      path: '/contracts/new',
      name: 'NewContracts',
      component: () => import('@/views/CRUD/Contracts/ContractsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Contracts'
      },
      path: '/contracts/:id/edit',
      name: 'EditContracts',
      component: () => import('@/views/CRUD/Contracts/ContractsEdit.vue'),
    },

    {
      meta: {
        title: 'Amendments'
      },
      path: '/amendments',
      name: 'Amendments',
      component: () => import('@/views/CRUD/Amendments/AmendmentsView.vue'),
    },
    {
      meta: {
        title: 'New Amendments'
      },
      path: '/amendments/new',
      name: 'NewAmendments',
      component: () => import('@/views/CRUD/Amendments/AmendmentsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Amendments'
      },
      path: '/amendments/:id/edit',
      name: 'EditAmendments',
      component: () => import('@/views/CRUD/Amendments/AmendmentsEdit.vue'),
    },

    {
      meta: {
        title: 'Milestones'
      },
      path: '/milestones',
      name: 'Milestones',
      component: () => import('@/views/CRUD/Milestones/MilestonesView.vue'),
    },
    {
      meta: {
        title: 'New Milestones'
      },
      path: '/milestones/new',
      name: 'NewMilestones',
      component: () => import('@/views/CRUD/Milestones/MilestonesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Milestones'
      },
      path: '/milestones/:id/edit',
      name: 'EditMilestones',
      component: () => import('@/views/CRUD/Milestones/MilestonesEdit.vue'),
    },

  {
    meta: {
      title: 'Change Password'
    },
    path: '/change_password',
    name: 'Change Password',
    component: () => import('@/views/ChangePasswordView.vue'),
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
    {
      meta: {
        title: 'Register',
        fullScreen: true
      },
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      meta: {
        title: 'Verify',
        fullScreen: true
      },
      path: '/verify-email',
      name: 'Verify',
      component: () => import('@/views/VerifyEmailView.vue')
    },
    {
      meta: {
        title: 'Forgot',
        fullScreen: true
      },
      path: '/forgot',
      name: 'Forgot',
      component: () => import('@/views/ForgotPasswordView.vue')
    },
    {
      meta: {
        title: 'Reset',
        fullScreen: true
      },
      path: '/password-reset',
      name: 'Reset',
      component: () => import('@/views/ResetPasswordView.vue')
    },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
    {
      meta: {
        title: 'Starter',
        fullScreen: true
      },
      path: '/starter',
      name: 'Starter',
      component: () => import('@/views/StarterView.vue')
    },
    {
        meta: {
          title: 'Profile',
        },
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue')
      }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(async (to, from) => {
  if (
    !isAuthenticated() && !['Login', 'Register', 'Verify', 'Reset', 'Forgot', 'Starter'].includes(to.name)
  ) {
    return { name: 'Starter' }
  }
})

export default router
