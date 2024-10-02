<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useAddress } from '@/composables/useAddress'
import type Address from '@/types/address/Address'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsAddress } from '@/utils/initial_data/initialFieldsAddress'
import type FormField from '@/types/forms/FormField'
import ItemUpdate from '@/components/common/CRUD/ItemUpdate.vue'

const { create: createAddress, getById: getAddressById, update: updateAddress } = useAddress()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Address')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Addresses', to: { name: 'addresses' } },
  { title: 'New address', disabled: true },
])

const { formFields, initializeFields } = useFormFields('address')
const addressRef = ref<Address>()
const dataLoaded = ref(false)

const fetchAddressData = async (id: string) => {
  const { data } = await getAddressById(id)

  watch(data, (address: Address | null) => {
    if (address === null) {
      return
    }

    addressRef.value = address
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(address, subField.name)) {
            if (subField.type === 'checkbox') {
              subField.value = address[subField.name] ? 'true' : 'false'
            } else {
              subField.value = address[subField.name]
            }
          }
        })
      } else if (hasKey(address, field.name)) {
        field.value = address[field.name]
      }
    })
    pageTitle.value = `Update ${address.street}`
    breadcrumbs.value[2] = { title: `Update ${address.street}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsAddress)

  const addressId = route.params.id as string
  if (addressId) {
    isUpdateMode.value = true
    await fetchAddressData(addressId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && addressRef.value ? `Edit ${addressRef.value.street}` : 'Create new address')),
})

const submitForm = async (values: Record<string, any>) => {
  const addressData = { ...addressRef.value, ...values } as Address
  const action = addressData.id ? updateAddress : createAddress
  const { data } = await action(addressData)

  watch(data, newVal => {
    router.push({ name: 'addresses-details-id', params: { id: newVal?.id as string } })
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
