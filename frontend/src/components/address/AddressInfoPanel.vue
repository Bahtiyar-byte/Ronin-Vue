<script setup lang="ts">
import type Address from '@/types/Address'

const addressData = defineModel<Address>('addressData', { required: true })

const addressEditVisible = defineModel<boolean>('addressEditVisible', {
  default: true,
})
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="addressData.street">
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
                  Street:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.street }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Suit/Apartment/Unit:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.suite_apt_unit }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  City:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.city }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  State:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.state }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Zip Code:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.zip }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Country:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.country }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Location :
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.is_location ? 'Yes' : 'No' }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Email address :
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.is_mailing_address ? 'Yes' : 'No' }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Billing address :
                </span>
                <div class="d-inline-block text-body-1">
                  {{ addressData.is_billing_Address ? 'Yes' : 'No' }}
                </div>
              </VListItemTitle>
            </VListItem>

          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="addressEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'addresses-update-id', params: { id: addressData.id } }"
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
