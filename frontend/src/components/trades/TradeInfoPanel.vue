<script setup lang="ts">
import type Trade from '@/types/trades/Trade'
// import { useFilters } from '@/composables/useFilters'
import { useTrades } from '@/composables/useTrades'

const { update } = useTrades()

const tradeData = defineModel<Trade>('tradeData', { required: true })

const tradeEditVisible = defineModel<boolean>('tradeEditVisible', {
  default: true,
})


const saveItem = async (type: string, newValue: string) => {
  const updatedData = {
    ...prepareEntityToUpdate(tradeData.value),
    [type]: newValue,
  } as Trade

  const { data, isFetching } = await update(updatedData)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    tradeData.value = newVal
  })

  return isFetching
}

</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="tradeData.name">
        <VCardText>
          <!-- 👉 Details -->
          <h5 class="text-[1.05rem] leading-[1.5] font-medium">
            Details
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Name:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ tradeData.name }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="tradeEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'trades-update-id', params: { id: tradeData.id } }"
            variant="elevated"
            class="w-full"
          >
            Edit
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
