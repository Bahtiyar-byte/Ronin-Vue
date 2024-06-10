<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  showCancel?: boolean
  showAccept?: boolean
  showClose?: boolean
  onCancel?: () => Promise<void>
  onAccept?: () => Promise<void>
}>(), {
  showCancel: true,
  showAccept: true,
  showClose: false,
  onCancel: async () => {},
  onAccept: async () => {},
})

const emit = defineEmits(['confirm', 'cancel'])

const isVisible = defineModel<boolean>('isVisible', { required: true })

const acceptBtn = ref()

watch(isVisible, newVal => {
  if (newVal) {
    setTimeout(() => {
      acceptBtn.value !== null && acceptBtn.value.$el.focus()
    }, 50)
  }
})

const onClose = async () => {
  emit('cancel')
  await props.onCancel()
  isVisible.value = false
}

const onAccept = async () => {
  emit('confirm')
  await props.onAccept()
  isVisible.value = false
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 320"
    :model-value="isVisible"
  >
    <DialogCloseBtn
      v-if="props.showClose"
      @click="onClose"
    />

    <VCard class="pa-sm-10 pa-2">
      <VCardText>
        <h4 class="text-lg font-medium text-center">
          {{ props.title }}
        </h4>
      </VCardText>
      <VCardActions>
        <VBtn
          v-if="props.showCancel"
          color="error"
          @click="onClose"
          class="flex-1"
        >
          Cancel
        </VBtn>
        <VBtn
          v-if="props.showAccept"
          ref="acceptBtn"
          @click="onAccept"
          class="flex-1"
        >
          Confirm
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
