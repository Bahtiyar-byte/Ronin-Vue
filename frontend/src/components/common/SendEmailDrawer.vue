<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

interface Emit {
  (e: 'submit'): void
}

defineProps<{
  title: string
}>()

const emit = defineEmits<Emit>()

const drawerOpened = defineModel<boolean>('drawerOpened', { required: true })

const onSubmit = () => {
  drawerOpened.value = false
  emit('submit')
}
</script>

<template>
  <VNavigationDrawer
    v-model:model-value="drawerOpened"
    temporary
    location="end"
    :width="400"
    class="scrollable-content"
  >
    <AppDrawerHeaderSection
      :title="title"
      @cancel="drawerOpened = false"
    />
    <VDivider />
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm @submit.prevent="onSubmit">
            <VRow>
              <slot />

              <VCol cols="12">
                <slot name="buttonsPrepend" />

                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Send
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="drawerOpened = false"
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
