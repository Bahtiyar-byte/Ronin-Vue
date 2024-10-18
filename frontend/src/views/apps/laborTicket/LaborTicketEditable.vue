<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { watch } from 'vue'
import moment from 'moment/moment'
import type User from '@/types/users/User'
import type EstimateSection from '@/types/estimateSections/EstimateSection'
import type Order from '@/types/orders/Order'

import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'

import { useOrders } from '@/composables/useOrders'

defineProps<{
  hideControls: boolean
}>()

const emit = defineEmits<{
  (e: 'push', value: Partial<EstimateSection>): void
  (e: 'removeSection', id: number): void
}>()

const { update: updateOrder } = useOrders()

const { user: currentUser } = storeToRefs(useCurrentUserStore())
const { getById: getUserById } = useUsers()
const { getById: getOrderById } = useOrders()
const { getById: getLaborTicketById } = useLaborTickets()
const { getById: getCrewByid } = useCrews()

const orderData = defineModel<Partial<Order>>('data', { required: true })
const isVisibleAddButton = defineModel<boolean>('isVisibleAddButton', { required: true })

const isLoading = ref<boolean>()

const userId = ref<string>()
const selectedUser = ref<User>()

const materialDescription = ref('')
const quantity = ref('')
const unit = ref('')

const route = useRoute() as RouteLocationNormalizedLoaded & { query: Partial<{ contact_id: string }> }
const laborTicketData = ref({ assigned_crew: [], start_date: '', end_date: '' })

const getOrder = async (orderId: string) => {
  const { data } = await getOrderById(orderId)

  watch(data, async newVal => {
    if (newVal) {
      orderData.value = newVal
      materialDescription.value = newVal.material_description
      quantity.value = newVal.quantity
      unit.value = newVal.unit
    }
  })
}

const crewUsers = ref({})

const getCrewUsers = async (crewId: string) => {
  const { data: crewData } = await getCrewByid(crewId)

  watch(crewData, newVal => {
    console.log('crew data ', newVal)
    crewUsers.value = newVal.users
  })
}

onMounted(async () => {
  const laborTicketId = route.params.id as string
  const { data } = await getLaborTicketById(laborTicketId)

  watch(data, async newVal => {
    if (newVal) {
      laborTicketData.value = newVal
      getOrder(newVal.related_orderId)
      console.log('laborTicketData.value ', laborTicketData.value.assigned_crew)
      getCrewUsers(laborTicketData.value.assigned_crew[0].id)
    }
  })

  if (currentUser) {
    userId.value = currentUser.value?.id
    selectedUser.value = currentUser.value as User
  }
})

watch(materialDescription, newVal => {
  if (newVal) {
    orderData.value.material_description = newVal
  }
})

watch(quantity, newVal => {
  if (newVal) {
    orderData.value.quantity = newVal
  }
})

watch(unit, newVal => {
  if (newVal) {
    orderData.value.unit = newVal
  }
})

watch(userId, async newVal => {
  const { data } = await getUserById(newVal as string)

  watch(data, newUserVal => {
    selectedUser.value = newUserVal as User
  })
})

const tradesDialogVisible = ref<boolean>(false)
const isDialogVisible = ref<boolean>(false)

const updateMaterials = async () => {
  const action = updateOrder

  orderData.value.related_estimate = orderData.value.related_estimateId
  orderData.value.related_job = orderData.value.related_jobId

  const { data } = await action(orderData.value)

  watch(data, newVal => {
    if (newVal.id) {
      isDialogVisible.value = false
    }
  })
}

const formattedDate = (date: string) => {
  return moment(date).format('ddd MMM DD, YYYY')
}

const date = ref<string | Date>(orderData.value?.createdAt ?? new Date())
</script>

