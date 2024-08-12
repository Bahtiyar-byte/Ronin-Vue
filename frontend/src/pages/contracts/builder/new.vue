<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type Estimate from '@/types/estimates/Estimate'
import type Contract from '@/types/contracts/Contract'
import coreConfig from '@core/config'

definePage({
  meta: {
    action: 'create',
    subject: 'invoices',
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { query: { estimateId?: string } }

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

const handleSave = async (redirect?: boolean) => {
  console.log(redirect, contractData.value)
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
            <ul class="list-upper-latin ml-4 space-y-4">
              <li>
                <p>Description of the work and the materials to be used:</p>

                <ContractBuilderSectionsInfo
                  :sections="estimateData?.estimate_sections_related_estimate"
                  class="my-3"
                />

                <p class="font-semibold">
                  Zero deposit required. Full payment due upon completion.
                </p>

                <p class="font-semibold">
                  *Any permit fees to be paid by homeowner*
                </p>
              </li>

              <li>
                <p>
                  Payment: Contractor proposes to perform the above work, (subject to any additions and/or deductions pursuant to authorized change orders)
                  , for the
                  Total Sum of:
                  <span
                    v-if="estimateData?.total_price"
                    class="font-semibold"
                  >
                    {{ formatPrice(Number(estimateData.total_price)) }}
                  </span>
                </p>

                <p class="mt-5">
                  PAYMENT DUE WHEN AMOUNT: Total sum due upon completion of work.
                </p>
                <p class="mt-1">
                  Down Payment (if any) $
                  <input
                    type="number"
                    step="0.01"
                    class="border-b -ml-1"
                    min="0"
                  >
                </p>
              </li>
              <li class="flex gap-3">
                <span>
                  Estimated Job Start Date:
                  <input
                    type="text"
                    class="border-b"
                  />
                </span>
                <span>
                  Estimated Date of Completion:
                  <input
                    type="text"
                    class="border-b"
                  />
                </span>
              </li>
              <li>
                <p>
                  Owner’s signature below signifies acceptance of all terms and conditions of this Agreement, including all terms on the reverse side
                  hereof. Owner understands that there are no oral agreements or understandings between the parties of this Agreement. The written
                  terms, provisions, plans (if any) and specifications set forth in this Agreement is the entire agreement between the parties. Changes
                  in this Agreement shall be done by written change order only and with the express approval of both parties. Changes may incur
                  additional charges.
                </p>

                <p class="mt-6 uppercase font-bold">
                  Right of Cancellation Pursuant to Federal Regulation and Penn. Stat. § 201-7:
                  You, the buyer, may cancel this transaction at any time prior to midnight of the third business
                  day after the date of this transaction. See attached notice of cancellation form for an explanation of this right.
                </p>

                <p class="flex items-center gap-3 mt-3">
                  <span class="flex items-center gap-1.5">
                    Customer:
                    <AppSignatureField class="w-36" />
                  </span>

                  <span class="flex items-center gap-1.5">
                    Date:
                    <AppDateTimePicker class="w-28" />
                  </span>
                </p>
              </li>
            </ul>
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
