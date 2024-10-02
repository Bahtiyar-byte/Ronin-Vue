<script lang="ts" setup>
import DatesEdit from '@/components/scheduler/dates/DatesEdit.vue'

import visaIcon from '@images/icons/payments/visa-icon.png'

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

const crewInstructions: any[] = [
  {
    content:
      'Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.',
  },
  {
    content:
      'Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.',
  },
]

const resolveStatus: Status = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'secondary',
}

const getPaddingStyle = (index: number) =>
  index ? 'padding-block-end: 1.5rem;' : 'padding-block: 1.5rem;'
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    :scrim="false"
    :width="$vuetify.display.smAndDown ? 'auto' : 1350"
    :height="1950"
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

      <VCard style="height: 95vh;">
        <VTabs v-model="currentTab">
          <VTab>General</VTab>
          <VTab>Dates</VTab>
          <VTab>Crew Assignment</VTab>
          <VTab>Labor Contacts</VTab>
          <VTab>Labor Order</VTab>
          <VTab>Crew Instructions</VTab>
          <VTab>Crew Check In</VTab>
          <VTab>Shared Documents</VTab>
          <VTab>Shared Photos</VTab>
          <VTab>Checklist</VTab>
          <VTab>Disclaimer</VTab>
        </VTabs>

        <VCardText>
          <VDivider class="mb-2" />
          <VWindow v-model="currentTab">
            <VWindowItem value="item-1">
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <div>
                  <VBtn
                    color="primary"
                    variant="tonal"
                    class="mr-2"
                  >
                    24-1364: Ben Anderson
                  </VBtn>
                  <VList class="card-list m-3 ml-0">
                    <VListItem>
                      <VListItemTitle>
                        <span
                          class="font-medium"
                          style="font-size: 2em"
                        >
                          Box Gutters Order (copy)
                        </span>
                      </VListItemTitle>
                    </VListItem>

                    <VListItem>
                      <VListItemTitle>
                        <span class="font-medium"> 24-1364: Ben Anderson </span>
                        <br>
                        <span class="font-medium">
                          3223 Wainbell Avenue, Pittsburgh, PA 15216
                        </span>
                      </VListItemTitle>
                    </VListItem>

                    <VListItem>
                      <VListItemTitle>
                        <span class="font-medium"> Trade: </span>
                        <div class="d-inline-block text-body-1">
                          Box Gutters
                        </div>

                        <span class="font-medium"> PO#: </span>
                        <div class="d-inline-block text-body-1">
                          24-1364-1
                        </div>
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </div>

                <div>
                  <VBtn
                    color="primary"
                    variant="tonal"
                    class="mr-2"
                  >
                    <VIcon
                      start
                      icon="tabler-file"
                    />
                    Production Overview
                  </VBtn>
                  <VList class="card-list m-3 ml-0">
                    <VListItem>
                      <VBtn
                        color="primary"
                        variant="outlined"
                        class="mr-2"
                      >
                        <VIcon
                          start
                          icon="tabler-files"
                        />
                        Copy Ticket
                      </VBtn>

                      <VBtn
                        color="primary"
                        variant="outlined"
                      >
                        <VIcon
                          start
                          icon="tabler-mail"
                        />
                        Email / Print / PDF
                      </VBtn>
                    </VListItem>
                  </VList>
                </div>
              </div>
            </VWindowItem>

            <VWindowItem value="item-2">
              <DatesEdit />
              <VTable class="text-no-wrap transaction-table">
                <thead>
                  <tr>
                    <th>START</th>
                    <th>END</th>
                    <th>Labor Process</th>
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
                    <td>
                      Completed
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VWindowItem>

            <VWindowItem value="item-3">
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
            </VWindowItem>

            <VWindowItem value="item-4">
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
            </VWindowItem>

            <VWindowItem value="item-5">
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
            </VWindowItem>

            <VWindowItem value="item-6">
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
            </VWindowItem>

            <VWindowItem value="item-7">
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
                      <span class="text-sm">
                        <strong>Start: Wed</strong> Sep 04 — 8:00 AM</span>
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
                      <span class="text-sm">
                        <strong>End: Thu</strong> Sep 05
                      </span>
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
            </VWindowItem>

            <VWindowItem value="item-8">
              8
            </VWindowItem>

            <VWindowItem value="item-9">
              9
            </VWindowItem>

            <VWindowItem value="item-10">
              10
            </VWindowItem>

            <VWindowItem value="item-11">
              11
            </VWindowItem>

            <VWindowItem value="item-12">
              12
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
</style>
