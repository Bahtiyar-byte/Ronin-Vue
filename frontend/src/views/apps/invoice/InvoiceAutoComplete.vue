<script setup lang="ts">
import { debounce } from 'lodash'

const props = defineProps<{
  title: string
  fetchItems: (query: string) => Promise<string[] | { value: string; title: string }[] | null | undefined>
}>()

const value = defineModel<string>('value', { default: undefined })
const loading = defineModel<boolean>('loading')

const items = ref<string[] | { value: string; title: string } | any>()

onBeforeMount(async () => {
  items.value = await props.fetchItems('')
})

const debouncedFetchVariants = debounce(async (query: string) => {
  if (value.value?.length) {
    return
  }

  loading.value = true
  items.value = await props.fetchItems(query)
  loading.value = false
}, 400)
</script>

<template>
  <AppAutocomplete
    v-model="value"
    class="w-2/4 my-2"
    :title="title"
    :items="items"
    :loading="loading"
    @update:search="debouncedFetchVariants"
  />
</template>
