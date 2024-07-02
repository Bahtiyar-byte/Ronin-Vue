<script setup lang="ts">
import { useEstimateSections } from '@/composables/useEstimateSections'
import InvoiceAutoComplete from "@/views/apps/invoice/InvoiceAutoComplete.vue";

interface Props {}

defineProps<Props>()

const { autocomplete: autocompleteSections } = useEstimateSections()

// const emit = defineEmits<{
//   (e: 'submit', value: any): void
// }>()

const isDialogVisible = defineModel<boolean>('dialogVisible', { required: true })

const dialogModelValueUpdate = (val: boolean) => {
  isDialogVisible.value = val
}

const existenceLabel = ref<string>('Select existent estimate section')

const fetchAutocomplete = async (query: string, autocompleteFn: (query: string) => Promise<any>) => {
  const { data } = await autocompleteFn(query)
  if (data.value === null) {
    return
  }

  return data.value.map((item: any) => ({ value: item.id, title: item.label }))
}
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
        <InvoiceAutoComplete
          :label="existenceLabel"
          :title="existenceLabel"
          :fetch-items="(query) => fetchAutocomplete(query, autocompleteSections)"
          class="w-full"
        />

        <div class="flex items-center align-center text-center w-full flex-row my-5">
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
          <div class="font-medium flex mx-3 whitespace-nowrap text-sm">
            or
          </div>
          <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid" />
        </div>

        <p>test</p>

      </VCardText>
    </VCard>
  </VDialog>
</template>
