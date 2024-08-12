<script setup lang="ts">
import { reactive, ref } from 'vue'

const signatureImage = defineModel<string>('signatureImage')
const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })

const state = reactive({
  count: 0,
  option: {
    penColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255,255,255)',
  },
  disabled: false,
})

const signature = ref(null)

const save = (t: string) => {
  if (signature.value?.isEmpty() === false) {
    signatureImage.value = signature.value?.save(t)
    isDialogVisible.value = !isDialogVisible.value
  }
}

const clear = () => {
  signature.value?.clear()
}

const undo = () => {
  signature.value?.undo()
}
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
        <ActivityDialogHeader title="Add your signature" />

        <Vue3Signature
          ref="signature"
          :sign-option="state.option"
          v-bind="{
            w: '100%',
            h: '400px',
          }"
          :disabled="state.disabled"
        />
      </VCardText>

      <VCardActions
        class="flex justify-end"
        value="save"
      >
        <VBtnToggle>
          <VBtn
            icon="tabler-trash"
            title="Clear"
            @click="clear"
          />
          <VBtn
            icon="tabler-arrow-back-up"
            title="Undo"
            @click="undo"
          />
          <VBtn
            color="primary"
            icon="tabler-check"
            title="Save"
            @click="save('image/svg+xml')"
          />
        </VBtnToggle>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
