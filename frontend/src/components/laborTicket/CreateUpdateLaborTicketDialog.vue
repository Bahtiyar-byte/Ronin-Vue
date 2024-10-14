<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useLaborTickets } from '@/composables/useLaborTickets'
import { hasKey } from '@core/utils/helpers'
import type LaborTicket from '@/types/laborTickets/LaborTicket'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsLaborTicket } from '@/utils/initial_data/initialFieldsLaborTicket'
import type FormField from '@/types/forms/FormField'

const { create: createLaborTicket, getById: getLaborTicketById, update: updateLaborTicket } = useLaborTickets()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Order')
const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const laborTicketId = defineModel<boolean>('laborTicketId', { required: false })
const isUpdateForm = defineModel<boolean>('isUpdateForm', { required: true })
const orderId = defineModel<boolean>('orderId', { required: false })
const materialDescription = ref('')
const quantity = ref('')
const unit = ref<''>()

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Order', to: { name: 'jobs' } },
  { title: 'New Order', disabled: true },
])

const { formFields, initializeFields } = useFormFields('laborTickets')
const laborTicketRef = ref<LaborTicket>()
const dataLoaded = ref(false)

const fetchOrderData = async (id: string) => {
  const { data } = await getLaborTicketById(id)

  watch(data, (laborTicket: LaborTicket | null) => {
    if (laborTicket === null) {
      return
    }

    laborTicketRef.value = laborTicket
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(laborTicket, subField.name)) {
            if (typeof laborTicket[subField.name] === 'object') {
              if (subField.name === 'assigned_crew') {
                const ids = laborTicket[subField.name].map(crew => crew.id)
                if (ids.length > 0) {
                  subField.value = ids[0]
                }
              } else {
                subField.value = laborTicket[subField.name].id
              }
            } else {
              subField.value = laborTicket[subField.name]
            }
          }
        })
      } else if (hasKey(laborTicket, field.name)) {
        field.value = laborTicket[field.name]
      }
    })
    pageTitle.value = `Update ${laborTicket.name}`
    breadcrumbs.value[2] = { title: `Update ${laborTicket.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsLaborTicket())

  if (laborTicketId.value) {
    // isUpdateMode.value = false

    await fetchOrderData(laborTicketId.value)
  }
  dataLoaded.value = true
})

const submitForm = async (values: Record<string, any>) => {
  const laborTicketData = prepareEntityToUpdate({ ...laborTicketRef.value, ...values }) as LaborTicket

  const action = isUpdateForm.value ? updateLaborTicket : createLaborTicket

  const { data } = await action(laborTicketData)

  watch(data, newVal => {
    if (newVal.id) {
      isDialogVisible.value = false
    }
  })
}
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 750"
  >
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />
    <VCard>
      <ItemUpdate
        v-if="dataLoaded"
        title=""
        :breadcrumbs="[]"
        :fields="formFields as FormField[]"
        :submit-handler="submitForm"
        :is-update-mode="isUpdateForm"
      >
        <template #append_related_contactId>
          <VTooltip text="Add new labor ticket">
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
    </VCard>
  </VDialog>
</template>
