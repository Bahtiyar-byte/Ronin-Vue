<script setup lang="ts">
import moment from 'moment/moment'
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const searchParams = defineModel<GetEstimatesRequest>('searchParams', { default: {} })

const { getList } = useOrders()
const { data: ordersList } = await getList(searchParams.value)

const getFormattedDate = (date: string) => {
  const timestamp = moment(date)

  return timestamp.format('MM/DD/YYYY h:mm A')
}
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 950"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <VCard class="sm:!p-10 !p-2">
      <VCardText>
        <ActivityDialogHeader title="Related orders" />

        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th>
                No
              </th>
              <th>
                Order Name
              </th>
              <th>
                PO Number
              </th>
              <th>
                Total Amount
              </th>
              <th>
                Created Date
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in ordersList?.rows"
              :key="index"
            >
              <td>
                {{ ++index }}
              </td>
              <td>
                <RouterLink :to="{ name: 'order-details-id', params: { id: item.id } }">
                  <div class="d-flex justify-space-between align-center py-4 gap-x-4">
                    <div class="d-flex align-center gap-2">
                      <p class="font-semibold">
                        {{ item.order_name }}
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </td>
              <td>
                {{ item.order_po_number }}
              </td>
              <td>
                {{ item.total_amount }}
              </td>
              <td>
                {{ getFormattedDate(item.createdAt) }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </VDialog>
</template>
