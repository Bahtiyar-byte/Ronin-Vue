<script lang="ts" setup>
import { type UnwrapRef, onBeforeMount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'

// import * as yup from 'yup'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useAppointments } from '@/composables/useAppointments'

// import { useContacts } from '@/composables/useContacts'
import { hasKey } from '@core/utils/helpers'
import { useFilters } from '@/composables/useFilters'

import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import type Appointment from '@/types/appointments/Appointment'

const { create: createAppointment, getById: getAppointmentById, update: updateAppointment } = useAppointments()

// const { autocomplete: autocompleteContacts } = useContacts()

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const isUpdateMode = ref(false)
const pageTitle = ref('Create Appointment')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Appointments', to: { name: 'appointments' } },
  { title: 'New appointment', disabled: true },
])

const { getVariants } = useFilters()
const appointmentRef = ref<Appointment>()

const formFields = ref<Array<FormField | FormFieldsGroup>>([
  {
    title: 'General',
    fields: [],
  },
])

const fetchAppointmentData = async (id: string) => {
  const { data } = await getAppointmentById(id)

  watch(data, (appointment: Appointment | null) => {
    if (appointment === null) {
      return
    }

    const assignFieldValue = (field: UnwrapRef<FormField>, value: string | { id: string }) => {
      if (typeof value === 'object' && hasKey(value, 'id')) {
        field.value = value.id as string
      } else {
        field.value = value as string
      }
    }

    appointmentRef.value = appointment
    formFields.value.forEach(field => {
      if ('fields' in field) {
        // Если поле является группой, обрабатываем вложенные поля
        field.fields.forEach(subField => {
          if (hasKey(appointment, subField.name)) {
            assignFieldValue(subField, appointment[subField.name])
          }
        })
      } else if (hasKey(appointment, field.name)) {
        assignFieldValue(field, appointment[field.name])
      }
    })

    pageTitle.value = `Update ${appointment.id}`
    breadcrumbs.value[2] = { title: `Update ${appointment.id}`, disabled: true }
  })
}

const dataLoaded = ref<boolean>(false)

onBeforeMount(async () => {
  const processFormField = async (field: FormField) => {
    if (field.type === 'select') {
      const { data } = await getVariants('appointments', field.name)

      if (data.value === null) {
        return
      }

      field.variants = data.value
    }
  }

  const promises = (formFields.value as Array<FormField | FormFieldsGroup>).map(async (val: FormField | FormFieldsGroup) => {
    if ('fields' in val) {
      for (const field of val.fields) {
        await processFormField(field)
      }
    } else {
      await processFormField(val)
    }
  })

  await Promise.all(promises)

  const appointmentId = route.params.id as string
  if (appointmentId) {
    isUpdateMode.value = true
    await fetchAppointmentData(appointmentId)
  }

  dataLoaded.value = true
})

useHead({
  title: computed(() => {
    return isUpdateMode.value && appointmentRef.value !== undefined ? 'Edit appointment' : 'Create new appointment'
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
    console.log(newVal)
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
  >
    <template #append_related_contactId>
      <VTooltip text="Add new contact">
        <template #activator="{ props }">
          <IconBtn
            v-bind="props"
            :to="{ name: 'contacts-create' }"
            target="_blank"
            class="ml-2"
          >
            <VIcon icon="tabler-plus" />
          </IconBtn>
        </template>
      </VTooltip>
    </template>
  </ItemUpdate>
</template>
