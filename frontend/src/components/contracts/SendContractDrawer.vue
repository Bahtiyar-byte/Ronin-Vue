<script setup lang="ts">
import type Contract from '@/types/contracts/Contract'

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
const contract = defineModel<Partial<Contract>>('contract', { required: true })

const submitData = reactive({
  emailTo: contract.value.related_contact?.email ?? '',
  subject: 'New contract was created',
  message: '',
})

const onSubmit = () => {
  emit('submit', submitData)
}
</script>

<template>
  <SendEmailDrawer
    v-model:drawer-opened="drawerOpened"
    title="Send Contract"
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
        placeholder="Contract subject"
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
          Contract Attached
        </VChip>
      </div>
    </template>
  </SendEmailDrawer>
</template>
