<script lang="ts" setup>

interface Props {
  label: string
  value?: string
  modelValue?: string
  disabled?: boolean
}

interface Emit {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const updateSelectedOption = (value: string | null) => {
    { emit('update:modelValue', value )}
}
</script>

<template>
  <VRow class="custom-input-wrapper md-2"
  >
    <VCol class="md-2"
    >
      <VLabel
        class="custom-input custom-checkbox rounded cursor-pointer"
        :class="props.value ? 'active' : ''"
      >
        <div>
          <VCheckbox
            :model-value="props.modelValue"
            :value="props.value"
            :label="props.label"
            :true-value="'true'"
            :false-value="'false'"
            @update:model-value="updateSelectedOption"
          />
        </div>
<!--        <slot :item="item">-->
<!--          <div class="flex-grow-1">-->
<!--            <div class="d-flex align-center mb-2">-->
<!--              <h6 class="cr-title text-base">-->
<!--                {{ item.title }}-->
<!--              </h6>-->
<!--              <VSpacer />-->
<!--              <span-->
<!--                v-if="item.subtitle"-->
<!--                class="text-disabled text-body-2"-->
<!--              >{{ item.subtitle }}</span>-->
<!--            </div>-->
<!--            <p class="text-sm mb-0">-->
<!--              {{ item.desc }}-->
<!--            </p>-->
<!--          </div>-->
<!--        </slot>-->
      </VLabel>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  .v-checkbox {
    margin-block-start: -0.375rem;
  }

  .cr-title {
    font-weight: 500;
    line-height: 1.375rem;
  }
}
</style>
