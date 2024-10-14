<script setup lang="ts">
import moment from 'moment/moment'
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'

const isDialogVisible = defineModel<boolean>('isDialogLaborTicketVisible', { required: true })
const searchParams = defineModel<GetEstimatesRequest>('searchParams', { default: {} })

const { getList } = useLaborTickets()
const { data: laborTicketsList } = await getList(searchParams.value)

const getFormattedDate = (date: string) => {
  const timestamp = moment(date)

  return timestamp.format('MM/DD/YYYY h:mm A')
}
const isVisibleOrderUpdateForm = ref(false)
const laborTicketId = ref('')
const isUpdateForm = ref(true)
const handleEditOrder = (selectedOrderId: string) => {
  laborTicketId.value = selectedOrderId
  isVisibleOrderUpdateForm.value = !isVisibleOrderUpdateForm.value
}
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 1150"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <VCard class="">
      <VCardText>
        <ActivityDialogHeader title="Related Labor Tickets" />

        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th>
                No
              </th>
              <th>
                Name
              </th>
              <th>
                Crew Actions
              </th>
              <th>
                Start Date
              </th>
              <th>
                End Date
              </th>
              <th>
                Assigned Date
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in laborTicketsList?.rows"
              :key="index"
            >
              <td>
                {{ ++index }}
              </td>
              <td>
                <RouterLink :to="{ name: 'labor-tickets-details-id', params: { id: item.id } }">
                  <div class="d-flex justify-space-between align-center py-4 gap-x-4">
                    <div class="d-flex align-center gap-2">
                      <p class="font-semibold">
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </td>
              <td>
                {{ item.crew_actions }}
              </td>
              <td>
                {{ item.start_date }}
              </td>
              <td>
                {{ item.end_date }}
              </td>
              <td>
                {{ getFormattedDate(item.createdAt) }}
              </td>
              <td>
                <IconBtn
                  title="Edit"
                  color="primary"
                  @click="handleEditOrder(item.id)"
                >
                  <VIcon icon="tabler-edit" />
                </IconBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </VDialog>

  <CreateUpdateLaborTicketDialog
    v-if="isVisibleOrderUpdateForm"
    v-model:is-dialog-visible="isVisibleOrderUpdateForm"
    v-model:laborTicketId="laborTicketId"
    v-model:is-update-form="isUpdateForm"
    v-model:search-params="estimatesSearchParams"
  />
</template>
