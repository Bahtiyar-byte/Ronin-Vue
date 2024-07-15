<script setup lang="ts">
import { debounce } from 'lodash'
import { useEstimateSectionTemplates } from '@/composables/useEstimateSectionTemplates'
import DebouncedAutoComplete from '@/components/common/DebouncedAutoComplete.vue'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'

import { fetchAutocomplete } from '@/utils/api'

interface Props {}

defineProps<Props>()

defineEmits<{
  (e: 'saveSectionClicked', id: string): void
}>()

const { autocomplete: autocompleteTemplates } = useEstimateSectionTemplates()

const isDialogVisible = defineModel<boolean>('dialogVisible', { required: true })

const dialogModelValueUpdate = (val: boolean) => {
  isDialogVisible.value = val
}

const existenceLabel = ref<string>('Select existent section template')

const debounceFetchAutocomplete = debounce(fetchAutocomplete, 400)

const isTemplateCreationVisible = ref<boolean>(false)
const showTemplateCreatedSnackbar = ref<boolean>(false)

const DialogTemplateCreationForm = defineAsyncComponent(() =>
  import('@/components/estimateSectionTemplates/InDialogCreation.vue'),
)

const toggleTemplateCreation = () => {
  isTemplateCreationVisible.value = !isTemplateCreationVisible.value
}

const selectedTemplate = ref<string>()
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 500"
    :model-value="isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />
    <VCard
      class="!p-2 sm:!p-4"
      title="Manage estimate sections"
    >
      <VCardText>
        <VRow>
          <VCol cols="9">
            <DebouncedAutoComplete
              v-model="selectedTemplate"
              :label="existenceLabel"
              :title="existenceLabel"
              :fetch-items="(query) => fetchAutocomplete(query, autocompleteTemplates)"
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
                if (selectedTemplate?.length) {
                  dialogModelValueUpdate(false)
                  $emit('saveSectionClicked', selectedTemplate)
                }
              }"
            >
              Save
            </VBtn>
          </VCol>
        </VRow>

        <div class="flex items-center align-center text-center w-full flex-row my-5">
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
          <div class="font-medium flex mx-3 whitespace-nowrap text-sm">
            or
          </div>
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
        </div>

        <VCard
          v-if="!isTemplateCreationVisible"
          class="cursor-pointer"
          @click="toggleTemplateCreation"
        >
          <VCardText>
            <div class="d-flex justify-center items-center gap-x-3">
              <VIcon
                icon="tabler-plus"
                size="28"
              />
              <span class="text-high-emphasis">
                Add new template
              </span>
            </div>
          </VCardText>
        </VCard>

        <DialogTemplateCreationForm
          v-if="isTemplateCreationVisible"
          show-cancel
          @cancel-creation="toggleTemplateCreation"
          @template-created="(sectionTemplate: Partial<EstimateSectionTemplate>) => {
            /**
             * ToDo: Fetch section new section template
             */
            debounceFetchAutocomplete('', autocompleteTemplates)
            showTemplateCreatedSnackbar = true
          }"
        />
      </VCardText>
    </VCard>

    <VSnackbar
      v-model="showTemplateCreatedSnackbar"
      :timeout="3500"
    >
      New section template created
    </VSnackbar>
  </VDialog>
</template>
