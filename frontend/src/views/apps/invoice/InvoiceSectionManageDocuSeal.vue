<script setup lang="ts">
import type { Ref } from 'vue'
import { debounce } from 'lodash'
import DebouncedAutoComplete from '@/components/common/DebouncedAutoComplete.vue'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'
import type { GetListResponse } from '@/types/common/GetListRequestTypes'
import { DocusealBuilder } from '@docuseal/vue'

interface Props {}

defineProps<Props>()

defineEmits<{
  (e: 'saveSectionClicked', id: string): void
}>()

const isDialogVisible = defineModel<boolean>('dialogVisible', { required: true })
const token = defineModel<string>('token', { required: true })
const tradesUuid = defineModel<string>('tradesUuid')
const selectedTemplate = ref<string>()

const dialogModelValueUpdate = (val: boolean) => {
  isDialogVisible.value = val

  if (!val) {
    tradesUuid.value = undefined
    selectedTemplate.value = ''
  }
}

const existenceLabel = ref<string>('Select existent section template')

const { getList } = useTemplates()

const sectionsAutocomplete = async (query: string): Promise<Ref<GetListResponse | null> | undefined> => {
  const { data } = await getList({
    name: query,
    related_trade: tradesUuid.value ?? '',
  })

  return data
}

const debounceFetchAutocomplete = debounce(sectionsAutocomplete, 400)

const isTemplateCreationVisible = ref<boolean>(false)
const showTemplateCreatedSnackbar = ref<boolean>(false)

const DialogTemplateCreationForm = defineAsyncComponent(() =>
  import('@/components/estimateSectionTemplates/InDialogCreation.vue'),
)

const toggleTemplateCreation = () => {
  isTemplateCreationVisible.value = !isTemplateCreationVisible.value
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />
    <VCard
      class="!p-2 sm:!p-4"
      title="Manage Docuseal"
    >
      <VCardText>


        <DocusealBuilder
          v-if="token"
          :token="token"
          :sendCopyEmail="true"
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
