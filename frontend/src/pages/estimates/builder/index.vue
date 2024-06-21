<script lang="ts" setup>
import type Estimate from '@/types/estimates/Estimate'
import InvoiceEditable from '@/views/apps/invoice/InvoiceEditable.vue'

// Type: Invoice data
import type { PurchasedProduct } from '@/views/apps/invoice/types'

const estimateData = ref<Estimate>({})

// 👉 Default Blank Data
// const invoiceData = ref<InvoiceData>({
//   invoice: {
//     id: 5037,
//     issuedDate: '',
//     service: '',
//     total: 0,
//     avatar: '',
//     invoiceStatus: '',
//     dueDate: '',
//     balance: 0,
//     client: {
//       address: '112, Lorem Ipsum, Florida',
//       company: 'Greeva Inc',
//       companyEmail: 'johndoe@greeva.com',
//       contact: '+1 123 3452 12',
//       country: 'USA',
//       name: 'John Doe',
//     },
//   },
//   paymentDetails: {
//     totalDue: '$12,110.55',
//     bankName: 'American Bank',
//     country: 'United States',
//     iban: 'ETD95476213',
//     swiftCode: 'BR91905',
//   },
//   purchasedProducts: [
//     {
//       title: '',
//       cost: 0,
//       hours: 0,
//       description: '',
//     },
//   ],
//   note: '',
//   paymentMethod: '',
//   salesperson: '',
//   thanksNote: '',
// })

const addProduct = (value: PurchasedProduct) => {
  console.log(value)

  // estimateData.value?.purchasedProducts.push(value)
}

const removeProduct = (id: number) => {
  console.log(id)

  // estimateData.value?.purchasedProducts.splice(id, 1)
}
</script>

<template>
  <VRow>
    <!-- 👉 InvoiceEditable -->
    <VCol
      cols="12"
      md="9"
    >
      <InvoiceEditable
        :data="estimateData"
        @push="addProduct"
        @remove="removeProduct"
      />
    </VCol>

    <!-- 👉 Right Column: Invoice Action -->
    <VCol
      cols="12"
      md="3"
    >
      <VCard class="mb-8">
        <VCardText>
          <!-- 👉 Send Invoice -->
          <VBtn
            block
            prepend-icon="tabler-send"
            class="mb-4"
          >
            Send Esimate
          </VBtn>

          <!-- 👉 Save -->
          <VBtn
            block
            color="secondary"
            variant="tonal"
          >
            Save
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
