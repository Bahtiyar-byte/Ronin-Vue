<script setup lang="ts">
import type Job from '@/types/jobs/Job'

const jobData = defineModel<Job>('jobData', { required: true })

const contactEditVisible = defineModel<boolean>('jobEditVisible', {
  default: true,
})

const { update } = useJobs()
const { autocomplete: autocompleteUsers } = useUsers()

const saveItem = async (type: string, newValue: string) => {
  const updatedData = {
    ...prepareEntityToUpdate(jobData.value),
    [type]: newValue,
  }

  const { data, isFetching } = await update(updatedData as Job)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    jobData.value = newVal
  })

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
                <div class="d-inline text-body-1">
                  {{ jobData.address }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.category">
              <VListItemTitle>
                <span class="font-medium">
                  Category:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ jobData.category }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.type">
              <VListItemTitle>
                <span class="font-medium">
                  Type:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ jobData.type }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.status">
              <VListItemTitle>
                <span class="font-medium">
                  Status:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ jobData.status }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.start_date">
              <VListItemTitle>
                <span class="font-medium">
                  Start date:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ formatDateTime('m-d-Y', stringToDate(jobData.start_date)) }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.end_date">
              <VListItemTitle>
                <span class="font-medium">
                  End date:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ formatDateTime('m-d-Y', stringToDate(jobData.end_date)) }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="jobData.description?.length">
              <VListItemTitle>
                <span class="font-medium">
                  Description:
                </span>
                <div class="text-body-1 whitespace-pre-wrap">
                  {{ jobData.description }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>

          <h5 class="text-[1.05rem] leading-[1.5] font-medium mt-6">
            Related
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <VList class="card-list mt-2">
            <VListItem v-if="jobData.related_contact">
              <VListItemTitle>
                <span class="font-medium">
                  Related contact:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ jobData.related_contact.name }}
                </div>
              </VListItemTitle>
            </VListItem>

            <EditableInfoItem
              label="Assigned to"
              type="autocomplete"
              :value="jobData.assigned_toId as string"
              title="Update job assigned user"
              :fetch-autocomplete-items="(query: string) => fetchAutocomplete(query, autocompleteUsers)"
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
