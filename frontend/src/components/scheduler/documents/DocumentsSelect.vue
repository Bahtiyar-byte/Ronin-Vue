<script lang="ts" setup>
const props = defineProps<Props>()

interface Props {
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
}

onMounted(() => {
  // console.log('props ', props.ticket)
})

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
                    color="primary"
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
