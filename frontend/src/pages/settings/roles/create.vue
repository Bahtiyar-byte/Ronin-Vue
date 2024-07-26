<script lang="ts" setup>
import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useTrades } from '@/composables/useTrades'
import type Trade from '@/types/trades/Trade'
import type FormField from '@/types/forms/FormField'
import { useFormFields } from '@/utils/forms/useFormFields'
import { initialFieldsTrades } from '@/utils/initial_data/initialFieldsTrades'
import ItemUpdate from "@/components/common/CRUD/ItemUpdate.vue";

const { create: createTrade, getById: getTradeById, update: updateTrade } = useTrades()
const router = useRouter()
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const isUpdateMode = ref(false)
const pageTitle = ref('Create Trade')

const breadcrumbs = ref([
  { title: 'Home', to: { name: 'root' } },
  { title: 'Roles', to: { name: 'tools-trades' } },
  { title: 'New role', disabled: true },
])

const { formFields, initializeFields } = useFormFields('trades')
const tradeRef = ref<Trade>()
const dataLoaded = ref(false)

const fetchTradeData = async (id: string) => {
  const { data } = await getTradeById(id)

  watch(data, (trade: Trade | null) => {
    if (trade === null) {
      return
    }

    tradeRef.value = trade
    formFields.value.forEach(field => {
      if ('fields' in field) {
        field.fields.forEach(subField => {
          if (hasKey(trade, subField.name)) {
            subField.value = trade[subField.name]
          }
        })
      } else if (hasKey(trade, field.name)) {
        field.value = trade[field.name]
      }
    })
    pageTitle.value = `Update ${trade.name}`
    breadcrumbs.value[2] = { title: `Update ${trade.name}`, disabled: true }
  })
}

onBeforeMount(async () => {
  await initializeFields(initialFieldsTrades)

  const tradeId = route.params.id as string
  if (tradeId) {
    isUpdateMode.value = true
    await fetchTradeData(tradeId)
  }
  dataLoaded.value = true
})

useHead({
  title: computed(() => (isUpdateMode.value && tradeRef.value ? `Edit ${tradeRef.value.name}` : 'Create new trade')),
})

const submitForm = async (values: Record<string, any>) => {
  const tradeData = { ...tradeRef.value, ...values } as Trade
  const action = tradeData.id ? updateTrade : createTrade
  const { data } = await action(tradeData)

  watch(data, newVal => {
    router.push({ name: 'tools-trades-details-id', params: { id: newVal?.id as string } })
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
