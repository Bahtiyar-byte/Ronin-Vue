<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import type Contract from '@/types/contracts/Contract'
import coreConfig from '@core/config'

definePage({
  meta: {
    action: 'create',
    subject: 'contracts',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { query: { estimateId?: string }, params: { id?: string } }

const { getById: getEstimate } = useEstimates()
const estimateData = ref<Estimate>()

const contractData = ref<Partial<Contract>>({
  name: 'New contract',
  amount: 0,
})

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
})

const loading = ref<boolean>(false)
const { create: createContract, update: updateContract, getById: getContact } = useContracts()

onBeforeMount(async () => {
  if (route.params.id !== undefined) {
    const { data } = await getContact(route.params.id)

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
      <VCard
        class="md:!p-6 !p-12"
        :loading="loading"
      >
        <InvoiceHeader>
          <template #default>
            <InvoiceCompanyBrandingHeader class="mb-6" />

            <InvoiceCompanyAddress />
          </template>
        </InvoiceHeader>

        <VRow>
          <VCol>
            I/WE, the Owner(s) <b>{{ coreConfig.company.owner.name }}</b> of the premises <b>{{ coreConfig.company.owner.address }}</b> authorize Evans Roofing
            and Gutters, hereinafter referred to as “Contractor”, to furnish all materials and labor necessary to roof and/or improve these
            premises according to the following terms, specifications and provisions:
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <ContractsGeneralInformation v-model:estimate-data="estimateData" />

            <ContractsAdditionalConditions />

            <ContractsContractorNotification />
          </VCol>
        </VRow>
      </VCard>
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
