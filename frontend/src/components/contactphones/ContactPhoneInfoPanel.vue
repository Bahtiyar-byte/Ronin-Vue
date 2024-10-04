<script setup lang="ts">
import type ContactPhone from '@/types/contactphones/ContactPhone'

const contactPhoneData = defineModel<ContactPhone>('contactPhoneData', { required: true })

const contactPhoneEditVisible = defineModel<boolean>('contactPhoneEditVisible', {
  default: true,
})
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="contactPhoneData.phone_number">
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
                  Phone Number:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactPhoneData.phone_number }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Type:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactPhoneData.type.toUpperCase() }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Primary:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactPhoneData.is_primary ? 'Yes' : 'No' }}
                </div>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="contactPhoneEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'contactphones-update-id', params: { id: contactPhoneData.id } }"
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
