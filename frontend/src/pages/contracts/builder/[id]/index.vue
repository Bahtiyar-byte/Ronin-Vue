<script setup lang="ts">
import html2pdf from 'html2pdf.js'

import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Contract from '@/types/contracts/Contract'
import type Estimate from '@/types/estimates/Estimate'

definePage({
  meta: {
    action: 'read',
    subject: 'contracts',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const loading = ref<boolean>(false)
const contractData = ref<Partial<Contract>>({})
const estimateData = ref<Partial<Estimate>>({})

const { getById: getContract } = useContracts()

onBeforeMount(async () => {
  const { data, isFetching } = await getContract(route.params.id)

  watch(isFetching, newVal => {
    loading.value = newVal
  }, { immediate: true })

  watch(data, newVal => {
    contractData.value = newVal as Contract
  })
})

const generatePdf = () => {
  const element = document.getElementById('contract-editable')

  return html2pdf().from(element)
}

const handleDownload = () => {
  generatePdf().save('contract.pdf')
}

const handlePrint = () => {
  window.print()
}

const isSendContractSidebarVisible = ref<boolean>(false)

const handleSending = async (data: {
  emailTo: string
  subject: string
  message: string
}) => {
  loading.value = true

  console.log(data)

  setTimeout(() => {
    loading.value = false
  }, 400)
}
</script>

<template>
  <div>
    <InvoiceBuilderLayout right-panel-class="print:!hidden">
      <template #leftColumn>
        <ContractEditable
          id="contract-editable"
          v-model:loading="loading"
          v-model:contract-data="contractData as Contract"
          v-model:estimate-data="estimateData as Estimate"
        />
      </template>

      <template #rightColumn>
        <ContractDetailsRightPanel
          v-model:contract="contractData as Contract"
          v-model:loading="loading"
          v-model:is-send-contract-sidebar-visible="isSendContractSidebarVisible"
          :handle-download="handleDownload"
          :handle-print="handlePrint"
          :route="route"
        />
      </template>
    </InvoiceBuilderLayout>

    <SendContractDrawer
      v-if="contractData.id !== undefined"
      v-model:drawer-opened="isSendContractSidebarVisible"
      v-model:contract="contractData"
      @submit="handleSending"
    />
  </div>
</template>
