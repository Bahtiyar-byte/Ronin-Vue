<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import InvoiceAutoComplete from './InvoiceAutoComplete.vue'
import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'
import { useContacts } from '@/composables/useContacts'

import type Estimate from '@/types/estimates/Estimate'

import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import coreConfig from '@core/config'
import type User from '@/types/users/User'
import type Contact from '@/types/contacts/Contact'
import InvoiceSectionManageDialog from "@/views/apps/invoice/InvoiceSectionManageDialog.vue";

const emit = defineEmits<{
  (e: 'push', value: any): void
  (e: 'remove', id: number): void
}>()

const { user: currentUser } = storeToRefs(useCurrentUserStore())
const { autocomplete: autocompleteContacts, getById: getContactById } = useContacts()
const { autocomplete: autocompleteUsers, getById: getUserById } = useUsers()

const estimateData = defineModel<Estimate>('data', {
  default: {
    createdAt: new Date(),
    related_contact: null,
  },
})

const contactId = ref<string>()

const userId = ref<string>()
const selectedUser = ref<User>()

const route = useRoute() as RouteLocationNormalizedLoaded & { query: Partial<{ contact_id: string }> }

onMounted(async () => {
  if (route.query?.contact_id?.length) {
    const { data } = await getContactById(route.query.contact_id)

    watch(data, newVal => {
      if (newVal) {
        estimateData.value.related_contact = newVal
        contactId.value = data.value?.id
      }

      if (currentUser) {
        userId.value = currentUser.value?.id
        selectedUser.value = currentUser.value as User
      }
    })
  }
})

watch(userId, async newVal => {
  const { data } = await getUserById(newVal as string)

  watch(data, newUserVal => {
    selectedUser.value = newUserVal as User
  })
})

watch(contactId, async newVal => {
  const { data } = await getContactById(newVal as string)

  watch(data, newContactVal => {
    estimateData.value = {
      ...estimateData.value,
      related_contact: newContactVal as Contact,
    }
  })
})

const fetchAutocomplete = async (query: string, autocompleteFn: (query: string) => Promise<any>) => {
  const { data } = await autocompleteFn(query)
  if (data.value === null) {
    return
  }

  return data.value.map((item: any) => ({ value: item.id, title: item.label }))
}

// const invoice = ref(props.data.invoice)
// const salesperson = ref(props.data.salesperson)
// const thanksNote = ref(props.data.thanksNote)
// const note = ref(props.data.note)

const isDialogVisible = ref<boolean>(false)
const toggleAddSectionDialog = (val: boolean) => {
  isDialogVisible.value = val
}

// 👉 Remove Product edit section
// const removeProduct = (id: number) => {
//   emit('remove', id)
// }
</script>

<template>
  <VCard class="md:!p-6 !p-12">
    <!-- SECTION Header -->
    <div class="d-flex flex-wrap justify-space-between flex-column rounded bg-var-theme-background flex-sm-row gap-6 p-6 mb-6">
      <!-- 👉 Left Content -->
      <div>
        <div class="d-flex align-center app-logo mb-6">
          <!-- 👉 Logo -->
          <VNodeRenderer :nodes="themeConfig.app.logo" />

          <!-- 👉 Title -->
          <h6 class="app-logo-title">
            {{ coreConfig.company.name }}
          </h6>
        </div>

        <!-- 👉 Address -->
        <p
          v-for="(address, addressKey) in coreConfig.company.address.split('\n')"
          :key="`estimate-address-${addressKey}`"
          class="text-high-emphasis mb-0"
        >
          {{ address }}
        </p>

        <p class="font-semibold mt-4">
          Company representative:
        </p>
        <InvoiceAutoComplete
          v-model:value="userId"
          title="Search Users"
          :fetch-items="(query) => fetchAutocomplete(query, autocompleteUsers)"
        />
        <p v-if="selectedUser?.phoneNumber">
          Phone: <a :href="`tel:${selectedUser.phoneNumber}`">{{ selectedUser.phoneNumber }}</a>
        </p>
        <p v-if="selectedUser?.email">
          <a :href="`mailto:${selectedUser.email}`">{{ selectedUser.email }}</a>
        </p>
      </div>

      <!-- 👉 Right Content -->
      <div class="d-flex flex-column justify-center gap-2">
        <!-- 👉 Issue Date -->
        <div class="d-flex gap-x-4 align-start align-sm-center flex-column flex-sm-row">
          <span
            class="text-high-emphasis text-sm-end"
            style="inline-size: 5.625rem;"
          >Date Issued:</span>

          <span style="inline-size: 9.5rem;">
            <AppDateTimePicker
              v-model="estimateData.createdAt"
              placeholder="YYYY-MM-DD"
              :config="{ position: 'auto right' }"
            />
          </span>
        </div>
      </div>
    </div>
    <!-- !SECTION -->

    <VRow>
      <VCol class="text-no-wrap">
        <h6 class="font-medium text-body mb-4">
          Estimate To:
        </h6>
        <InvoiceAutoComplete
          v-model:value="contactId"
          label=""
          title="Update related contact"
          :fetch-items="(query) => fetchAutocomplete(query, autocompleteContacts)"
        />
        <p v-if="estimateData.related_contact?.name">
          {{ estimateData.related_contact.name }}
        </p>
        <p v-if="estimateData.related_contact?.phone">
          <a :href="`tel:${estimateData.related_contact.phone}`">
            {{ estimateData.related_contact.phone }}
          </a>
        </p>
        <p v-if="estimateData.related_contact?.address">
          {{ estimateData.related_contact.address }}
        </p>
        <p v-if="estimateData.related_contact?.email">
          <a :href="`mailto:${estimateData.related_contact.email}`">
            {{ estimateData.related_contact.email }}
          </a>
        </p>
      </VCol>

      <VCol />
    </VRow>

    <VDivider class="my-6 border-dashed border-gray-700 !opacity-60" />
    <!-- 👉 Add purchased products -->
    <div class="add-products-form">
