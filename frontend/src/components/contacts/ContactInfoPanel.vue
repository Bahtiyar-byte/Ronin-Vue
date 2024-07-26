<script setup lang="ts">
import type Contact from '@/types/contacts/Contact'

const contactData = defineModel<Contact>('contactData', { required: true })

const contactEditVisible = defineModel<boolean>('contactEditVisible', {
  default: true,
})

const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="contactData.name">
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
                  {{ contactData.name }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Email:
                </span>
                <a
                  :href="`mailto:${contactData.email}`"
                  class="text-primary"
                >
                  {{ contactData.email }}
                </a>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Phone:
                </span>
                <a
                  :href="`tel:${contactData.phone}`"
                  class="text-primary"
                >
                  {{ contactData.phone }}
                </a>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Status:
                </span>
                <a
                  :href="`tel:${contactData.status}`"
                  class="text-primary"
                >
                  {{ contactData.status }}
                </a>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="contactEditVisible && $can('update', 'contacts')"
          class="d-flex justify-center gap-x-4"
        >
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                class="w-1/2"
                v-bind="menuProps"
              >
                Assign
              </VBtn>
            </template>
            <VList :items="items" />
          </VMenu>

          <VBtn
            :to="{ name: 'contacts-update-id', params: { id: contactData.id } }"
            variant="elevated"
            class="w-1/2"
          >
            Edit
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
