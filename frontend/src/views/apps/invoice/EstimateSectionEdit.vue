<script setup lang="ts">
import type EstimateSection from '@/types/estimateSections/EstimateSection'

interface Emit {
  (e: 'remove', value: number): void
}

interface Props {
  id: number
}

defineProps<Props>()

defineEmits<Emit>()

const data = defineModel<Partial<EstimateSection>>('section', { required: true })
const totalAmount = defineModel<number>('totalAmount', { default: 0 })

watch([
  () => data.value.material_price,
  () => data.value.amount,
], () => {
  totalAmount.value = (data.value.material_price ?? 0) * (data.value.amount ?? 0)
})
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="add-products-header hidden md:flex mb-4">
    <VRow class="!mx-10 font-semibold">
      <VCol
        cols="12"
        md="6"
      >
        Item
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        Cost
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        Amount
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        Price
      </VCol>
    </VRow>
  </div>

  <VCard
    flat
    border
    class="d-flex flex-sm-row flex-column-reverse"
  >
    <!-- 👉 Left Form -->
    <div class="py-6 flex-grow-1">
      <VRow class="!mx-10">
        <VCol
          cols="12"
          md="6"
        >
          <AppTextField
            v-model="data.name"
            placeholder="Name"
            class="mb-2"
          />

          <AppTextarea
            v-model="data.description"
            rows="2"
            placeholder="Item description"
            persistent-placeholder
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <AppTextField
            v-model="data.material_price"
            type="number"
            placeholder="Material price"
            class="mb-6"
            min="1"
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <AppTextField
            v-model="data.amount"
            type="number"
            class="mb-6"
            placeholder="Amount"
            min="1"
          />
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <p class="my-2">
            <span class="d-inline d-md-none">Price: </span>
            <span class="text-high-emphasis">${{ totalAmount }}</span>
          </p>
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div
      class="flex flex-col align-end absolute right-0 top-0 bottom-0"
      :class="$vuetify.display.smAndUp ? 'border-s' : 'border-b' "
    >
      <IconBtn
        size="36"
        @click="$emit('remove', id)"
      >
        <VIcon
          :size="24"
          icon="tabler-x"
        />
      </IconBtn>
    </div>
  </VCard>
</template>
