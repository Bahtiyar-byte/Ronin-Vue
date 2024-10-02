<script setup lang="ts">
import type Crew from '@/types/crews/Crew'

const crewData = defineModel<Crew>('crewData', { required: true })

const crewEditVisible = defineModel<boolean>('crewEditVisible', {
  default: true,
})
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="crewData.name">
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
                  {{ crewData.name }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>

          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Members:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ crewData.users.map(user => user.firstName).join(' ') }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>

          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Color:
                </span>
                <div class="d-inline-block text-body-1">
                  <div :style="{ width: '40px', height: '20px', background: crewData.color ? crewData.color : '#8BC541' }"></div>
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>

        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="crewEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'crews-update-id', params: { id: crewData.id } }"
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