<template>
  <VCard
    class="md:!p-6 !p-12 print:!p-0 print:!shadow-none"
    :loading="isLoading"
  >
    <InvoiceHeader>
      <template #default>
        <InvoiceCompanyBrandingHeader class="mb-6" />

        <InvoiceCompanyAddress />

        <p v-if="selectedUser?.phoneNumber">
          Phone: <a :href="`tel:${selectedUser.phoneNumber}`">{{ selectedUser.phoneNumber }}</a>
        </p>
        <p v-if="selectedUser?.email">
          <a :href="`mailto:${selectedUser.email}`">{{ selectedUser.email }}</a>
        </p>
      </template>

      <template #right>
        <div>
          <h6 class="font-weight-medium text-lg ">
            Order # {{ orderData?.order_name }}
          </h6>
        </div>

        <div>
          <h6 class="font-weight-medium text-lg ">
            PO Number # {{ orderData?.order_po_number }}
          </h6>
        </div>

        <div class="d-flex gap-x-4 align-start align-sm-center flex-column flex-sm-row">
          <span
            class="text-high-emphasis text-sm-end"
            style="inline-size: 5.625rem;"
          >
            Date Issued:
          </span>

          <span style="inline-size: 9.5rem;">
            <span v-if="hideControls">
              {{ formatDate(laborTicketData?.createdAt as string, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }) }}
            </span>
            <AppDateTimePicker
              v-else
              v-model="date"
              placeholder="YYYY-MM-DD"
              :config="{ position: 'auto right' }"
            />
          </span>
        </div>
      </template>
    </InvoiceHeader>

    <VRow
      cols="12"
      md="12"
    >
      <VCol
        cols="12"
        md="12"
        sm="12"
        class="text-no-wrap"
      >
        <VTable class="text-no-wrap">
          <thead>
            <tr class="gray__background">
              <th>{{ laborTicketData?.assigned_crew.length > 0 ? laborTicketData.assigned_crew[0].name : '' }}</th>
              <th />
              <th style="text-align:right">
                MOBILE CREW APP
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ formattedDate(laborTicketData.start_date) }}</td>
              <td style="text-align:center">
                <VIcon
                  size="30"
                  icon="tabler-arrow-right"
                />
              </td>
              <td style="text-align:right">
                {{ formattedDate(laborTicketData.end_date) }}
              </td>
            </tr>
          </tbody>
        </VTable>

        <VTable class="text-no-wrap">
          <thead>
            <tr class="gray__background">
              <th>Crew Contacts</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in crewUsers"
              :key="user.id"
            >
              <td>{{ user.firstName ?? '' }} {{ user.lastName ?? '' }}</td>
              <td style="text-align:center">
                JOB
              </td>
              <td style="text-align:right">
                {{ user?.email }} <br> {{ user?.phone_number }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>

    <VRow>
      <VCol class="text-no-wrap">
        <h6 class="text-h6 mb-4 text-primary font-weight-bold">
          Labor Section:
        </h6>

        <table>
          <tbody>
            <tr>
              <td class="pe-4 pb-4 font-weight-bold">
                Labor :
              </td>
              <td>
                <p class="text-wrap me-4">
                  {{ laborTicketData?.assigned_crew.length > 0 ? laborTicketData?.assigned_crew[0].name : '' }}
                </p>
              </td>
            </tr>
            <tr>
              <td class="pe-4 font-weight-bold">
                Crew Instructions :
              </td>
              <td>{{ laborTicketData?.crew_instructions }}</td>
            </tr>
          </tbody>
        </table>
      </VCol>
    </VRow>

    <!--    <AppDivider /> -->
    <div class="break-inside-avoid">
      <VDivider class="my-4 border-dashed border-gray-700 !opacity-60" />
    </div>

    <div class="add-products-form mb-2">
      <VBtn
        v-if="hideControls && isVisibleAddButton"
        size="small"
        prepend-icon="tabler-plus"
        @click="tradesDialogVisible = !tradesDialogVisible"
      >
        Edit section
      </VBtn>

      <MaterialSectionDialog
        v-if="hideControls"
        v-model:materialDescription="materialDescription"
        v-model:quantity="quantity"
        v-model:unit="unit"
        v-model:dialog-visible="tradesDialogVisible"
        @save-material="(tradeId: string) => {
          isDialogVisible = true
          updateMaterials()
        }"
      />
    </div>

    <VRow>
      <VCol class="text-no-wrap">
        <h6 class="text-h6 mb-4 text-primary font-weight-bold">
          Material Section:
        </h6>

        <table>
          <tbody>
            <tr>
              <td class="pe-4 pb-4 font-weight-bold">
                Material Description:
              </td>
              <td>
                <p class="text-wrap me-4">
                  {{ orderData?.material_description }}
                </p>
              </td>
            </tr>
            <tr>
              <td class="pe-4 font-weight-bold">
                Quantity:
              </td>
              <td>{{ orderData?.quantity }}</td>
            </tr>

            <tr>
              <td class="pe-4 font-weight-bold">
                Unit:
              </td>
              <td>{{ orderData?.unit }}</td>
            </tr>
          </tbody>
        </table>
      </VCol>
    </VRow>

    <div class="break-inside-avoid pt-6">
      <div class="text-sm mb-12">
        <p class="mt-4">
          <b>
            If there is need work to be done or that was discussed and its not specifically listed on estimate please contact us
          </b>
        </p>
      </div>
    </div>
  </VCard>
</template>

<style scoped>
.gray__background {
  background-color: #DCDCDC;
}
</style>
