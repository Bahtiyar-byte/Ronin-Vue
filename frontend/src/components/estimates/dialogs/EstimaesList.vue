<script setup lang="ts">
import type { GetEstimatesRequest } from '@/types/estimates/GetEstimatesRequest'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true })
// const isSignedDialogVisible = defineModel<boolean>('isSignedDialogVisible', { required: true })
const isSignedDialogVisible = ref(false)
const searchParams = defineModel<GetEstimatesRequest>('searchParams', { default: {} })

const { getList } = useEstimates()

const { data: estimatesList } = await getList(searchParams.value)

const isVisibleSignedEstimate = ref(false)

const uploadsUrl = import.meta.env.VITE_API_BASE_UR_FILES
const signedEstimateUrl = ref('')

const handleSignedEstimate = async (item: any) => {
  isSignedDialogVisible.value = false
  isSignedDialogVisible.value = true
  signedEstimateUrl.value = `${uploadsUrl}${item.name}.pdf`
  console.log('signedEstimateUrl ', signedEstimateUrl.value)
}
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 750"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <VCard class="sm:!p-10 !p-2">
      <VCardText>
        <ActivityDialogHeader title="Related estimates" />
        <div
          v-for="(item, index) in estimatesList?.rows"
          :key="index">
          <div
            class="d-flex justify-between align-center gap-2">
            <RouterLink
              :to="{ name: 'estimates-builder-id', params: { id: item.id } }"
            >
              <div class="d-flex justify-space-between align-center py-4 gap-x-4">
                <div class="d-flex align-center gap-2">
                  <VIcon
                    icon="tabler-file-type-pdf"
                    :size="24"
                  />
                  <p class="font-semibold">
                    {{ item.name }}
                  </p>
                </div>
              </div>

            </RouterLink>
            <VBtn
              variant="text"
              color="success"
              :disabled="item.status !== 'Approved'"
              @click="handleSignedEstimate(item)"
            >
              {{ item.status }}
            </VBtn>
          </div>
          <VDivider
            v-if="index !== (estimatesList?.rows.length ?? 0) - 1"
            class="border-gray-300 !opacity-60"
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog
    :model-value="isSignedDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 850"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="isSignedDialogVisible = !isSignedDialogVisible" />

    <VCard class="sm:!p-10 !p-2">
      <VCardText>
        <ActivityDialogHeader title="Signed Estimate" />
        <embed v-if="isSignedDialogVisible" :src="signedEstimateUrl" width="750" height="375"
               type="application/pdf">
      </VCardText>
    </VCard>
  </VDialog>
</template>
