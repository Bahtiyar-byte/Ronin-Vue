<script lang="ts" setup>
import shared1 from '@images/shared-photos/shared1.jpg'
import shared2 from '@images/shared-photos/shared2.jpg'
import shared3 from '@images/shared-photos/shared3.jpg'
import shared4 from '@images/shared-photos/shared4.jpg'
import shared5 from '@images/shared-photos/shared4.jpg'

const props = defineProps<Props>()

interface Props {
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
}

const { create: createImages, getById: getImageById, update: updateImage } = useImages()

const { update: updateLaborTicket } = useLaborTickets()

const shared_photos: any[] = [
  {
    bgImage: shared1,
    value: 'basic',
  },
  {
    bgImage: shared2,
    value: 'basic2',
  },
  {
    bgImage: shared3,
    value: 'basic3',
  },
  {
    bgImage: shared4,
    value: 'basic4',
  },
  {
    bgImage: shared5,
    value: 'basic5',
  },
]

const currentTab = ref('item-1')

const isPhotoUploadDialogVisible = ref(false)

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
  'Aluminum/Flashing',
  'Box Gutters',
  'Chimney Cap',
  'Downspouts',
  'Flat Roof',
]

const headers = [
  { title: 'Contract', key: 'filename' },
  { title: 'TYPE', key: 'file_type' },
  { title: 'DATE', key: 'created_at' },
  { title: 'REPRESENTATIVE', key: 'representative' },
  { title: 'Preview', key: 'preview' },
]

const { getById } = useLaborTickets()
const selectedCheckbox = ref(['basic'])

const file = ref<File | null>(null)

const handleFileUpload = (files: FileList | null) => {
  if (files && files.length > 0) {
    file.value = files[0]
  }
}

const ticketData = ref({})

const getTicketData = async () => {
  const { data } = await getById(props.ticket.id)

  watch(data, newVal => {
    ticketData.value = newVal
  })
}

const saveLaborTicket = () => {
  const ids = ticketData.value.related_images.map(image => image.id)

  ids.push(newSavedImageId.value)

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
    related_images: ids,

    // related_images: [],
  }

  const response: boolean = updateLaborTicket(laborTicket)
  if (response) {
    // isDialogVisible.value = false
  }
}

const newSavedImageId = ref('')

const saveImageFile = async () => {
  isPhotoUploadDialogVisible.value = false

  const formData = new FormData()

  formData.append('image', file.value[0])

  const { data } = await createImages(formData)

  watch(data, newVal => {
    newSavedImageId.value = newVal.id
    saveLaborTicket()
  })
}

const { getCurrentUserImagesList } = useImages()

const userUploadedImages = ref([])

onMounted(async () => {
  const { data } = await getCurrentUserImagesList()

  watch(data, newVal => {
    userUploadedImages.value = newVal.rows
  })

  getTicketData()
})
</script>

<template>
  <VDialog
    v-model="isPhotoUploadDialogVisible"
    :scrim="false"
    persistent
    :width="$vuetify.display.smAndDown ? 'auto' : 1350"
    :height="$vuetify.display.smAndDown ? 'auto' : 950"
    transition="dialog-transition"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <!--      <VBtn -->
      <!--        v-bind="props" -->
      <!--        color="primary" -->
      <!--        variant="text" -->
      <!--      > -->
      <VBtn
        color="secondary"
        class="m-4 ml-0"
        :size="200"
        @click="isPhotoUploadDialogVisible = true"
      >
        Add Location View Photo
      </VBtn>
      <!--      </VBtn> -->
    </template>

    <!-- Dialog Content -->
    <VCard class="p-3">
      <!-- Toolbar -->
      <div>
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="isPhotoUploadDialogVisible = false"
          >
            <VIcon
              color="white"
              icon="tabler-x"
            />
          </VBtn>

          <VToolbarTitle>Shared Photos</VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="isPhotoUploadDialogVisible = false"
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
          <VTab>
            <VIcon
              size="30"
              icon="tabler-camera"
            /> Photos
          </VTab>
          <VTab>
            <VIcon
              size="30"
              icon="tabler-file-upload"
            />
            Upload
          </VTab>
          <VTab>
            <VIcon
              size="30"
              icon="tabler-file-upload"
            />
            Google Drive
          </VTab>

          <VTab>
            <VIcon
              size="30"
              icon="tabler-file-upload"
            />
            Dropbox
          </VTab>
        </VTabs>

        <VCardText>
          <VWindow v-model="currentTab">
            <VWindowItem value="item-1">
              <h2>Added 9/23/24 by Matt Gross 1 (5)</h2>

              <CustomCheckboxesWithImage
                v-model:selected-checkbox="selectedCheckbox"
                :checkbox-content="shared_photos"
                :grid-column="{ sm: '2', md: '2', cols: '4' }"
                :ticket="props.ticket"
                :ticket-data="ticketData"
              />
            </VWindowItem>

            <VWindowItem
              class="py-2"
              value="item-2"
            >
              <VFileInput
                v-model="file"
                show-size
                color="primary"
                label="Browse Your Computer"
                variant="outlined"
                @change="handleFileUpload"
              />
            </VWindowItem>

            <VWindowItem
              class="py-2"
              value="item-3"
            >
              <VFileInput
                v-model="file"
                show-size
                color="primary"
                label="Browse Google Drive"
                variant="outlined"
              />
            </VWindowItem>

            <VWindowItem
              class="py-2"
              value="item-3"
            >
              <VFileInput
                v-model="file"
                show-size
                color="primary"
                label="Browse Dropbox"
                variant="outlined"
              />
            </VWindowItem>
          </VWindow>
          <VCardText class="d-flex justify-space-between flex-wrap gap-3">
            <VBtn
              variant="tonal"
              color="secondary"
              @click="isPhotoUploadDialogVisible = false"
            >
              Cancel
            </VBtn>
            <div>
              <p>
                <strong>Files Selected:</strong> 0
              </p>
              <p>
                <strong>Total size:</strong> 0.0 / 25 MB
              </p>
            </div>
            <VBtn @click="saveImageFile">
              Upload
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
