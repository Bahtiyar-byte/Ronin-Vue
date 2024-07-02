<script setup lang="ts">
import { debounce } from 'lodash'

const props = withDefaults(defineProps<{
  title: string
  class?: string
  fetchItems: (query: string) => Promise<string[] | { value: string; title: string }[] | null | undefined>
}>(), {
  class: 'w-2/4 my-2',
})

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
    :class="props.class"
    :title="title"
    :items="items"
    :loading="loading"
    @update:search="debouncedFetchVariants"
  />
</template>
