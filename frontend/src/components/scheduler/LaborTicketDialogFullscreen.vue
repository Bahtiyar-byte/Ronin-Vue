<script lang="ts" setup>
import moment from 'moment'
import DatesEdit from '@/components/scheduler/dates/DatesEdit.vue'

import CrewEdit from '@/components/scheduler/crew/CrewEdit.vue'

import CrewAdd from '@/components/scheduler/crew/CrewAdd.vue'

import LaborEdit from '@/components/scheduler/labor/LaborEdit.vue'

import InstructionEdit from '@/components/scheduler/instructions/InstructionEdit.vue'

import DocumentsSelect from '@/components/scheduler/documents/DocumentsSelect.vue'

import AddPhotos from '@/components/scheduler/shared-photos/AddPhotos.vue'

const props = defineProps<Props>()

const uploadsUrl = import.meta.env.VITE_API_BASE_UR_FILES

interface Props {
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
  daysOfScheduler: number
  color: string
  crew: {}
}

const contactName = ref('')
const estimateId = ref('')
const { getById } = useContacts()
const { getById: getEstimateByid } = useEstimates()
const { getById: getTicketsById } = useLaborTickets()

const contactMailingAddress = ref({ id: '', suite_apt_unit: '', street: '', city: '', state: '', country: '', zip: '' })

const getContactData = async (contactId: string) => {
  const { data: contactData } = await getById(contactId)

  watch(contactData, newVal => {
    contactMailingAddress.value = newVal.address_related_contact.find(address => address.is_mailing_address)
  })
}

const trades = ref('')

const getEstimateData = async (currentEstimateId: string) => {
  const { data: estimateData } = await getEstimateByid(currentEstimateId)

  watch(estimateData, newVal => {
    trades.value = newVal.estimate_sections_related_estimate?.map(section => section.name).join(', ')
  })
}

const crewLabor = ref([])

onMounted(async () => {
  crewLabor.value = props.crew.users
  if (props.ticket.related_order?.related_estimate?.related_contact) {
    const contact = props.ticket.related_order?.related_estimate?.related_contact

    estimateId.value = props.ticket.related_order?.related_estimate?.id
    contactName.value = `${contact.fi} ${contact.la}`

    getContactData(contact.id)
    getTicketData()
  }
})

const ticketData = ref({})

const getTicketData = async () => {
  const { data } = await getTicketsById(props.ticket.id)

  watch(data, newVal => {
    ticketData.value = newVal
  })
}

watch(estimateId, newVal => {
  getEstimateData(newVal)
})

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

