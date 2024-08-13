<script setup lang="ts">
import type Estimate from '@/types/estimates/Estimate'

const estimateData = defineModel<Estimate>('estimateData')
</script>

<template>
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
                    {{ formatPrice(Number(estimateData?.total_price)) }}
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

      <ContractsSignatureFields />
    </li>
  </ul>
</template>
