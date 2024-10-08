<script setup lang="ts">
import type Contact from '@/types/contacts/Contact'

const contactData = defineModel<Contact>('contactData', { required: true })

const contactEditVisible = defineModel<boolean>('contactEditVisible', {
  default: true,
})

const { assignContact, getById } = useContacts()
const { autocomplete: autocompleteUsers } = useUsers()

/**
 * Get the latest data for the contact and update the component.
 */
const getLastUpdatedData = async (contact_id:string) => {
  const { data, isFetching } = await getById(contact_id)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    contactData.value = newVal
  })
}

const saveItem = async (type: string, newValue: string) => {
  const updatedData = {
    ...prepareEntityToUpdate(contactData.value),
    [type]: newValue,
  } as Contact

  const { data, isFetching } = await assignContact(updatedData)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }
    getLastUpdatedData(newVal.id)
    contactData.value = newVal
  })

  return isFetching
}

const items = ref<{ title: string; value: string }[]>()

onBeforeMount(async () => {
  items.value = (await autocompleteUsers(''))?.data.value?.map(item => ({
    title: item.label,
    value: item.id,
  }))
})
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard >
        <VCardText>
          <!-- 👉 Details -->
          <h5 class="text-[1.05rem] leading-[1.5] font-medium">
            Details
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem style="padding: 0 0 10px 0 !important;">
              <VListItemTitle>
                <span class="font-medium">
                  Name:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactData.firstName }} {{ contactData.lastName }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem style="padding: 0 0 10px 0 !important;">
              <span class="font-medium">
                Email:
              </span>
              <VListItemTitle>
                <a
                  v-for="(singleEmail, index) in contactData.related_emails"
                  :key="index"
                  :href="`mailto:${singleEmail.email}`"
                  class="text-primary"
                  v-show="singleEmail?.is_primary"
                >
                  {{ singleEmail.email }}
                  <br>
                </a>
              </VListItemTitle>
            </VListItem>

            <VListItem style="padding: 0 0 10px 0 !important;">
              <span class="font-medium">
                Phone:
              </span>
              <VListItemTitle >
                <a
                  v-for="(singlePhone, index) in contactData.related_phones"
                  :key="index"
                  :href="`tel:${singlePhone.phone_number}`"
                  class="text-primary"
                  v-show="singlePhone?.is_primary"
                >

                  {{ singlePhone.phone_number }}
                  <br>
                </a>
              </VListItemTitle>
            </VListItem>

            <VListItem style="padding: 0 0 10px 0 !important;" v-if="contactData.address_related_contact?.length">
              <span class="font-medium">
                Address:
              </span>
              <VListItemTitle>
                <div class="d-inline-block text-body-1">
                  <span
                    v-for="(singleAddress, index) in contactData.address_related_contact"
                    :key="index"
                    class="break-words"
                    v-show="singleAddress.is_mailing_address"
                  >
                    {{ `${singleAddress.suite_apt_unit} ${singleAddress.street} ${singleAddress.city} ${singleAddress.state}, ${singleAddress.zip}` }}
                    <br>
                  </span>
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem style="padding: 0 0 10px 0 !important;">
              <VListItemTitle>
                <span class="font-medium">
                  Status:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactData.status }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem style="padding: 0 0 10px 0 !important;" v-if="contactData.source?.length">
              <VListItemTitle>
                <span class="font-medium">
                  Source:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactData.source }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem style="padding: 0 0 10px 0 !important;" v-if="contactData.source?.length">
              <VListItemTitle>
                <span class="font-medium">
                  Assigned To:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ contactData.assigned_to
                    ? `${contactData.assigned_to.firstName || ''} ${contactData.assigned_to.lastName || ''}`.trim()
                    : 'Unassigned' }}
                </div>
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
            <VList
              :items="items"
              @update:selected="(e: unknown[]) => {
                // ToDo: there is no currently assigned_to field in contact entity
                saveItem('assigned_to', e[0] as string)
              }"
            />
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
