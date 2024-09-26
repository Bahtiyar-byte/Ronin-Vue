<script setup lang="ts">
import { type Ref } from 'vue'

const props = defineProps<{
  title: string
  fetchItems: () => Promise<string[] | { value: string; title: string }[] | null>
  onSave: (newValue: string) => void | Promise<void | Ref<boolean>>
}>()

const value = defineModel<string>('value', { required: true })
const loading = defineModel<boolean>('loading')

const items = ref<string[] | { value: string; title: string } | null>()

const startEditing = async () => {
  items.value = await props.fetchItems()
}

const save = async (newValue: string) => {
  const isLoading = await props.onSave(newValue)

  watch(isLoading, newVal => {
    loading.value = newVal
  }, { immediate: true })
}
</script>

<template>
  <div>
    <VTooltip :text="title">
      <template #activator="{ props: tooltipProps }">
        <AppSelect
          v-model="value"
          :items="items"
          v-bind="{
            ...tooltipProps,
          }"
          :loading="loading"
          density="compact"
          @click.once="startEditing"
          @update:model-value="save"
        />
      </template>
    </VTooltip>
  </div>
</template>
