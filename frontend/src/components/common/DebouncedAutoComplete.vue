<script setup lang="ts">
import { debounce } from 'lodash'
import { type Ref, isRef } from 'vue'
import type { GetListResponse } from '@/types/common/GetListRequestTypes'

type FetchItemsFnRes = string[] | { value: string; title: string }[] | Ref<GetListResponse | null> | null | undefined
type FetchItemsFn = (query: string) => Promise<FetchItemsFnRes>

const props = withDefaults(defineProps<{
  title: string
  class?: string
  fetchItems: FetchItemsFn
}>(), {
  class: 'w-2/4 my-2',
})

const value = defineModel<string>('value', { default: undefined })
const loading = defineModel<boolean>('loading')

const items = ref<string[] | { value: string; title: string } | any>()

const processResponse = (res: FetchItemsFnRes) => {
  if (isRef(res)) {
    watch(res, (newVal: GetListResponse | null) => {
      items.value = newVal?.rows.map(item => ({
        value: item.id,

        // ToDo: Pass "name" field as optional "nameField" prop
        title: item?.name as string,
      }))
    })
  } else {
    items.value = res
  }
}

onBeforeMount(async () => {
  const res = await props.fetchItems('')

  processResponse(res)
})

const debouncedFetchVariants = debounce(async (query: string) => {
  if (value.value?.length) {
    return
  }

  loading.value = true

  const res = await props.fetchItems(query)

  processResponse(res)
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
