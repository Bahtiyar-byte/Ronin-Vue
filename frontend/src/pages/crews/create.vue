<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useTemplates } from '@/composables/useTemplates'
import type Template from '@/types/templates/Template'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsTemplates } from '@/utils/initial_data/initialFieldsTemplates'
import type FormField from '@/types/forms/FormField'
import ItemUpdate from "@/components/common/CRUD/ItemUpdate.vue";

const { create: createTemplate, getById: getTemplateById, update: updateTemplate } = useTemplates()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Template')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Crews', to: { name: 'crews' } },
  { title: 'New crew', disabled: true },
])

const { formFields, initializeFields } = useFormFields('templates')
const templateRef = ref<Template>()
const dataLoaded = ref(false)

const fetchTemplateData = async (id: string) => {
  const { data } = await getTemplateById(id)

  watch(data, (template: Template | null) => {
    if (template === null) {
      return
    }

    templateRef.value = template
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(template, subField.name)) {
            subField.value = template[subField.name]
            if (subField.name === 'related_trade') {
              subField.value = template[subField.name].id
            }
          }
        })
      } else if (hasKey(template, field.name)) {
        field.value = template[field.name]
      }
    })
    pageTitle.value = `Update ${template.name}`
    breadcrumbs.value[2] = { title: `Update ${template.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsTemplates)

  const templateId = route.params.id as string
  if (templateId) {
    isUpdateMode.value = true
    await fetchTemplateData(templateId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && templateRef.value ? `Edit ${templateRef.value.name}` : 'Create new template')),
})

const submitForm = async (values: Record<string, any>) => {
  const templateData = { ...templateRef.value, ...values } as Template
  const action = templateData.id ? updateTemplate : createTemplate
  const { data } = await action(templateData)

  watch(data, newVal => {
    router.push({ name: 'crews-details-id', params: { id: newVal?.id as string } })
  })
}
</script>

<template>
  <ItemUpdate
    v-if="dataLoaded"
    :title="pageTitle"
    :breadcrumbs="breadcrumbs"
    :fields="formFields as FormField[]"
    :submit-handler="submitForm"
    :is-update-mode="isUpdateMode"
  />
</template>
