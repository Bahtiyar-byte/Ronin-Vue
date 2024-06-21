<script setup lang="ts">
import { type Ref } from 'vue'
import { debounce } from 'lodash'

const props = defineProps<{
    title: string
    fetchItems: (query: string) => Promise<string[] | { value: string; title: string }[] | null | undefined>
    onSave: (newValue: string) => void | Promise<void | Ref<boolean>>
}>()

const value = defineModel<string>('value', { required: true })
const loading = defineModel<boolean>('loading')

const items = ref<string[] | { value: string; title: string } | null>()

onBeforeMount(async () => {
    items.value = await props.fetchItems('')
})

const debouncedFetchVariants = debounce(async (query: string) => {
    if (value.value?.length) {
        return
    }

    items.value = await props.fetchItems(query)
}, 400)

const save = async (newValue: string) => {
    const isLoading = await props.onSave(newValue)

    watch(isLoading, newVal => {
        loading.value = newVal
    }, { immediate: true })
}
</script>

<template>
    <AppAutocomplete 
    v-model="value" 
    :items="items" v-bind="{}" 
    :loading="loading" 
    @update:model-value="save" 
    @update:search="debouncedFetchVariants" 
    class="w-full"
    label="Assigned Told" 
    placeholder="Select User" />
</template>
