<script setup lang="ts">
import type Estimate from '@/types/estimates/Estimate'

interface SubmitData {
  emailTo: string
  subject: string
  message: string
}

interface Emit {
  (e: 'submit', value: SubmitData): void
}

const emit = defineEmits<Emit>()

const drawerOpened = defineModel<boolean>('drawerOpened', { required: true })
const estimateData = defineModel<Partial<Estimate>>('estimateData', { required: true })

const submitData = reactive({
  emailTo: estimateData.value.related_contact?.email ?? '',
  subject: 'New estimate was created',
  message: '',
})

const onSubmit = () => {
  emit('submit', submitData)
}
</script>

<template>
  <SendEmailDrawer
    v-model:drawer-opened="drawerOpened"
    title="Send Invoice"
    @submit="onSubmit"
  >
    <VCol cols="12">
      <AppTextField
        v-model="submitData.emailTo"
        label="To"
        placeholder="receiver@email.com"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="submitData.subject"
        label="Subject"
        placeholder="Estimate subject"
      />
    </VCol>

    <VCol cols="12">
      <AppTextarea
        v-model="submitData.message"
        rows="10"
        label="Message"
        placeholder="Thank you for your business, always a pleasure to work with you!"
      />
    </VCol>

    <template #buttonsPrepend>
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
    </template>
  </SendEmailDrawer>
</template>
