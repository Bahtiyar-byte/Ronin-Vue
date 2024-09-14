<script setup lang="ts">
import coreConfig from '@core/config'
import type Estimate from '@/types/estimates/Estimate'

const loading = defineModel<boolean>('loading')
const estimateData = defineModel<Estimate>('estimateData', { required: true })

// const contractData = defineModel<Contract>('contractData', { required: true })
</script>

<template>
  <VCard
    class="md:!p-6 !p-12 print:!p-0 print:!shadow-none"
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
