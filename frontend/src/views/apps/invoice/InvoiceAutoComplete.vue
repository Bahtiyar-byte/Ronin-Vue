<script setup lang="ts">
import { debounce } from 'lodash'

const props = defineProps<{
  title: string
  fetchItems: (query: string) => Promise<string[] | { value: string; title: string }[] | null | undefined>
}>()

const value = defineModel<string>('value', { default: '' })
const loading = defineModel<boolean>('loading')

const items = ref<string[] | { value: string; title: string } | any>()

onBeforeMount(async () => {
  items.value = await props.fetchItems('')
})

const debouncedFetchVariants = debounce(async (query: string) => {
  if (value.value?.length) {
    return
  }

  items.value = await props.fetchItems(query)
}, 400)
</script>

<template>
  <AppAutocomplete
    v-model="value"
    class="w-2/4 my-2"
    label="Assigned Told"
    placeholder="Select User"
    :items="items"
    :loading="loading"
    @update:search="debouncedFetchVariants"
  />
</template>
