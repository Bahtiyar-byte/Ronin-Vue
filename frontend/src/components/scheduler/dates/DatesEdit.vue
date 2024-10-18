<script lang="ts" setup>
import { useCrews } from '@/composables/useCrews'

const props = defineProps<Props>()
const { update: updateLaborTicket } = useLaborTickets()
const { autocomplete: autocompleteCrew } = useCrews()
interface Props {
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
}
const _ticket = ref(props?.ticket)

let crews = []

onMounted(async () => {
  const query = ''
  const { data } = await autocompleteCrew(query)

  crews = data
})

const saveLaborTicket = () => {
  const laborTicket = {
    id: props?.ticket.id,
    name: props?.ticket.name || null,
    start_date: props?.ticket.start_date || null,
    end_date: props?.ticket.end_date || null,
    crew_instructions: props?.ticket.crew_instructions || null,
    actual_start_time: props?.ticket.actual_start_time || null,
    actual_end_time: props?.ticket.actual_end_time || null,
    crew_actions: props?.ticket.crew_actions || null,
    labor_progress: props?.ticket.labor_progress || null,
    disclaimer: props?.ticket.disclaimer || null,
    assigned_date: props?.ticket.assigned_date || props?.ticket.createdAt,
    assigned_crew: props?.ticket.labor_ticketAssigned_crewCrew?.crewId,
  }

  const response: boolean = updateLaborTicket(laborTicket)
  if (response) {
    isDialogVisible.value = false
  }
}

const isCompleted = ref(false)

const checkboxOne = ref('')

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

const items = [
  'Evans Service Crew 1',
  'Evans Service Crew 2',
  'Evans Service Crew 3',
  'Evans Service Crew 4',
]

const inlineRadio = ref('radio-1')

const getPaddingStyle = (index: number) =>
  index ? 'padding-block-end: 1.5rem;' : 'padding-block: 1.5rem;'
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    :scrim="false"
    persistent
    :width="$vuetify.display.smAndDown ? 'auto' : 1350"
    :height="$vuetify.display.smAndDown ? 'auto' : 950"
    transition="dialog-transition"
    style="z-index: 2400 !important;"
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
          icon="tabler-pencil"
        />
        Edit
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

          <VToolbarTitle>Assign & Schedule</VToolbarTitle>

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
        <VCardText>
          <VDivider class="mb-2" />
          <span><b>{{ _ticket.related_order.order_name }}</b></span>
          <VList class="card-list m-3 ml-0">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Trade: </span>
                <div class="d-inline-block text-body-1 mr-4">
                  Box Gutters
                </div>

                <span class="font-medium"> PO#: </span>
                <div class="d-inline-block text-body-1">
                  {{ _ticket.related_order.order_po_number }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>

          <VList
            class="card-list m-3 ml-0"
            style="width: 50vw;"
          >
            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Assign a Crew </span>
                <br>
                <div class="d-inline-block text-body-1">
                  Crews are managed in the Labor Manager. For one-off crew
                  assignments, click "Other" and type in the crew name.
                </div>
              </VListItemTitle>

              <VRow>
                <VCol>
                  <AppAutocomplete
                    v-model="_ticket.labor_ticketAssigned_crewCrew.crewId"
                    :items="crews"
                    item-value="id"
                    item-title="label"
                    label="Crews"
                    placeholder="Select Crew"
                  />
                </VCol>

                <VCol>
                  <AppDateTimePicker
                    v-model="_ticket.createdAt"
                    label="Assigned Date"
                    class="calendar-date-picker"
                    placeholder="Select Assigned Date"
                  />
                </VCol>

                <VCol class="d-flex align-end">
                  <VCheckbox
                    v-model="checkboxOne"
                    label="Others"
                  />
                </VCol>
              </VRow>
            </VListItem>

            <div class="break-inside-avoid">
              <VDivider class="my-4 border-line border-gray-700 !opacity-60" />
            </div>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium"> Schedule Labor: </span>
                <br>
              </VListItemTitle>
              <VRow>
                <VCol>
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
                </VCol>

                <VCol>
                  <VCheckbox
                    v-model="checkboxOne"
                    label="All Day"
                  />
                </VCol>
              </VRow>

              <VRow>
                <VCol>
                  <AppDateTimePicker
                    v-model="_ticket.start_date"
                    label="Start Time"
                    placeholder="Select Time"
                  />
                </VCol>
                <VCol>
                  <AppDateTimePicker
                    v-model="_ticket.end_date"
                    label="End Time"
                    placeholder="Select Time"
                    :config="{ position: 'auto right' }"

                  />
                </VCol>
              </VRow>
            </VListItem>

            <div class="break-inside-avoid">
              <VDivider class="my-4 border-line border-gray-700 !opacity-60" />
            </div>

            <VRow>
              <VCol>
                <AppDateTimePicker
                  v-model="_ticket.actual_end_time"
                  label="Completion Date"
                  :disabled="!isCompleted"
                  placeholder="Completion Date"
                />
              </VCol>
              <VCol class="d-flex align-end">
                <VCheckbox
                  v-model="isCompleted"
                  label="Labor is Completed"
                />
              </VCol>
            </VRow>
            <VCardText class="d-flex justify-end flex-wrap gap-3">
              <VBtn
                variant="tonal"
                color="secondary"
                @click="isDialogVisible = false"
              >
                Cancel
              </VBtn>
              <VBtn @click="saveLaborTicket">
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

.calendar-date-picker {
  z-index: 80002;
}
</style>
