<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

import type User from '@/types/users/User'
import type Contact from '@/types/contacts/Contact'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'
import type EstimateSection from '@/types/estimateSections/EstimateSection'
import type Estimate from '@/types/estimates/Estimate'

import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'
import { useEstimateSectionTemplates } from '@/composables/useEstimateSectionTemplates'

import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import coreConfig from '@core/config'
import InvoiceSectionManageDialog from '@/views/apps/invoice/InvoiceSectionManageDialog.vue'
import { convertTemplateToSection } from '@/utils/estimates'
import EstimateSectionEdit from '@/views/apps/invoice/EstimateSectionEdit.vue'

import { resolveUserName } from '@/utils/auth'

import SignatureField from '@/components/estimates/SignatureField.vue'

defineProps<{
  hideControls: boolean
}>()

const emit = defineEmits<{
  (e: 'push', value: Partial<EstimateSection>): void
  (e: 'removeSection', id: number): void
}>()

const { user: currentUser } = storeToRefs(useCurrentUserStore())
const { getById: getContactById } = useContacts()
const { getById: getUserById } = useUsers()

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
    })
  }

  if (currentUser) {
    userId.value = currentUser.value?.id
    selectedUser.value = currentUser.value as User
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

const tradesUuid = ref<string>()

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
    total += Number.parseFloat(section?.amount?.toString() ?? '0')
  })

  estimateData.value = {
    ...estimateData.value,
    total_price: total,
  }
  estimateData.value.total_price = total
}

const handleSectionRemove = (sectionNum: number) => {
  emit('removeSection', sectionNum)
  recalculateTotal()
}

const date = ref<string | Date>(estimateData.value.createdAt ?? new Date())
</script>

<template>
  <VCard
    class="md:!p-6 !p-12"
    :loading="isLoading"
  >
    <div class="d-flex flex-wrap justify-space-between flex-column rounded bg-var-theme-background flex-sm-row gap-6 p-6 mb-6">
      <div>
        <div class="d-flex align-center app-logo mb-6">
          <VNodeRenderer :nodes="themeConfig.app.logoDocuments" />

          <h6 class="app-logo-title">
            {{ coreConfig.company.name }}
          </h6>
        </div>

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
        <p v-if="selectedUser">
          {{ resolveUserName(selectedUser) }}
        </p>
        <p v-if="selectedUser?.phoneNumber">
          Phone: <a :href="`tel:${selectedUser.phoneNumber}`">{{ selectedUser.phoneNumber }}</a>
        </p>
        <p v-if="selectedUser?.email">
          <a :href="`mailto:${selectedUser.email}`">{{ selectedUser.email }}</a>
        </p>
      </div>

      <div class="d-flex flex-column justify-center gap-2">
        <div class="d-flex gap-x-4 align-start align-sm-center flex-column flex-sm-row">
          <span
            class="text-high-emphasis text-sm-end"
            style="inline-size: 5.625rem;"
          >Date Issued:</span>

          <span style="inline-size: 9.5rem;">
            <span v-if="hideControls">
              {{ formatDate(estimateData.createdAt as string, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }) }}
            </span>
            <AppDateTimePicker
              v-else
              v-model="date"
              placeholder="YYYY-MM-DD"
              :config="{ position: 'auto right' }"
              @update:date="(newDate: Date) => estimateData.createdAt = newDate"
            />
          </span>
        </div>
      </div>
    </div>

    <VRow>
      <VCol class="text-no-wrap">
        <h6 class="font-medium text-body mb-4">
          Estimate To:
        </h6>
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
    <div class="add-products-form">
      <div v-if="data.sections !== undefined">
        <div
          v-for="(section, index) in data.sections"
          :key="`${section.id}-${index}`"
          class="mb-4"
        >
          <EstimateSectionEdit
            :id="index"
            v-model:section="data.sections[index]"
            :hide-controls="hideControls || (data.sections[index].id !== undefined && !!data.sections[index].id.length)"
            @remove="(val: number) => handleSectionRemove(val)"
            @update:total-amount="recalculateTotal"
          />
        </div>
      </div>

      <VBtn
        v-if="!hideControls"
        size="small"
        prepend-icon="tabler-plus"
        @click="tradesDialogVisible = !tradesDialogVisible"
      >
        Add section
      </VBtn>

      <TradeSelectionDialog
        v-if="!hideControls"
        v-model:dialog-visible="tradesDialogVisible"
        @save-trade-clicked="(tradeId: string) => {
          isDialogVisible = true
          tradesUuid = tradeId
        }"
      />

      <InvoiceSectionManageDialog
        v-if="!hideControls"
        v-model:dialog-visible="isDialogVisible"
        v-model:trades-uuid="tradesUuid"
        @save-section-clicked="(templateId: string) => {
          handleTemplateSectionSelected(templateId)
        }"
      />
    </div>

    <VDivider class="my-6 border-dashed border-gray-700 !opacity-60" />

    <div class="flex justify-space-between flex-wrap flex-column flex-sm-row">
      <div />

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

    <div class="text-sm mb-12">
      <p>
        This estimate includes the cost for all services provided, any materials needed, all labor hours, and transportation, along with all required overhead
        such as any necessary insurances, certifications, and/or warranties. We do not discourage our customers from obtaining multiple service quotes in
        order to make the best possible decision, but due to constant fluctuations in material and labor costs, the price outlined in this estimate is good for 30
        days. If you have any questions or comments about the estimate, please contact us as soon as possible so that we can provide you with the needed
        information.
      </p>
      <p class="mt-4">
        <b>
          If there is need work to be done or that was discussed and its not specifically listed on estimate please contact us
        </b>
      </p>
    </div>

    <div class="space-y-6">
      <span class="hidden">Signatures</span>
      <VRow>
        <VCol cols="8">
          <SignatureField title="Company Authorized Signature" />
        </VCol>
        <VCol cols="4">
          <SignatureField title="Date" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="8">
          <SignatureField title="Customer Signature" />
        </VCol>
        <VCol cols="4">
          <SignatureField title="Date" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="8">
          <SignatureField title="Customer Signature" />
        </VCol>
        <VCol cols="4">
          <SignatureField title="Date" />
        </VCol>
      </VRow>
    </div>
  </VCard>
</template>
