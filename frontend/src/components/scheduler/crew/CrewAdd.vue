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
  shared5,
]

const dateEdit = ref('')
const checkboxOne = ref('')
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
        Add a Crew
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

          <VToolbarTitle>Add a Crew</VToolbarTitle>

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
        <AppStepper
          v-model:current-step="currentStep"
          class="checkout-stepper"
          :items="checkoutSteps"
          icon-size="32px"
          :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
          align="center"
        />

        <VCardText v-model:current-step="currentStep">
          <VWindow
            v-model="currentStep"
            class="disable-tab-transition"
            :touch="false"
          >
            <VWindowItem>
              <div>
                <VDivider class="mb-2" />
                <VList class="card-list m-3 ml-0">
                  <VListItem>
                    <VListItemTitle>
                      <div class="d-inline-block text-body-1 mr-4 font-weight-bold">
                        Adding a crew will create a copy of this Labor Ticket and all of the information it contains.
                      </div>
                      <br>
                      <div class="d-inline-block text-body-1">
                        Each crew has their own Labor Ticket to allow for different schedules, instructions, and communications.
                      </div>
                    </VListItemTitle>
                  </VListItem>
                </VList>

                <VList class="card-list m-3 ml-0">
                  <VListItem>
                    <VListItemTitle>
                      <span class="font-medium font-weight-bold"> Verify Trade: </span>
                    </VListItemTitle>
                    <div style="display: flex">
                      <AppAutocomplete
                        label="Trade"
                        :items="items"
                        placeholder="Select Trade"
                      />
                    </div>

                    <AppTextField
                      v-model="laborTicketName"
                      class="my-2"
                      label="Labor Ticket Name"
                      placeholder="Labor Ticket Name"
                    />
                  </VListItem>

                  <VListItem>
                    <VListItemTitle>
                      <span class="font-medium font-weight-bold"> Assign a Crew </span>
                      <br>
                      <div class="d-inline-block text-body-1">
                        Crews are managed in the Labor Manager. For one-off crew
                        assignments, click "Other" and type in the crew name.
                      </div>
                    </VListItemTitle>
                    <div style="display: flex">
                      <AppAutocomplete
                        label="Crew"
                        :items="items"
                        placeholder="Select Crew"
                      />

                      <VCheckbox
                        v-model="checkboxOne"
                        label="Others"
                      />
                    </div>
                  </VListItem>

                  <VDivider class="my-4" />
                  <VListItem>
                    <VListItemTitle>
                      <span class="font-medium font-weight-bold"> Schedule Labor: </span>
                      <br>
                    </VListItemTitle>
                    <div style="display: flex">
                      <VRadioGroup
                        v-model="inlineRadio"
                        inline
                      >
                        <VRadio
                          label="Add Dates Later"
                          value="add_dates_later"
                        />
                        <VRadio
                          label="Add Start and End Dates"
                          value="add_start_and_end_dates"
                        />
                        <VRadio
                          label="Never Schedule"
                          value="never_schedule"
                        />
                      </VRadioGroup>

                      <VCheckbox
                        v-model="checkboxOne"
                        label="All Day"
                      />
                    </div>

                    <AppDateTimePicker
                      v-model="dateEdit"
                      label="Start Date"
                      placeholder="Select Date"
                    />

                    <AppDateTimePicker
                      v-model="dateEdit"
                      label="End Date"
                      placeholder="Select Date"
                    />
                  </VListItem>

                  <VDivider class="my-4" />
                  <VCardText class="d-flex justify-end flex-wrap gap-3">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      @click="isDialogVisible = false"
                    >
                      Cancel
                    </VBtn>
                    <VBtn @click="clickNextStep">
                      Next
                    </VBtn>
                  </VCardText>
                </VList>
              </div>
            </VWindowItem>

            <VWindowItem>
              <div>
                <VList class="card-list m-3 ml-0">
                  <VListItem>
                    <VListItemTitle class="mb-2">
                      <span class="font-medium font-weight-bold"> Is there cost associated with this Labor Ticket? </span>
                      <br>
                    </VListItemTitle>
                    <div style="display: flex">
                      <VRadioGroup v-model="inlineRadio">
                        <VRadio value="blank_order">
                          <template #label>
                            <div>
                              Blank Order (No Cost)
                              <br>
                              <span class="text-secondary">
                                A blank Labor Order will be created to allow for scheduling. Labor Order Items and cost can be added at a later time.
                              </span>
                            </div>
                          </template>
                        </VRadio>
                        <div class="my-2" />
                        <VRadio value="custom_item">
                          <template #label>
                            <div>
                              Add a Custom Labor Item
                              <br>
                              <span class="text-secondary">
                                Create a quick labor item with the option to include cost.
                              </span>
                            </div>
                          </template>
                        </VRadio>
                      </VRadioGroup>
                    </div>
                  </VListItem>
                  <VListItem>
                    <VListItemTitle class="mb-2">
                      <span class="font-medium font-weight-bold"> Are there any specific instructions you would like to give the crew? </span>
                      <br>
                    </VListItemTitle>
                    <div style="display: flex">
                      <AppTextarea
                        v-model="crewInstructions"
                        class="my-2"
                        label="Crew Instructions"
                        placeholder="Crew Instructions"
                      />
                    </div>
                  </VListItem>

                  <VCardText class="d-flex justify-end flex-wrap gap-3">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      @click="isDialogVisible = false"
                    >
                      Cancel
                    </VBtn>
                    <VBtn @click="clickNextStep">
                      Next
                    </VBtn>
                  </VCardText>
                </VList>
              </div>
            </VWindowItem>

            <VWindowItem>
              <div>
                <VList class="card-list m-3 ml-0">
                  <VListItem>
                    <VListItemTitle class="mb-2">
                      <span class="font-medium font-weight-bold"> Copy the following information to the NEW labor ticket: </span>
                      <br>
                    </VListItemTitle>
                    <div style="display: flex">
                      <div
                        class="px-4"
                        style="width: 150px;"
                      >
                        <VCheckbox
                          v-model="checkboxOne"
                          label="Copy"
                        />
                      </div>
                      <VExpansionPanels multiple>
                        <!-- Labor Contacts Start -->
                        <VExpansionPanel>
                          <VExpansionPanelTitle> Labor Contacts </VExpansionPanelTitle>
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
                      </VExpansionPanels>
                    </div>
                  </VListItem>

                  <VListItem>
                    <VListItemTitle class="mb-2" />
                    <div style="display: flex">
                      <div
                        class="px-4"
                        style="width: 150px;"
                      >
                        <VCheckbox
                          v-model="checkboxOne"
                          label="Copy"
                        />
                      </div>
                      <VExpansionPanels multiple>
                        <!-- Shared Photos Start -->
                        <VExpansionPanel>
                          <VExpansionPanelTitle> Shared Photos </VExpansionPanelTitle>
                          <VExpansionPanelText>
                            <VAvatar
                              v-for="(photo, index) in shared_photos"
                              :key="index"
                              rounded
                              :size="200"
                              color="primary"
                              variant="tonal"
                              class="m-4 ml-0"
                            >
                              <VImg :src="photo" />
                            </VAvatar>
                          </VExpansionPanelText>
                        </VExpansionPanel>
                        <!-- Shared Photos End -->
                      </VExpansionPanels>
                    </div>
                  </VListItem>

                  <VCardText class="d-flex justify-end flex-wrap gap-3">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      @click="isDialogVisible = false"
                    >
                      Cancel
                    </VBtn>
                    <VBtn @click="isDialogVisible = false">
                      Save
                    </VBtn>
                  </VCardText>
                </VList>
              </div>
            </VWindowItem>
          </VWindow>
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
