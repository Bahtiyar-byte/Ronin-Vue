<script lang="ts" setup>
import visaIcon from '@images/icons/payments/visa-icon.png'

import shared1 from '@images/shared-photos/shared1.jpg'
import shared2 from '@images/shared-photos/shared2.jpg'
import shared3 from '@images/shared-photos/shared3.jpg'
import shared4 from '@images/shared-photos/shared4.jpg'
import shared5 from '@images/shared-photos/shared4.jpg'

const shared_photos: any[] = [
  shared1,
  shared2,
  shared3,
  shared4,
  shared5
]

const dateEdit = ref('')
const checkboxOne = ref('')
const currentTab = ref('item-1')

const tabItemContent
  = 'Add documents intended to be shared with the crew. Crews linked to the mobile Crew App will have access to documents within the app. If the crew is not linked, the documents will need to be shared via email.'

const isDialogVisible = ref(false)

interface Status {
  Verified: string
  Rejected: string
  Pending: string
}

interface Transition {
  cardImg: string
  lastDigit: string
  cardType: string
  sentDate: string
  status: keyof Status
  trend: string
}

const lastTransitions: Transition[] = [
  {
    cardImg: visaIcon,
    lastDigit: '*4230',
    cardType: 'Credit',
    sentDate: '17 Mar 2022',
    status: 'Verified',
    trend: '+$1,678',
  },
]

const crewAssignments: any[] = [
  {
    crewName: 'Evans Service Crew 1',
    crewContacts: 'Griffin Watts',
    contactInfo: 'griffin@evansroofingandgutters.com',
    apkLink: 'google.com',
  },
  {
    crewName: 'Evans Service Crew 2',
    crewContacts: 'Matt Gross 1',
    contactInfo: '(412) 484-6012',
    apkLink: 'google.com',
  },
]

const laborContacts: any[] = [
  {
    name: 'Griffin Watts',
    contactInfo: ['griffin@evansroofingandgutters.com', '(412) 484-6012'],
    jobs: ['Created Order'],
  },
  {
    name: 'Ray Colagrande Sr',
    contactInfo: ['griffin@evansroofingandgutters.com', '(412) 484-6012'],
    jobs: ['Main Contact', 'Primary Job Owner'],
  },
]

const laborOrder: any[] = [
  {
    laborItem: 'Material 1',
    qty: '0',
    unit: 'EA',
    unit_cost: '$0.00 / EA',
    cost: '$0.00',
  },
  {
    laborItem: 'Material 1',
    qty: '0',
    unit: 'EA',
    unit_cost: '$0.00 / EA',
    cost: '$0.00',
  },
]

// const crewInstructions: any[] = [
//   {
//     content:
//       "Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.",
//   },
//   {
//     content:
//       "Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.",
//   },
// ];

const resolveStatus: Status = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'secondary',
}

const items = [
  'Aluminum/Flashing',
  'Box Gutters',
  'Chimney Cap',
  'Downspouts',
  'Flat Roof',
]

const columnRadio = ref('radio-1')
const inlineRadio = ref('radio-1')

const getPaddingStyle = (index: number) =>
  index ? 'padding-block-end: 1.5rem;' : 'padding-block: 1.5rem;'

const checkoutSteps = [
  {
    title: '1',
    icon: 'tabler-circle',
  },
  {
    title: '2',
    icon: 'tabler-circle',
  },
  {
    title: '3',
    icon: 'tabler-circle',
  },
]

const laborTicketName = ref('')
const crewInstructions = ref('')
const currentStep = ref(0)

const clickNextStep = () => {
  currentStep.value++
}

const headers = [
  { title: 'Contract', key: 'filename' },
  { title: 'TYPE', key: 'file_type' },
  { title: 'DATE', key: 'created_at' },
  { title: 'REPRESENTATIVE', key: 'representative' },
  { title: 'Preview', key: 'preview' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

const data = [
  {
    id: 1,
    filename: 'test.pdf',
    file_type: 'pdf',
    created_at: '9/17/2024 9:48 am',
    representative: 'Griffin Watts',
  },
  {
    id: 2,
    filename: 'test2.pdf',
    file_type: 'pdf',
    created_at: '9/17/2024 9:48 am',
    representative: 'Griffin Watts',
  },
]

</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    :scrim="false"
    persistent
    :width="$vuetify.display.smAndDown ? 'auto' : 1350"
    :height="$vuetify.display.smAndDown ? 'auto' : 950"
    transition="dialog-transition"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        color="primary"
        variant="text"
      >
        <VIcon
          start
          icon="tabler-plus"
        />
        Select Documents
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard class="p-3">
      <!-- Toolbar -->
      <div>
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="isDialogVisible = false"
          >
            <VIcon
              color="white"
              icon="tabler-x"
            />
          </VBtn>

          <VToolbarTitle>Select Documents</VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="isDialogVisible = false"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>

      <VCard
        style="height: 95vh"
        class="scrollable"
      >

        <VTabs v-model="currentTab">
          <VTab>Job Documents</VTab>
          <VTab>Company Documents</VTab>
        </VTabs>

        <VCardText>
          <VWindow v-model="currentTab">
            <VWindowItem
              v-for="item in 3"
              :key="item"
              :value="`item-${item}`"
            >
              {{ tabItemContent }}


              <VDataTable
                :headers="headers"
                :items="data"
                :items-per-page="5"
                show-select
              >


                <!-- status -->
                <template #item.preview="{ item }">
                  <VChip
                    :color="'primary'"
                    class="font-weight-medium"
                    size="small"
                  >
                    Preview
                  </VChip>
                </template>
              </VDataTable>
            </VWindowItem>
          </VWindow>
          <VCardText class="d-flex justify-end flex-wrap gap-3">
            <VBtn
              variant="tonal"
              color="secondary"
              @click="isDialogVisible = false"
            >
              Cancel
            </VBtn>
            <VBtn @click="isDialogVisible = false">
              Share
            </VBtn>
          </VCardText>
        </VCardText>



      </VCard>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.scrollable {
  overflow-y: scroll !important;
}
</style>

