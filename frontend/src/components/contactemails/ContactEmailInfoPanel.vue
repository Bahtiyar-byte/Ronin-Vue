<script setup lang="ts">
import type ContactEmail from '@/types/contactemails/ContactEmail'

const contactEmailData = defineModel<ContactEmail>('contactEmailData', { required: true })

const templateEditVisible = defineModel<boolean>('templateEditVisible', {
  default: true,
})
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="contactEmailData.email">
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
                  Email:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactEmailData.email }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Type:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactEmailData.type.toUpperCase() }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="templateEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'contactemails-update-id', params: { id: contactEmailData.id } }"
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
