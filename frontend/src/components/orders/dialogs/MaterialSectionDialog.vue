<script setup lang="ts">
defineEmits<{
  (e: 'saveMaterial'): void
}>()

const materialDescription = defineModel<string>('materialDescription', { required: true })
const quantity = defineModel<string>('quantity', { required: true })
const unit = defineModel<string>('unit', { required: true })

const isDialogVisible = defineModel<boolean>('dialogVisible', { required: true })
const selectedTrade = ref<string>()

const dialogModelValueUpdate = (val: boolean) => {
  isDialogVisible.value = val

  if (!val) {
    selectedTrade.value = ''
  }
}
</script>

<template>
  <VDialog
    v-model:model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 700"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />
    <VCard
      class="!p-2 sm:!p-4"
      title="Add Material Description"
    >
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <label
                  class="v-label text-body-2 text-high-emphasis"
                  for="materialDescription"
                >Material Description</label>
                <VTextarea
                  id="materialDescription"
                  v-model="materialDescription"
                  placeholder="Material Description"
                  persistent-placeholder
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <label
                      class="v-label text-body-2 text-high-emphasis"
                      for="quantity"
                    >Quantity</label>
                    <AppTextField
                      id="quantity"
                      v-model="quantity"
                      placeholder="Quantity"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <label
                      class="v-label text-body-2 text-high-emphasis"
                      for="unit"
                    >Unit</label>
                    <AppTextField
                      id="unit"
                      v-model="unit"
                      placeholder="Unit"
                      persistent-placeholder
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex items-end"
                  >
                    <VBtn
                      type="button"
                      class="w-full"
                      @click="() => {
                        $emit('saveMaterial')
                        dialogModelValueUpdate(false)
                      }"
                    >
                      Save
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
