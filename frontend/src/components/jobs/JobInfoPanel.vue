<script setup lang="ts">
import type Job from '@/types/jobs/Job'

const props = defineProps<{
  jobData: Job
}>()

const contactEditVisible = defineModel<boolean>('jobEditVisible', {
  default: true,
})

console.log(props.jobData)
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
              <VListItemTitle>
                <span class="font-medium">
                  Status:
                </span>
                <div class="d-inline-block text-body-1 text-capitalize">
                  {{ jobData.status }}
                </div>
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
