<script setup lang="ts">
import type { GetInvoicesRequest } from '@/types/invoices/GetInvoicesRequest'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const searchParams = defineModel<GetInvoicesRequest>('searchParams', { default: {} })

const { getList } = useInvoices()

const { data: invoicesList } = await getList(searchParams.value)
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 750"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <VCard class="sm:!p-10 !p-2">
      <VCardText>
        <!-- 👉 Title -->
        <ActivityDialogHeader title="Related invoices" />

        <RouterLink
          v-for="(item, index) in invoicesList?.rows"
          :key="index"
          :to="{ name: 'root' }"
        >
          <div class="d-flex justify-space-between align-center py-4 gap-x-4">
            <div class="d-flex align-center gap-2">
              <p class="font-semibold">
                {{ item.invoice_number }}
              </p>
            </div>
          </div>
          <VDivider
            v-if="index !== (invoicesList?.rows.length ?? 0) - 1"
            class="border-gray-300 !opacity-60"
          />
        </RouterLink>
      </VCardText>
    </VCard>
  </VDialog>
</template>
