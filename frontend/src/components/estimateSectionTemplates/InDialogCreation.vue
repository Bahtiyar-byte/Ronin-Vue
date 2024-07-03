<script setup lang="ts">
defineProps<{
  showCancel: boolean
}>()

defineEmits<{
  (e: 'cancelCreation'): void
}>()
</script>

<template>
  <VCard>
    <VCardText>
      test in dialog creation
    </VCardText>

    <VCardActions>
      <VBtn
        variant="plain"
        color="grey-500"
        type="button"
        @click="$emit('cancelCreation')"
      >
        Cancel
      </VBtn>
    </VCardActions>
  </VCard>
</template>
