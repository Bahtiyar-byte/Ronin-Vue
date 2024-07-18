<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import type Estimate from '@/types/estimates/Estimate'

interface SubmitData {
  emailTo: string
  subject: string
  message: string
}

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'submit', value: SubmitData): void
}

interface Props {
  isDrawerOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const estimateData = defineModel<Partial<Estimate>>('estimateData', { required: true })

const emailTo = ref(estimateData.value.related_contact?.email ?? '')
const subject = ref(`Estimate #${estimateData.value.id}`)

const message = ref<string>('')

const onSubmit = () => {
  emit('update:isDrawerOpen', false)
  emit('submit', {
    emailTo: emailTo.value,
    subject: subject.value,
    message: message.value,
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    location="end"
    :width="400"
    :model-value="props.isDrawerOpen"
    class="scrollable-content"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      title="Send Invoice"
      @cancel="$emit('update:isDrawerOpen', false)"
    />
    <VDivider />
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="emailTo"
                  label="To"
                  placeholder="receiver@email.com"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="subject"
                  label="Subject"
                  placeholder="Estimate subject"
                />
              </VCol>

              <VCol cols="12">
                <AppTextarea
                  v-model="message"
                  rows="10"
                  label="Message"
                  placeholder="Thank you for your business, always a pleasure to work with you!"
                />
              </VCol>

              <VCol cols="12">
                <div class="mb-6">
                  <VChip
                    label
                    color="primary"
                    size="small"
                  >
                    <VIcon
                      start
                      icon="tabler-link"
                    />
                    Estimate Attached
                  </VChip>
                </div>
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Send
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="$emit('update:isDrawerOpen', false)"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
