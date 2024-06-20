<script lang="ts" setup>
import { type UnwrapRef, onBeforeMount, ref, watch, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useAppointments } from '@/composables/useAppointments'
import { hasKey } from '@core/utils/helpers'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldAppointment } from '@/utils/initial_data/initialFieldAppointment'
import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type Appointment from '@/types/appointments/Appointment'
import FormField from '@/types/forms/FormField'

const { create: createAppointment, getById: getAppointmentById, update: updateAppointment } = useAppointments()
const { formFields, initializeFields } = useFormFields('appointments')

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const router = useRouter()
const isUpdateMode = ref(false)
const pageTitle = ref('Create Appointment')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Appointments', to: { name: 'appointments' } },
  { title: 'New appointment', disabled: true },
])

const appointmentRef = ref<Appointment>()

const assignFieldValue = (field: UnwrapRef<any>, value: string | { id: string }) => {
  if (typeof value === 'object' && hasKey(value, 'id')) {
    field.value = value.id as string
  } else {
    field.value = value as string
  }
}

const fetchAppointmentData = async (id: string) => {
  const { data } = await getAppointmentById(id)

  watch(data, (appointment: Appointment | null) => {
    if (appointment === null) {
      return
    }

    appointmentRef.value = appointment
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(appointment, subField.name)) {
            const appointmentValue = appointment[subField.name]
            if (typeof appointmentValue === 'string') {
              assignFieldValue(subField, appointmentValue)
            }
          }
        })
      } else if (hasKey(appointment, field.name)) {
        const appointmentValue = appointment[field.name]
        if (typeof appointmentValue === 'string') {
          assignFieldValue(field, appointmentValue)
        }
      }
    })

    pageTitle.value = `Update ${appointment.id}`
    breadcrumbs.value[2] = { title: `Update ${appointment.id}`, disabled: true }
  })
}

const dataLoaded = ref<boolean>(false)

onBeforeMount(async () => {
  await initializeFields(initialFieldAppointment)

  const appointmentId = route.params.id as string
  if (appointmentId) {
    isUpdateMode.value = true
    await fetchAppointmentData(appointmentId)
  }

  dataLoaded.value = true
})

useHead({
  title: computed(() => {
    return isUpdateMode.value && appointmentRef.value !== undefined ? `Edit appointment` : `Create new appointment`
  }),
})

const submitForm = async (values: Record<string, any>) => {
  const _appointmentData = {
    ...appointmentRef.value,
    ...values,
  } as Appointment

  const action = _appointmentData.id ? updateAppointment : createAppointment

  const { data } = await action(_appointmentData)

  watch(data, newVal => {
    router.push({ name: 'appointments-details-id', params: { id: newVal?.id as string } })
  })
}
</script>

<template>
  <ItemUpdate v-if="dataLoaded" :title="pageTitle" :breadcrumbs="breadcrumbs" :fields="formFields as FormField[]"
    :submit-handler="submitForm">
    <template #append_related_contactId>
      <VTooltip text="Add new contact">
        <template #activator="{ props }">
          <IconBtn v-bind="props" :to="{ name: 'contacts-create' }" target="_blank" class="ml-2">
            <VIcon icon="tabler-plus" />
          </IconBtn>
        </template>
      </VTooltip>
    </template>
  </ItemUpdate>
</template>
