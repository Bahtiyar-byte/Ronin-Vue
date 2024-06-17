<script setup lang="ts">
import type Contact from '@/types/contacts/Contact'
import { useFilters } from '@/composables/useFilters'
import { useContacts } from '@/composables/useContacts'

const { getVariants } = useFilters()
const { update } = useContacts()

const contactData = defineModel<Contact>('contactData', { required: true })

const contactEditVisible = defineModel<boolean>('contactEditVisible', {
  default: true,
})

const fetchEnumItems = async (type: string) => {
  const { data } = await getVariants('contacts', type)

  return data.value
}

const saveItem = async (type: string, newValue: string) => {
  const updatedData = {
    ...prepareEntityToUpdate(contactData.value),
    [type]: newValue,
  } as Contact

  const { data, isFetching } = await update(updatedData)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    contactData.value = newVal
  })

  return isFetching
}
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

            <EditableInfoItem
              label="Stage"
              :value="contactData.status"
              title="Update contact status"
              :fetch-items="() => fetchEnumItems('status')"
              :on-save="(newValue: string) => saveItem('status', newValue)"
            />
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="contactEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'contacts-update-id', params: { id: contactData.id } }"
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
