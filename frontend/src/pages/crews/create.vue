<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useCrews } from '@/composables/useCrews'
import type Crew from '@/types/crews/Crew'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsCrews } from '@/utils/initial_data/initialFieldsCrews'
import type FormField from '@/types/forms/FormField'
import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'

definePage({
  meta: {
    action: 'manage',
    subject: 'crew',
  },
})

const { create: createCrew, getById: getCrewById, update: updateCrew } = useCrews()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Crew')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Crews', to: { name: 'crews' } },
  { title: 'New crew', disabled: true },
])

const { formFields, initializeFields } = useFormFields('crews')
const crewRef = ref<Crew>()
const dataLoaded = ref(false)

const fetchCrewData = async (id: string) => {
  const { data } = await getCrewById(id)

  watch(data, (crew: Crew | null) => {
    if (crew === null) {
      return
    }

    crewRef.value = crew
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(crew, subField.name)) {
            subField.value = crew[subField.name]
          }
        })
      } else if (hasKey(crew, field.name)) {
        field.value = crew[field.name]
      }
    })
    pageTitle.value = `Update ${crew.name}`
    breadcrumbs.value[2] = { title: `Update ${crew.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsCrews)

  const crewId = route.params.id as string
  if (crewId) {
    isUpdateMode.value = true
    await fetchCrewData(crewId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && crewRef.value ? `Edit ${crewRef.value.name}` : 'Create new crew')),
})

const submitForm = async (values: Record<string, any>) => {
  const crewData = { ...crewRef.value, ...values } as Crew
  const action = crewData.id ? updateCrew : createCrew
  const { data } = await action(crewData)

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
