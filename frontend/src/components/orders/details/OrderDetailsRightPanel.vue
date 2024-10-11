<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import moment from 'moment'
import type Estimate from '@/types/estimates/Estimate'

defineProps<{
  handleDownload: () => void
  handlePrint: () => void
  route: RouteLocationNormalizedLoaded
}>()

const estimate = defineModel<Estimate>('estimate', { required: true })
const loading = defineModel<boolean>('loading')
const isSendEstimateSidebarVisible = defineModel<boolean>('isSendEstimateSidebarVisible')

const { getById: getContactById } = useContacts()
const { getById: getUserById } = useUsers()
const { getById: getOrderById } = useOrders()
const { getById: getJobById } = useJobs()

const customerId = ref('')
const customerData = ref({ id: '', name: '', firstName: '', lastName: '', email: '', address_related_contact: [] })
const orderData = ref({ id: '', order_name: '', order_po_number: '' })
const jobId = ref({})
const jobData = ref({})
const locationAddressData = ref({})
const route = useRoute() as RouteLocationNormalizedLoaded & { query: Partial<{ contact_id: string }> }

onMounted(async () => {
  const orderId = route.params.id as string
  const { data } = await getOrderById(orderId)

  watch(data, newVal => {
    if (newVal) {
      orderData.value = newVal
      customerId.value = newVal.related_estimate.related_contactId
      jobId.value = newVal.related_jobId
    }
  })

  watch(customerId, async newVal => {
    if (newVal) {
      const { data } = await getContactById(customerId.value)

      customerData.value = data
      if (data) {
        locationAddressData.value = data?.address_related_contact
          ?.find(address => address.is_mailing_address)
      }
    }
  })

  watch(jobId, async newVal => {
    if (newVal) {
      const { data } = await getJobById(jobId.value)

      jobData.value = data
    }
  })
})

const getPrimaryEmail = (relatedEmails: Array) => {
  if (relatedEmails) {
    const primaryEmail = relatedEmails.find(email => email.is_primary)

    return primaryEmail?.email || ''
  }
}

const getPrimaryPhone = (relatedPhone: Array) => {
  if (relatedPhone) {
    const primaryPhone = relatedPhone.find(phone => phone.is_primary)

    return primaryPhone?.phone_number || ''
  }
}

const getFormattedDate = (dateString: string) => {
  const date = moment(dateString)

  return date.format('MM/DD/YYYY')
}

const locationAddress = ref({})

const getAddress = (address: any) => {
  if (address) {
    locationAddress.value = address.find(address => address.is_mailing_address)
  }
}

const isVisibleOrderUpdateForm = ref(false)
</script>

<template>
  <div class="!sticky top-4">
    <VCard
      :loading="loading"
      class="mb-8"
    >
      <VCardText class="space-y-3">
        <VBtn
          block
          prepend-icon="tabler-send"
          @click="isSendEstimateSidebarVisible = !isSendEstimateSidebarVisible"
        >
          Send
        </VBtn>

        <VBtn
          block
          variant="tonal"
          color="secondary"
          prepend-icon="tabler-download"
          @click="handleDownload"
        >
          Download
        </VBtn>

        <div class="flex gap-2.5">
          <VBtn
            class="flex-1"
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-printer"
            @click="handlePrint"
          >
            Print
          </VBtn>
          <VBtn
            v-if="$can('update', 'estimates')"
            class="flex-1"
            variant="tonal"
            color="secondary"
            @click="isVisibleOrderUpdateForm = !isVisibleOrderUpdateForm"
          >
            Edit
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <UpdateOrderDialog
      v-model:is-dialog-visible="isVisibleOrderUpdateForm"
      v-model:search-params="estimatesSearchParams"
    />

    <!-- 👉 Customer Details  -->
    <VCard class="mb-6">
      <VCardText class="d-flex flex-column gap-y-6">
        <h5 class="text-h5 font-weight-medium">
          Customer details
        </h5>

        <div class="d-flex align-center gap-x-3">
          <VAvatar
            color="primary"
            variant="tonal"
          >
            {{ customerData.value?.firstName.charAt(0) }}{{ customerData.value?.lastName.charAt(0) }}
          </VAvatar>
          <div>
            <h6 class="text-h6">
              {{ customerData.value?.firstName }} {{ customerData.value?.lastName }}
            </h6>
            <div class="text-body-1">
              Category: Residential
            </div>
          </div>
        </div>

        <div class="d-flex flex-column gap-y-1">
          <div class="d-flex justify-space-between align-center">
            <h6 class="text-h6">
              Contact Info
            </h6>
            <RouterLink :to="{ name: 'contacts-update-id', params: { id: customerData.value?.id } }">
              <div class="text-base text-primary cursor-pointer font-weight-medium">
                <div class="d-flex align-center gap-2">
                  <p class="font-semibold">
                    Edit
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
          <span>Email: {{ getPrimaryEmail(customerData.value?.related_emails) }} </span>
          <span>Mobile: {{ getPrimaryPhone(customerData.value?.related_phones) }} </span>
        </div>
      </VCardText>
    </VCard>

    <!-- 👉 Job Details  -->
    <VCard class="mb-6">
      <VCardText class="d-flex flex-column gap-y-6">
        <h5 class="text-h5 font-weight-medium">
          Job details
        </h5>

        <div class="d-flex align-center gap-x-3">
          <VAvatar
            color="primary"
            variant="tonal"
          >
            {{ customerData.value?.firstName.charAt(0) }}{{ customerData.value?.lastName.charAt(0) }}
          </VAvatar>
          <div>
            <h6 class="text-h6">
              {{ orderData.order_po_number }}
            </h6>
            <div class="text-body-1">
              Job Value: ${{ orderData?.related_estimate?.total_price }}
            </div>
          </div>
        </div>

        <div class="d-flex flex-column gap-y-1">
          <span>Trade: Shingles</span>
          <span>Start date: {{ getFormattedDate(jobData.value?.start_date) }} </span>
        </div>

        <div class="d-flex flex-column gap-y-1">
          <div class="d-flex justify-space-between align-center">
            <h6 class="text-h6">
              Location Address
            </h6>
            <RouterLink :to="{ name: 'jobs-update-id', params: { id: jobData.value?.id } }">
              <div class="text-base text-primary cursor-pointer font-weight-medium">
                <div class="d-flex align-center gap-2">
                  <p class="font-semibold">
                    Edit
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
          <span>{{ `${locationAddress?.suite_apt_unit} ${locationAddress?.street}` }}</span> {{ getAddress(customerData.value?.address_related_contact) }}
          <span>{{ `${locationAddress.city}, ${locationAddress.state} ${locationAddress.zip}` }}</span>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
