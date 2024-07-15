<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

import DebouncedAutoComplete from '@/components/common/DebouncedAutoComplete.vue'

import type User from '@/types/users/User'
import type Contact from '@/types/contacts/Contact'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'
import type EstimateSection from '@/types/estimateSections/EstimateSection'
import type Estimate from '@/types/estimates/Estimate'

import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'
import { useContacts } from '@/composables/useContacts'
import { useEstimateSectionTemplates } from '@/composables/useEstimateSectionTemplates'

import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import coreConfig from '@core/config'
import InvoiceSectionManageDialog from '@/views/apps/invoice/InvoiceSectionManageDialog.vue'
import { convertTemplateToSection } from '@/utils/estimates'
import EstimateSectionEdit from '@/views/apps/invoice/EstimateSectionEdit.vue'

import { resolveUserName } from '@/utils/auth'
import { fetchAutocomplete } from '@/utils/api'

const emit = defineEmits<{
  (e: 'push', value: Partial<EstimateSection>): void
  (e: 'removeSection', id: number): void
}>()

const { user: currentUser } = storeToRefs(useCurrentUserStore())
const { autocomplete: autocompleteContacts, getById: getContactById } = useContacts()
const { autocomplete: autocompleteUsers, getById: getUserById } = useUsers()

const estimateData = defineModel<Partial<Estimate>>('data', { required: true })

const isLoading = ref<boolean>()
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

const tradesDialogVisible = ref<boolean>(false)
const isDialogVisible = ref<boolean>(false)

const { getById: getEstimateSectionTemplateById } = useEstimateSectionTemplates()

const handleTemplateSectionSelected = async (templateId: string) => {
  const { data, isFetching } = await getEstimateSectionTemplateById(templateId)

  watch(isFetching, newVal => {
    isLoading.value = newVal
  }, { immediate: true })

  watch(data, (newVal: EstimateSectionTemplate | null) => {
    const section = convertTemplateToSection(newVal as EstimateSectionTemplate)

    emit('push', section)
  })
}

const recalculateTotal = () => {
  const sections = estimateData.value.sections ?? []
  let total = 0

  sections.forEach(section => {
    total += (section.material_price ?? 0) * (section.amount ?? 0)
  })

  estimateData.value.total_price = total
}

const handleSectionRemove = (sectionNum: number) => {
  emit('removeSection', sectionNum)
  recalculateTotal()
}
</script>

<template>
  <VCard
    class="md:!p-6 !p-12"
    :loading="isLoading"
  >
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
        <DebouncedAutoComplete
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
      <div
        v-for="(section, index) in data.sections"
        :key="`${section.id}-${index}`"
        class="mb-4"
      >
        <EstimateSectionEdit
          v-if="data.sections !== undefined"
          :id="index"
          v-model:section="data.sections[index]"
          @remove="(val: number) => handleSectionRemove(val)"
          @update:total-amount="recalculateTotal"
        />
      </div>

      <VBtn
        size="small"
        prepend-icon="tabler-plus"
        @click="tradesDialogVisible = !tradesDialogVisible"
      >
        Add section
      </VBtn>

      <TradeSelectionDialog
        v-model:dialog-visible="tradesDialogVisible"
        @update:dialog-visible="value => {
          console.log(value)
        }"
      />

      <InvoiceSectionManageDialog
        v-model:dialog-visible="isDialogVisible"
        @save-section-clicked="(templateId: string) => {
          handleTemplateSectionSelected(templateId)
        }"
      />
    </div>

    <VDivider class="my-6 border-dashed border-gray-700 !opacity-60" />

    <!-- 👉 Total Amount -->
    <div class="flex justify-space-between flex-wrap flex-column flex-sm-row">
      <div class="mb-6 sm:mb-0">
        <div class="d-flex align-center mb-4">
          <h6 class="font-semibold mx-2">
            Salesperson:
          </h6>
          <AppTextField
            v-if="selectedUser"
            :value="resolveUserName(selectedUser)"
            readonly
            style="inline-size: 8rem;"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <table class="w-100">
          <tbody>
            <tr>
              <td class="pe-16">
                Total:
              </td>
              <td
                class="font-bold"
                :class="$vuetify.locale.isRtl ? 'text-start' : 'text-end'"
              >
                ${{ estimateData.total_price ?? 0 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
