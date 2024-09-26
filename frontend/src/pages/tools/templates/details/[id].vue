<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useTemplates } from '@/composables/useTemplates'
import type Template from '@/types/templates/Template'

definePage({
  meta: {
    actions: 'read',
    subject: 'templates',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const templateData = ref<Template>()
const templateName = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const { data, isFetching } = await useTemplates().getById(route.params.id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    templateName.value = newVal.name
    templateData.value = newVal
  })

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })
})

useHead({
  title: computed(() => {
    return templateData.value !== undefined ? `${templateData.value.name} details` : null
  }),
})
</script>

<template>
  <VBreadcrumbs
    :items="[
      {
        title: 'Home',
        to: { name: 'root' },
      },
      {
        title: 'Templates',
        to: { name: 'tools-templates' },
      },
      {
        title: templateName,
        disabled: true,
      },
    ]"
    class="!pl-0"
  />
  <VRow v-if="templateData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <TemplateInfoPanel :template-data="templateData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    />
  </VRow>
  <div v-else-if="!isLoading">
    <VAlert
      type="error"
      variant="tonal"
    >
      Contact with ID  {{ route.params.id }} not found!
    </VAlert>
  </div>
</template>
