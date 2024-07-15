<script setup lang="ts">
import DebouncedAutoComplete from '@/components/common/DebouncedAutoComplete.vue'
import { useTrades } from '@/composables/useTrades'

// import { debounce } from 'lodash'
import { fetchAutocomplete } from '@/utils/api'

const isDialogVisible = defineModel<boolean>('dialogVisible', { required: true })

const dialogModelValueUpdate = (val: boolean) => {
  isDialogVisible.value = val
}

const { autocomplete: autocompleteTrades } = useTrades()
const selectedTrade = ref<string>()

// const debounceFetchAutocomplete = debounce(fetchAutocomplete, 400)

const existenceLabel = 'Selected existent trade'
</script>

<template>
  <VDialog
    v-model:model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 500"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />
    <VCard
      class="!p-2 sm:!p-4"
      title="Select trade"
    >
      <VCardText>
        <VRow>
          <VCol cols="9">
            <DebouncedAutoComplete
              v-model="selectedTrade"
              :label="existenceLabel"
              :title="existenceLabel"
              :fetch-items="(query) => fetchAutocomplete(query, autocompleteTrades)"
              class="w-full"
            />
          </VCol>
          <VCol
            cols="3"
            class="d-flex items-end"
          >
            <VBtn
              type="button"
              class="w-full"
              @click="() => {
                if (selectedTrade?.length) {
                  dialogModelValueUpdate(false)
                  // $emit('saveSectionClicked', selectedTemplate)
                }
              }"
            >
              Save
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
