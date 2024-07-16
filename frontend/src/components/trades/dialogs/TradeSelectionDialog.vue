<script setup lang="ts">
import DebouncedAutoComplete from '@/components/common/DebouncedAutoComplete.vue'
import { useTrades } from '@/composables/useTrades'
import { fetchAutocomplete } from '@/utils/api'

defineEmits<{
  (e: 'saveTradeClicked', id: string): void
}>()

const isDialogVisible = defineModel<boolean>('dialogVisible', { required: true })

const dialogModelValueUpdate = (val: boolean) => {
  isDialogVisible.value = val
}

const { autocomplete: autocompleteTrades } = useTrades()
const selectedTrade = ref<string>()

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
                  $emit('saveTradeClicked', selectedTrade)
                }
              }"
            >
              Save
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <RouterLink
          :to="{ name: 'tools-trades' }"
          target="_blank"
        >
          <VBtn
            variant="plain"
            text="Manage trades"
          />
        </RouterLink>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
