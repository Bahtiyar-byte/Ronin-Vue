<script setup lang="ts">
import { toRaw } from 'vue'
import type Job from '@/types/jobs/Job'
import { useFilters } from '@/composables/useFilters'
import { useJobs } from '@/composables/useJobs'

const props = defineProps<{
  jobData: Job
}>()

const contactEditVisible = defineModel<boolean>('jobEditVisible', {
  default: true,
})

const { getVariants } = useFilters()
const { update } = useJobs()

const fetchEnumItems = async (type: string) => {
  const { data } = await getVariants('jobs', type)

  return data.value
}

const saveItem = async (type: string, newValue: string) => {
  const updatedData = {
    ...prepareEntityToUpdate(toRaw(props.jobData)),
    [type]: newValue,
  }

  const { isFetching } = await update(updatedData)

  return isFetching
}
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

            <EditableInfoItem
              label="Category"
              :value="jobData.category as string"
              title="Update job category"
              :fetch-items="() => fetchEnumItems('category')"
              :on-save="(newValue: string) => saveItem('category', newValue)"
            />

            <EditableInfoItem
              label="Type"
              :value="jobData.type as string"
              title="Update job type"
              :fetch-items="() => fetchEnumItems('type')"
              :on-save="(newValue: string) => saveItem('type', newValue)"
            />

            <EditableInfoItem
              label="Status"
              :value="jobData.status as string"
              title="Update job status"
              :fetch-items="() => fetchEnumItems('status')"
              :on-save="(newValue: string) => saveItem('status', newValue)"
            />
          </VList>

          <h5 class="text-[1.05rem] leading-[1.5] font-medium mt-6">
            Related
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <VList class="card-list mt-2">
            <EditableInfoItem
              label="Related contact"
              type="autocomplete"
              :value="jobData.related_contactId as string"
              title="Update job related contact"
              :fetch-items="() => fetchEnumItems('status')"
              :on-save="(newValue: string) => saveItem('related_contact', newValue)"
            />

            <EditableInfoItem
              label="Assigned to"
              type="autocomplete"
              :value="jobData.assigned_toId as string"
              title="Update job assigned user"
              :fetch-items="() => fetchEnumItems('status')"
              :on-save="(newValue: string) => saveItem('assigned_to', newValue)"
            />
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
