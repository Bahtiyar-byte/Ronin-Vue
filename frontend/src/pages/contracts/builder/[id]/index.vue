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

const { getById: getContract, send } = useContracts()

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

const snackbars = reactive({
  emailSent: false,
  emailError: false,
})

const handleSending = async (data: {
  emailTo: string
  subject: string
  message: string
}) => {
  loading.value = true

  const opt = {
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  }

  generatePdf().set(opt).toContainer().toCanvas().toImg().outputPdf('blob').then(async (blob: Blob) => {
    const { data: sendingResult, isFetching } = await send(prepareEntityToUpdate(contractData.value), {
      ...data,
      attachments: [blob],
    })

    watch(isFetching, newVal => {
      loading.value = newVal
    })

    watch(sendingResult, newVal => {
      if (newVal?.sent === true) {
        snackbars.emailSent = true
      } else if (newVal?.sent === false) {
        snackbars.emailError = true
      }
    })
  })
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

    <VSnackbar
      v-model="snackbars.emailSent"
      :timeout="3500"
    >
      Contract sent successfully
    </VSnackbar>

    <VSnackbar
      v-model="snackbars.emailError"
      color="error"
      :timeout="3500"
    >
      Contract was not sent. Some error occurred.
    </VSnackbar>
  </div>
</template>
