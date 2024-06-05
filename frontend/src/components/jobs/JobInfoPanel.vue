<script setup lang="ts">
import type Job from '@/types/jobs/Job'
import { useFilters } from '@/composables/useFilters'
import { useJobs } from '@/composables/useJobs'
import EditEnumField from '@/components/common/CRUD/EditEnumField.vue'

const props = defineProps<{
  jobData: Job
}>()

const contactEditVisible = defineModel<boolean>('jobEditVisible', {
  default: true,
})

const { getVariants } = useFilters()
const { update } = useJobs()
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="jobData.name">
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
                  {{ jobData.name }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.address">
              <VListItemTitle>
                <span class="font-medium">
                  Address:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ jobData.address }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Type:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ jobData.type }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle class="flex items-center gap-1">
                <span class="font-medium">
                  Status:
                </span>
                <EditEnumField
                  :value="jobData.status as string"
                  title="Update job status"
                  :fetch-items="async () => {
                    const { data } = await getVariants('jobs', 'status')

                    return data.value
                  }"
                  :on-save="async () => {
                    const { isFetching } = await update(jobData)

                    return isFetching
                  }"
                  class="d-inline-block text-body-1 text-capitalize"
                />
              </VListItemTitle>
            </VListItem>
          </VList>

          <h5 class="text-[1.05rem] leading-[1.5] font-medium mt-6">
            Related
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Contact:
                </span>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Assigned to:
                </span>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="contactEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'jobs-update-id', params: { id: jobData.id } }"
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
