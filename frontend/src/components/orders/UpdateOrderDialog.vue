<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useOrders } from '@/composables/useOrders'
import { hasKey } from '@core/utils/helpers'
import type Order from '@/types/orders/Order'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsUpdateOrders } from '@/utils/initial_data/initialFieldsUpdateOrders'
import type FormField from '@/types/forms/FormField'

const { create: createOrder, getById: getOrderById, update: updateOrder } = useOrders()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(true)
const pageTitle = ref('Create Order')
const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
const orderId = defineModel<string>('orderId', { required: true })

const isUpdateForm = ref(true)
const materialDescription = ref('')
const quantity = ref('')
const unit = ref<''>()

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Order', to: { name: 'jobs' } },
  { title: 'New Order', disabled: true },
])

const { formFields, initializeFields } = useFormFields('orders')
const orderRef = ref<Order>()
const dataLoaded = ref(false)

const fetchOrderData = async (id: string) => {
  const { data } = await getOrderById(id)

  watch(data, (order: Order | null) => {
    if (order === null) {
      return
    }
    materialDescription.value = order.material_description
    quantity.value = order.quantity
    unit.value = order.unit
    orderRef.value = order
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(order, subField.name)) {
            if (typeof order[subField.name] === 'object') {
              subField.value = order[subField.name].id
            } else {
              subField.value = order[subField.name]
            }
          }
        })
      } else if (hasKey(order, field.name)) {
        field.value = order[field.name]
      }
    })
    pageTitle.value = `Update ${order.order_name}`
    breadcrumbs.value[2] = { title: `Update ${order.order_name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsUpdateOrders())
  let currentOrderId = ''
  if (!orderId){
    currentOrderId = route.params.id as string
    console.log('current order ')
  } else {
    console.log('update order')
    currentOrderId = orderId.value
  }

  if (currentOrderId) {
    isUpdateMode.value = true

    await fetchOrderData(currentOrderId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && orderRef.value ? `Edit ${orderRef.value.order_name}` : 'Update Order')),
})

const submitForm = async (values: Record<string, any>) => {
  const orderData = prepareEntityToUpdate({ ...orderRef.value, ...values }) as Order

  orderData.related_job = route.params.id as string
  orderData.material_description = materialDescription.value
  orderData.quantity = quantity.value
  orderData.unit = unit.value

  const action = updateOrder

  const { data } = await action(orderData)

  watch(data, newVal => {
    if (newVal.id) {
      isDialogVisible.value = false
    }
  })
}

const isVisibleMaterial = ref(false)

watch(isVisibleMaterial, newVal => {
})
</script>

<template>
  <VCard>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 750"
  >
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />
    <ItemUpdate
      v-if="dataLoaded"
      v-model:isVisibleMaterial="isVisibleMaterial"
      v-model:materialDescription="materialDescription"
      v-model:quantity="quantity"
      v-model:unit="unit"
      v-model:isUpdateForm="isUpdateForm"
      title=""
      :breadcrumbs="[]"
      :fields="formFields as FormField[]"
      :submit-handler="submitForm"
      :is-update-mode="isUpdateMode"

    >
      <template #append_related_contactId>
        <VTooltip text="Add new order">
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
  </VDialog>
  </VCard>
</template>
