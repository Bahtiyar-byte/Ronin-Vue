<script lang="ts" setup>

import mastercardIcon from '@images/icons/payments/mastercard-icon.png'
import visaIcon from '@images/icons/payments/visa-icon.png'

import DatesEdit from '@/components/scheduler/dates/DatesEdit.vue'

import CrewEdit from '@/components/scheduler/crew/CrewEdit.vue'

import CrewAdd from '@/components/scheduler/crew/CrewAdd.vue'

import LaborEdit from '@/components/scheduler/labor/LaborEdit.vue'

import InstructionEdit from '@/components/scheduler/instructions/InstructionEdit.vue'

import DocumentsSelect from '@/components/scheduler/documents/DocumentsSelect.vue'

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

const currentTab = ref('item-1')

const tabItemContent
  = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'

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
  {
    cardImg: mastercardIcon,
    lastDigit: '*5578',
    cardType: 'Credit',
    sentDate: '12 Feb 2022',
    status: 'Rejected',
    trend: '-$839',
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

const crewInstructions: any[] = [
  {
    content: 'Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.',
  },
]

const resolveStatus: Status = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'secondary',
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

const getPaddingStyle = (index: number) =>
  index ? 'padding-block-end: 1.5rem;' : 'padding-block: 1.5rem;'
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    :scrim="false"
    fullscreen
    :height="$vuetify.display.smAndDown ? 'auto' : 950"
    transition="dialog-bottom-transition"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        size="30"
        icon="tabler-eye"
        variant="text"
      />
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

          <VToolbarTitle>Evan KENEPP</VToolbarTitle>

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

      
        <!-- <VCard>
        <VTabs v-model="currentTab">
        <VTab>Dates</VTab>
        <VTab>Crew Assignment</VTab>
        <VTab>Labor Contacts</VTab>
        <VTab>Labor Order</VTab>
        </VTabs>

        <VCardText>
        <VWindow v-model="currentTab">
        <VWindowItem v-for="item in 3" :key="item" :value="`item-${item}`">
        {{ tabItemContent }}
        </VWindowItem>
        </VWindow>
        </VCardText>
        </VCard> -->
     

      <!-- <VDivider /> -->

      <div style="height: 200px;">
        <VList class="card-list m-4" style="height: 1000px !important;">
          <VListItem>
            <VListItemTitle>
            <span class="font-medium" style="font-size: 2em;">
              Box Gutters Order (copy)
            </span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle>
            <span class="font-medium">
              24-1364: Ben Anderson
            </span>
              <br>
              <span class="font-medium">
              3223 Wainbell Avenue, Pittsburgh, PA 15216
            </span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle>
            <span class="font-medium">
              Trade:
            </span>
              <div class="d-inline-block text-body-1">
                Box Gutters
              </div>
            </VListItemTitle>
            <br>
            <VListItemTitle>
            <span class="font-medium">
              Trade:
            </span>
              <div class="d-inline-block text-body-1">
                Box Gutters
              </div>
            </VListItemTitle>
          </VListItem>
        </VList>
      </div>

      <div class="py-4">
        <VExpansionPanels
          multiple
          class="mt-2"
        >
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>
              <div style="width: 100vw;" class="flex flex-row justify-between">
                <div style="font-size: 1.1em; display:flex; align-items: center">
                  <span>Dates</span>
                </div>
                <DatesEdit />
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                <tr>
                  <th>START</th>
                  <th>END</th>
                </tr>
                </thead>

                <tbody>
                <tr
                  v-for="(transition, index) in lastTransitions"
                  :key="index"
                >
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ transition.sentDate }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ transition.sentDate }}</span>
                  </td>
                </tr>
                </tbody>
              </VTable>

            </VExpansionPanelText>
          </VExpansionPanel>

          <!-- Crew Assignment Start -->
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>
              <div style="width: 100vw;" class="flex flex-row justify-between">
                <div style="font-size: 1.1em; display:flex; align-items: center">
                <span>
                  Crew Assignment
                </span>
                </div>
                <CrewEdit />
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                <tr>
                  <th>CREW NAME</th>
                  <th>CREW CONTACT(S)</th>
                  <th>CONTACT INFO</th>
                  <th>APK LINK</th>
                </tr>
                </thead>

                <tbody>
                <tr
                  v-for="(assignment, index) in crewAssignments"
                  :key="index"
                >
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ assignment.crewName }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ assignment.crewContacts }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ assignment.contactInfo }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ assignment.apkLink }}</span>
                  </td>
                </tr>
                </tbody>
              </VTable>
              <CrewAdd />
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Crew Assignment End -->

          <!-- Labor Contacts Start -->
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>

              <div style="width: 100vw;" class="flex flex-row justify-between">
                <div style="font-size: 1.1em; display:flex; align-items: center">
                <span>
                  Labor Contacts
                </span>
                </div>
                <LaborEdit />
              </div>

            </VExpansionPanelTitle>

            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                <tr>
                  <th>NAME</th>
                  <th>JOB ROLE</th>
                  <th>PHONE/EMAIL</th>
                </tr>
                </thead>

                <tbody>
                <tr
                  v-for="(contact, index) in laborContacts"
                  :key="index"
                >
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ contact.name }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span
                      v-for="(job, indexJob) in contact.jobs"
                      :key="indexJob"
                      class="text-sm"
                    >
                      {{ job }}<br>
                    </span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span
                      v-for="(contact, indexContact) in contact.contactInfo"
                      :key="indexContact"
                      class="text-sm"
                    >
                      {{ contact }}<br>
                    </span>
                  </td>
                </tr>
                </tbody>
              </VTable>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Labor Contacts End -->

          <!-- Labor Order Start -->
          <VExpansionPanel class="mb-2 py-3">
            <VExpansionPanelTitle>
              <div style="font-size: 1.1em">
                Labor Order: 24-1322-1
              </div>

            </VExpansionPanelTitle>


            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                <tr>
                  <th>LABOR ITEM</th>
                  <th>QTY</th>
                  <th>UNIT</th>
                  <th>UNIT COST</th>
                  <th>COST</th>
                </tr>
                </thead>

                <tbody>
                <tr
                  v-for="(order, index) in laborOrder"
                  :key="index"
                >
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ order.laborItem }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">
                      {{ order.qty }}
                    </span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm"> {{ order.unit }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm"> {{ order.unit_cost }}</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm"> {{ order.cost }}</span>
                  </td>
                </tr>
                </tbody>
              </VTable>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Labor Order End -->

          <!-- Crew Instructions Start -->
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>
              <div style="width: 100vw;" class="flex flex-row justify-between">
                <div style="font-size: 1.1em; display:flex; align-items: center">
                <span>
                  Crew Instructions
                </span>
                </div>
                <InstructionEdit />
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                <tr>
                  <th>INSTRUCTION</th>
                </tr>
                </thead>

                <tbody>
                <tr
                  v-for="(instruction, index) in crewInstructions"
                  :key="index"
                >
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm">{{ instruction.content }}</span>
                  </td>
                </tr>
                </tbody>
              </VTable>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Crew Instructions End -->

          <!-- Crew Check In Start -->
          <VExpansionPanel class="mb-2 py-3">
            <VExpansionPanelTitle> Crew Check In </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                <tr>
                  <th>DAY/TIME</th>
                  <th>USER</th>
                  <th>ACTION</th>
                  <th>LOCATION</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm"> <strong>Start: Wed</strong> Sep 04 — 8:00 AM</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                </tr>

                <tr>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm text-red-600"> Tue Sep 24</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm text-red-600" > Not Checked In </span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                </tr>

                <tr>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm text-red-600"> Tue Sep 24</span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm text-red-600" > Not Checked In </span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                </tr>

                <tr>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm"> <strong>End: Thu</strong> Sep 05 </span>
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                  <td :style="getPaddingStyle(index)">
                    <span class="text-sm" />
                  </td>
                </tr>
                </tbody>
              </VTable>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Crew Check In  End -->

          <!-- Shared Documents Start -->
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>
              <div style="width: 100vw;" class="flex flex-row justify-between">
                <div style="font-size: 1.1em; display:flex; align-items: center">
                <span>
                  Shared Documents
                </span>
                </div>
                <DocumentsSelect />
              </div>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
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
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Shared Documents  End -->

          <!-- Shared Photos Start -->
          <VExpansionPanel>
            <VExpansionPanelTitle> Shared Photos </VExpansionPanelTitle>
            <VExpansionPanelText>
<!--              <VFileInput-->
<!--                label="Underlined"-->
<!--                variant="underlined"-->
<!--                density="default"-->
<!--              />-->

              <VBtn @click="isDialogVisible = false" color="secondary" class="m-4 ml-0" :size="200">
                Add Location View Photo
              </VBtn>

              <VAvatar
                v-for="(photo, index) in shared_photos"
                rounded
                :size="200"
                :color="'primary'"
                :variant="'tonal'"
                :key="index"
                class="m-4 ml-0"
              >
                <VImg
                  :src="photo"
                />
              </VAvatar>

            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Shared Photos  End -->

          <!-- Checklist Start -->
          <VExpansionPanel>
            <VExpansionPanelTitle> Checklist </VExpansionPanelTitle>
            <VExpansionPanelText />
          </VExpansionPanel>
          <!-- Checklist  End -->

          <!-- Disclaimer Start -->
          <VExpansionPanel>
            <VExpansionPanelTitle> Disclaimer </VExpansionPanelTitle>
            <VExpansionPanelText />
          </VExpansionPanel>
          <!-- Disclaimer  End -->
        </VExpansionPanels>
      </div>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