<!--          <div -->
<!--            v-for="(product, index) in props.data.purchasedProducts" -->
<!--            :key="product.title" -->
<!--            class="mb-4" -->
<!--          > -->
    <!--        <InvoiceProductEdit -->
    <!--          :id="index" -->
    <!--          :data="product" -->
    <!--          @remove-product="removeProduct" -->
    <!--        /> -->
    <!--      </div> -->

      <VBtn
        size="small"
        prepend-icon="tabler-plus"
        @click="toggleAddSectionDialog(!isDialogVisible)"
      >
        Add section
      </VBtn>

      <InvoiceSectionManageDialog
        :dialog-visible="isDialogVisible"
        @update:dialog-visible="toggleAddSectionDialog"
      />
    </div>

    <VDivider class="my-6 border-dashed border-gray-700 !opacity-60" />

    <!-- 👉 Total Amount -->
    <!--    <div class="d-flex justify-space-between flex-wrap flex-column flex-sm-row"> -->
    <!--      <div class="mb-6 mb-sm-0"> -->
    <!--        <div class="d-flex align-center mb-4"> -->
    <!--          <h6 class="text-h6 me-2"> -->
    <!--            Salesperson: -->
    <!--          </h6> -->
    <!--          <AppTextField -->
    <!--            v-model="salesperson" -->
    <!--            style="inline-size: 8rem;" -->
    <!--            placeholder="John Doe" -->
    <!--          /> -->
    <!--        </div> -->

    <!--        <AppTextField -->
    <!--          v-model="thanksNote" -->
    <!--          placeholder="Thanks for your business" -->
    <!--        /> -->
    <!--      </div> -->

    <!--      <div> -->
    <!--        <table class="w-100"> -->
    <!--          <tbody> -->
    <!--            <tr> -->
    <!--              <td class="pe-16"> -->
    <!--                Subtotal: -->
    <!--              </td> -->
    <!--              <td :class="$vuetify.locale.isRtl ? 'text-start' : 'text-end'"> -->
    <!--                <h6 class="text-h6"> -->
    <!--                  $1800 -->
    <!--                </h6> -->
    <!--              </td> -->
    <!--            </tr> -->
    <!--            <tr> -->
    <!--              <td class="pe-16"> -->
    <!--                Discount: -->
    <!--              </td> -->
    <!--              <td :class="$vuetify.locale.isRtl ? 'text-start' : 'text-end'"> -->
    <!--                <h6 class="text-h6"> -->
    <!--                  $28 -->
    <!--                </h6> -->
    <!--              </td> -->
    <!--            </tr> -->
    <!--            <tr> -->
    <!--              <td class="pe-16"> -->
    <!--                Tax: -->
    <!--              </td> -->
    <!--              <td :class="$vuetify.locale.isRtl ? 'text-start' : 'text-end'"> -->
    <!--                <h6 class="text-h6"> -->
    <!--                  21% -->
    <!--                </h6> -->
    <!--              </td> -->
    <!--            </tr> -->
    <!--          </tbody> -->
    <!--        </table> -->

    <!--        <VDivider class="mt-4 mb-3" /> -->

    <!--        <table class="w-100"> -->
    <!--          <tbody> -->
    <!--            <tr> -->
    <!--              <td class="pe-16"> -->
    <!--                Total: -->
    <!--              </td> -->
    <!--              <td :class="$vuetify.locale.isRtl ? 'text-start' : 'text-end'"> -->
    <!--                <h6 class="text-h6"> -->
    <!--                  $1690 -->
    <!--                </h6> -->
    <!--              </td> -->
    <!--            </tr> -->
    <!--          </tbody> -->
    <!--        </table> -->
    <!--      </div> -->
    <!--    </div> -->

    <VDivider class="my-6 border-dashed border-gray-700 !opacity-60" />

    <div>
      <h6 class="text-h6 mb-2">
        Note:
      </h6>
      <VTextarea
        v-model="estimateData.description"
        placeholder="Write note here..."
        :rows="2"
      />
    </div>
  </VCard>
</template>
