<script lang="ts" setup>
import mastercardIcon from "@images/icons/payments/mastercard-icon.png";
import visaIcon from "@images/icons/payments/visa-icon.png";

const dateEdit = ref("");
const checkboxOne = ref("");
const currentTab = ref("item-1");

const tabItemContent =
  "Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.";

const isDialogVisible = ref(false);

interface Status {
  Verified: string;
  Rejected: string;
  Pending: string;
}

interface Transition {
  cardImg: string;
  lastDigit: string;
  cardType: string;
  sentDate: string;
  status: keyof Status;
  trend: string;
}

const lastTransitions: Transition[] = [
  {
    cardImg: visaIcon,
    lastDigit: "*4230",
    cardType: "Credit",
    sentDate: "17 Mar 2022",
    status: "Verified",
    trend: "+$1,678",
  },
];

const crewAssignments: any[] = [
  {
    crewName: "Evans Service Crew 1",
    crewContacts: "Griffin Watts",
    contactInfo: "griffin@evansroofingandgutters.com",
    apkLink: "google.com",
  },
  {
    crewName: "Evans Service Crew 2",
    crewContacts: "Matt Gross 1",
    contactInfo: "(412) 484-6012",
    apkLink: "google.com",
  },
];

const laborContacts: any[] = [
  {
    name: "Griffin Watts",
    contactInfo: ["griffin@evansroofingandgutters.com", "(412) 484-6012"],
    jobs: ["Created Order"],
  },
  {
    name: "Ray Colagrande Sr",
    contactInfo: ["griffin@evansroofingandgutters.com", "(412) 484-6012"],
    jobs: ["Main Contact", "Primary Job Owner"],
  },
];

const laborOrder: any[] = [
  {
    laborItem: "Material 1",
    qty: "0",
    unit: "EA",
    unit_cost: "$0.00 / EA",
    cost: "$0.00",
  },
  {
    laborItem: "Material 1",
    qty: "0",
    unit: "EA",
    unit_cost: "$0.00 / EA",
    cost: "$0.00",
  },
];

const crewInstructions: any[] = [
  {
    content:
      "Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.",
  },
  {
    content:
      "Install new metal over the hole in gutter shown in the picture that was sent to us and seal it to the box gutter. Install one new eave drop. Install new silicone tape patches on all of the damaged box gutters that were damaged by the previous roofing contractor.",
  },
];

const resolveStatus: Status = {
  Verified: "success",
  Rejected: "error",
  Pending: "secondary",
};

const items = [
  "Evans Service Crew 1",
  "Evans Service Crew 2",
  "Evans Service Crew 3",
  "Evans Service Crew 4",
];

const columnRadio = ref("radio-1");
const inlineRadio = ref("radio-1");
const radioGroup = ref(1)

const getPaddingStyle = (index: number) =>
  index ? "padding-block-end: 1.5rem;" : "padding-block: 1.5rem;";
</script>

<template>
  <VDialog v-model="isDialogVisible" :scrim="false" persistent :width="$vuetify.display.smAndDown ? 'auto' : 1350"
    :height="$vuetify.display.smAndDown ? 'auto' : 950" transition="dialog-transition">
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props" color="primary" variant="text">
        <VIcon start icon="tabler-pencil" />
        Edit
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard class="p-3">
      <!-- Toolbar -->
      <div>
        <VToolbar color="primary">
          <VBtn icon variant="plain" @click="isDialogVisible = false">
            <VIcon color="white" icon="tabler-x" />
          </VBtn>

          <VToolbarTitle>Select Labor Contacts</VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn variant="text" @click="isDialogVisible = false"> Save </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>

      <VCard style="height: 95vh" class="scrollable">
        <VCardText>
          <VDivider class="mb-2" />
          <span><b>EPDM Order</b></span>
          <VList class="card-list m-3 ml-0">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Trade: </span>
                <div class="d-inline-block text-body-1 mr-4">Box Gutters</div>

                <span class="font-medium"> PO#: </span>
                <div class="d-inline-block text-body-1">24-1364-1</div>
              </VListItemTitle>
            </VListItem>
          </VList>

          <VList class="card-list m-3 ml-0">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Select Labor Contacts: </span>
                <br />
                <div class="d-inline-block text-body-1">
                  Manage who will receive messages, notifications, and status updates.
                </div>
              </VListItemTitle>
              <div style="">

                <VTable class="no-wrap transaction-table" show-select hide-default-footer>
                  <thead>
                  <tr>
                    <th>NAME</th>
                    <th>JOB ROLE</th>
                    <th>Main Contact</th>
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
                      <VRadioGroup v-model="radioGroup">
                        <VRadio
                          :value="1"
                        />
                      </VRadioGroup>
                    </td>
                  </tr>
                  </tbody>
                </VTable>

              </div>

            </VListItem>

            <VCardText class="d-flex justify-end flex-wrap gap-3">
              <VBtn variant="tonal" color="secondary" @click="isDialogVisible = false">
                Cancel
              </VBtn>
              <VBtn @click="isDialogVisible = false">
                Save
              </VBtn>
            </VCardText>
          </VList>
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