const headers = [
  { title: 'Contract', key: 'filename' },
  { title: 'TYPE', key: 'file_type' },
  { title: 'DATE', key: 'created_at' },
  { title: 'REPRESENTATIVE', key: 'representative' },
  { title: 'Preview', key: 'preview' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
  { return { color: 'primary', text: 'Current' } }
  else if (status === 2)
  { return { color: 'success', text: 'Professional' } }
  else if (status === 3)
  { return { color: 'error', text: 'Rejected' } }
  else if (status === 4)
  { return { color: 'warning', text: 'Resigned' } }
  else
  { return { color: 'info', text: 'Applied' } }
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

const formattedDate = (date: string) => {
  return moment(date).format(' MMM D')
}

const formattedDay = (date: string) => {
  return moment(date).format('ddd')
}
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
      <!--      <SelectPhotos /> -->
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

          <VToolbarTitle> {{ contactName }} </VToolbarTitle>

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

      <!--
        <VCard>
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
        </VCard>
      -->

      <!-- <VDivider /> -->

      <div style="height: 200px;">
        <VList
          class="card-list m-4"
          style="height: 1000px !important;"
        >
          <VListItem>
            <VListItemTitle>
              <span
                class="font-medium"
                style="font-size: 2em;"
              >
                {{ props.ticket.related_order?.order_name }}
              </span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle>
              <span class="font-medium">
                {{ props.ticket.related_order?.order_po_number }}
              </span>
              <br>
              <span class="font-medium">
                {{ `${contactMailingAddress?.suite_apt_unit ?? ''} ${contactMailingAddress?.street ?? ''}, ${contactMailingAddress?.city ?? ''}, ${contactMailingAddress?.state ?? ''} ${contactMailingAddress?.zip ?? ''}` }}
              </span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle>
              <span class="font-medium">
                Trade:
              </span>
              <div class="d-inline-block text-body-1">
                {{ trades }}
              </div>
            </VListItemTitle>
            <br>
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
              <div
                style="width: 100vw"
                class="flex flex-row justify-between"
              >
                <div style="font-size: 1.1em; display:flex; align-items: center">
                  <span>Dates</span>
                </div>
                <DatesEdit :ticket="props.ticket" />
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
                  <tr>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ props.ticket.start_date }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ props.ticket.end_date }}</span>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VExpansionPanelText>
          </VExpansionPanel>

          <!-- Crew Assignment Start -->
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>
              <div
                style="width: 100vw;"
                class="flex flex-row justify-between"
              >
                <div style="font-size: 1.1em; display:flex; align-items: center">
                  <span>
                    Crew Assignment
                  </span>
                </div>
                <CrewEdit :ticket="props.ticket" />
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
                    v-for="(user, index) in crew?.users"
                    :key="index"
                  >
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ crew.name }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ `${user.firstName} ${user.lastName}` }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ user.email }} <br> {{ user.phoneNumber }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ user.link ? user.link : '' }}</span>
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
              <div
                style="width: 100vw;"
                class="flex flex-row justify-between"
              >
                <div style="font-size: 1.1em; display:flex; align-items: center">
                  <span>
                    Labor Contacts
                  </span>
                </div>
                <LaborEdit
                  :crew="props.crew"
                  :ticket="props.ticket"
                />
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
                    v-for="(labor, index) in crewLabor"
                    :key="index"
                  >
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ `${labor.firstName} ${labor.firstName}` }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">
                        job
                      </span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">
                        {{ labor.email }}<br>{{ labor.phoneNumber }}
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
                Labor Order: {{ props.ticket.related_order?.order_po_number }}
              </div>
            </VExpansionPanelTitle>

            <VExpansionPanelText>
              <VTable class="text-no-wrap transaction-table">
                <thead>
                  <tr>
                    <th>LABOR ITEM</th>
                    <th>QTY</th>
                    <th>UNIT</th>
                    <th>TOTAL AMOUNT</th>
                    <!--                    <th>COST</th> -->
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">{{ props.ticket.related_order.material_description }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm">
                        {{ props.ticket.related_order.quantity }}
                      </span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm"> {{ props.ticket.related_order.unit }}</span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm"> {{ props.ticket.related_order.total_amount }}</span>
                    </td>
                    <!--                    <td :style="getPaddingStyle(index)"> -->
                    <!--                      <span class="text-sm"> {{ order.cost }}</span> -->
                    <!--                    </td> -->
                  </tr>
                </tbody>
              </VTable>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Labor Order End -->

          <!-- Crew Instructions Start -->
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle>
              <div
                style="width: 100vw;"
                class="flex flex-row justify-between"
              >
                <div style="font-size: 1.1em; display:flex; align-items: center">
                  <span>
                    Crew Instructions
                  </span>
                </div>
                <InstructionEdit :ticket="props.ticket" />
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
                  <tr>
                    <td>
                      <span class="text-sm">{{ props.ticket.crew_instructions }}</span>
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
                      <span class="text-sm"> <strong>Start: {{ formattedDay(props.ticket.start_date) }}</strong> {{ formattedDate(props.ticket.start_date) }}</span>
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
                      <span class="text-sm text-red-600"> Not Checked In </span>
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
                      <span class="text-sm text-red-600"> Not Checked In </span>
                    </td>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm" />
                    </td>
                  </tr>

                  <tr>
                    <td :style="getPaddingStyle(index)">
                      <span class="text-sm"> <strong>End: {{ formattedDay(props.ticket.end_date) }}</strong> {{ formattedDate(props.ticket.end_date) }} </span>
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
              <div
                style="width: 100vw;"
                class="flex flex-row justify-between"
              >
                <div style="font-size: 1.1em; display:flex; align-items: center">
                  <span>
                    Shared Documents
                  </span>
                </div>
                <DocumentsSelect :ticket="props.ticket" />
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
                    color="primary"
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
          <VExpansionPanel class="mb-2">
            <VExpansionPanelTitle> Shared Photos </VExpansionPanelTitle>
            <VExpansionPanelText>
              <!--              <VFileInput -->
              <!--                label="Underlined" -->
              <!--                variant="underlined" -->
              <!--                density="default" -->
              <!--              /> -->

              <AddPhotos :ticket="props.ticket" />
              <VAvatar
                v-for="(photo) in ticketData.related_images"
                :key="photo.id"
                rounded
                :size="200"
                color="primary"
                variant="tonal"
                class="m-4 ml-0"
              >
                <VImg :src="`${uploadsUrl}images/${photo.Name}`" />
              </VAvatar>
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Shared Photos  End -->

          <!-- Checklist Start -->
          <VExpansionPanel>
            <VExpansionPanelTitle> Checklist </VExpansionPanelTitle>
            <VExpansionPanelText>
              There are no Checklists associated to this order.
            </VExpansionPanelText>
          </VExpansionPanel>
          <!-- Checklist  End -->

          <!-- Disclaimer Start -->
          <VExpansionPanel>
            <VExpansionPanelTitle> Disclaimer </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ props.ticket.disclaimer ?? 'No Disclaimer has been added.' }}
            </VExpansionPanelText>
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
