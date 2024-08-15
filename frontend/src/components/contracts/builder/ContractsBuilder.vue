<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import type Contract from '@/types/contracts/Contract'

const route = useRoute() as RouteLocationNormalizedLoaded & { query: { estimateId?: string }; params: { id?: string } }

const { getById: getEstimate } = useEstimates()
const estimateData = ref<Partial<Estimate>>({})

const contractData = ref<Partial<Contract>>({
  name: 'New contract',
  amount: 0,
})

const loading = ref<boolean>(false)
const { create: createContract, update: updateContract, getById: getContract } = useContracts()

onBeforeMount(async () => {
  if (route.query.estimateId) {
    const { data } = await getEstimate(route.query.estimateId)

    watch(data, newVal => {
      estimateData.value = newVal as Estimate

      if (estimateData.value.related_contact
        && estimateData.value.related_contactId
      ) {
        contractData.value = {
          ...contractData.value,
          related_contact: estimateData.value.related_contact,
          related_contactId: estimateData.value.related_contactId,
        }
      }
    })
  }

  if (route.params.id !== undefined) {
    const { data } = await getContract(route.params.id)

    watch(data, newVal => {
      contractData.value = newVal as Contract
    })
  }
})

const router = useRouter()
const contractId = ref<string | undefined>(route.params.id)

const redirectToPreview = async () => {
  await router.push({
    name: 'contracts-builder-id',
    params: {
      id: contractId.value as string,
    },
  })
}

const handleSave = async (redirect?: boolean) => {
  const processRedirect = redirect ?? false

  const action = contractData.value.id ? updateContract : createContract

  const { data } = await action({
    ...prepareEntityToUpdate(contractData.value) as Contract,
  })

  watch(data, async (newVal: Contract | null) => {
    if (newVal === null) {
      return
    }

    contractData.value = newVal
    contractId.value = newVal.id

    if (processRedirect) {
      await redirectToPreview()
    }
  })
}

const handlePreview = async () => {
  await handleSave(true)
}
</script>

<template>
  <InvoiceBuilderLayout>
    <template #leftColumn>
      <ContractEditable
        v-model:contract-data="contractData as Contract"
        v-model:estimate-data="estimateData as Estimate"
        v-model:loading="loading"
      />
    </template>

    <template #rightColumn>
      <VCard :loading="loading">
        <VCardText class="space-y-3">
          <VBtn
            block
            variant="tonal"
            color="secondary"
            @click="() => handleSave()"
          >
            Save
          </VBtn>

          <VBtn
            block
            @click="handlePreview"
          >
            Preview
          </VBtn>
        </VCardText>
      </VCard>

      <VCard>
        <VCardText class="space-y-3">
          <AppTextField
            v-model="contractData.name"
            label="Contract name"
            aria-required="true"
          />
        </VCardText>
      </VCard>
    </template>
  </InvoiceBuilderLayout>
</template>
