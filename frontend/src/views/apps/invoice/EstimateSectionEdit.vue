<script setup lang="ts">
import type EstimateSection from '@/types/estimateSections/EstimateSection'

interface Emit {
  (e: 'remove', value: number): void
}

interface Props {
  id: number
  hideControls?: boolean
}

defineProps<Props>()

defineEmits<Emit>()

const data = defineModel<Partial<EstimateSection>>('section', { required: true })
const totalAmount = defineModel<number>('totalAmount', { default: 0 })

watch([
  () => data.value.material_price,
  () => data.value.amount,
], () => {
  totalAmount.value = Number.parseFloat(((data.value.material_price ?? 0) * (data.value.amount ?? 0)).toFixed(2))
})
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-sm-row flex-column-reverse break-inside-avoid"
  >
    <!-- 👉 Left Form -->
    <div class="py-6 flex-grow-1">
      <VRow class="!mx-10">
        <VCol cols="12">
          <p
            v-if="hideControls"
            class="font-semibold mb-2"
          >
            {{ data.name }}
          </p>
          <AppTextField
            v-else
            v-model="data.name"
            placeholder="Name"
            class="mb-2"
          />

          <p v-if="hideControls">
            {{ data.description }}
          </p>
          <AppTextarea
            v-else
            v-model="data.description"
            rows="2"
            placeholder="Item description"
            persistent-placeholder
          />
        </VCol>
      </VRow>
      <VRow class="!mx-10 mt-2 border-t border-gray-300 dark:border-gray-700">
        <VCol
          cols="12"
          md="8"
          class="font-semibold"
        >
          {{ section.name }} Section Total
        </VCol>
        <VCol
          cols="12"
          md="4"
          class="flex items-center gap-0.5"
        >
          $
          <span v-if="hideControls">
            {{ data.amount }}
          </span>
          <AppTextField
            v-else
            v-model="data.amount"
            type="number"
            placeholder="Amount"
            min="0.01"
          />
        </VCol>
      </VRow>
    </div>

    <!-- 👉 Item Actions -->
    <div
      v-if="!hideControls"
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
