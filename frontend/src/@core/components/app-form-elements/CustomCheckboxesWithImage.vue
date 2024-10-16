<script lang="ts" setup>
import type { GridColumn } from '@core/types'

interface Props {
  selectedCheckbox: string[]
  checkboxContent: { bgImage: string; value: string; label?: string }[]
  gridColumn?: GridColumn
  ticketData: {}
  ticket: { id: number; name: string; start_date: string; end_date: string; trade: string; template: string; related_order: { related_estimate: { related_contact: object } } }
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const uploadsUrl = import.meta.env.VITE_API_BASE_UR_FILES

const { getCurrentUserImagesList } = useImages()
const { getById } = useLaborTickets()

interface Emit {
  (e: 'update:selectedCheckbox', value: string[]): void
}

const updateSelectedOption = (value: string[] | null) => {
  if (typeof value !== 'boolean' && value !== null)
  { emit('update:selectedCheckbox', value) }
}

const userUploadedImages = ref([])

onMounted(async () => {
  const { data } = await getCurrentUserImagesList()

  watch(data, newVal => {
    userUploadedImages.value = newVal.rows
  })
})
</script>

<template>
  <VRow
    v-if="props.checkboxContent && props.selectedCheckbox"
    class="custom-input-wrapper"
  >
    <VCol
      v-for="item in ticketData.related_images"
      :key="item.value"
      v-bind="gridColumn"
    >
      <VLabel
        class="custom-input custom-checkbox rounded cursor-pointer w-100"
        :class="props.selectedCheckbox.includes('basic') ? 'active' : ''"
      >
        <div>
          <VCheckbox
            :id="`custom-checkbox-with-img-${'basic'}`"
            :model-value="props.selectedCheckbox"
            :value="item.value"
            @update:model-value="updateSelectedOption"
          />
        </div>

        <img
          :src="`${uploadsUrl}images/${item.Name}`"
          alt="bg-img"
          class="custom-checkbox-image"
        >
      </VLabel>

      <VLabel
        v-if="item.label || $slots.label"
        :for="`custom-checkbox-with-img-${'basic'}`"
        class="cursor-pointer"
      >
        <slot
          name="label"
          :label="item.label"
        >
          {{ item.label }}
        </slot>
      </VLabel>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.custom-checkbox {
  position: relative;
  padding: 0;

  .custom-checkbox-image {
    block-size: 100%;
    inline-size: 100%;
    min-inline-size: 100%;
  }

  .v-checkbox {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    visibility: hidden;
  }

  &:hover,
  &.active {
    .v-checkbox {
      visibility: visible;
    }
  }
}
</style>
