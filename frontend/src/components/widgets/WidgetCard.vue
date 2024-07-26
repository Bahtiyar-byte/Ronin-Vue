<script setup lang="ts">
import { computed, mergeProps, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import type WidgetCardProps from '@/types/widgets/WidgetCardProps'

const props = defineProps<WidgetCardProps>()

const isAddPaymentMethodsDialogVisible = ref(false)

const containerTag = computed(() => (props.to ? RouterLink : 'div'))

const items = [
  { title: 'Emails', value: 'emails' },
  { title: 'Chat', value: 'chat' },
  { title: 'Calls', value: 'calls' },
  { title: 'Sms', value: 'sms' },
]

const route = useRoute()

console.log('route', route.name)

const path = 'contacts-details-id'
let communicationPath = '/contacts/communications'
if (route.name !== path) {
  communicationPath = '/jobs/communications'
}

function prefixWithPlus(value: number): string {
  return value > 0 ? `+${value}` : `${value}`
}
</script>

<template>
  <component
    :is="containerTag"
    :to="to"
    class="cursor-pointer"
    @click="props.action"
  >
    <VCard>
      <VCardText>
        <div class="d-flex gap-2 justify-space-between">
          <div class="d-flex flex-column gap-y-1">
            <div class="text-body-1 font-semibold">
              {{ widget.title }}
            </div>
            <div
              v-if="widget.value !== undefined"
              class="d-flex gap-x-2 align-center"
            >
              <div class="text-2xl font-medium">
                {{ widget.value }}
              </div>
              <div
                v-if="widget.change"
                class="text-base"
                :class="widget.change > 0 ? 'text-success' : 'text-error'"
              >
                ({{ prefixWithPlus(widget.change) }}%)
              </div>
            </div>
            <div
              v-if="widget.desc"
              class="text-sm"
            >
              {{ widget.desc }}
            </div>
            <div
              v-if="widget.title === 'Documents'"
              class="text-xsm"
            >
              <VBtn
                @click="
                  isAddPaymentMethodsDialogVisible
                    = !isAddPaymentMethodsDialogVisible
                "
              >
                Details
              </VBtn>
              <DocumentsDialog v-model:is-dialog-visible="isAddPaymentMethodsDialogVisible" />
            </div>
          </div>
          <div class="flex flex-column gap-2">
            <VAvatar
              :color="widget?.iconColor ?? 'primary'"
              variant="tonal"
              rounded
              size="42"
            >
              <VIcon
                :icon="widget.icon"
                size="26"
              />
            </VAvatar>
            <VTooltip
              v-if="widget.action"
              location="bottom"
              :text="widget.action.title"
            >
              <template #activator="{ props: tooltipProps }">
                <RouterLink
                  v-if="widget.title !== 'Communications'"
                  :to="widget.action.to"
                  @click.stop=""
                >
                  <VAvatar
                    v-bind="tooltipProps"
                    :color="widget?.iconColor ?? 'primary'"
                    variant="tonal"
                    rounded
                    size="42"
                  >
                    <VIcon
                      :icon="widget.action.icon"
                      size="26"
                    />
                  </VAvatar>
                </RouterLink>

                <VMenu v-if="widget.title === 'Communications'">
                  <template #activator="{ props: menuProps }">
                    <VBtn
                      class="w-1/2"
                      :color="widget?.iconColor ?? 'primary'"
                      variant="tonal"
                      :icon="widget.action.icon"
                      size="42"
                      rounded
                      v-bind="mergeProps(menuProps, tooltipProps)"
                    />
                  </template>
                  <VList>
                    <VListItem
                      v-for="(item, index) in items"
                      :key="index"
                    >
                      <RouterLink :to="`${communicationPath}/1/${item.value}`">
                        <VListItemTitle>{{ item.title }}</VListItemTitle>
                      </RouterLink>
                    </VListItem>
                  </VList>
                </VMenu>
              </template>
            </VTooltip>
          </div>
        </div>
      </VCardText>
    </VCard>
  </component>
</template>
