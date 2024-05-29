<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type WidgetCardProps from '@/types/widgets/WidgetCardProps'

const props = defineProps<WidgetCardProps>()

const containerTag = computed(() => (props.to ? RouterLink : 'div'))

function prefixWithPlus(value: number): string {
  return value > 0 ? `+${value}` : `${value}`
}
</script>

<template>
  <component
    :is="containerTag"
    :to="to"
  >
    <VCard>
      <VCardText>
        <div class="d-flex justify-space-between">
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
              <template #activator="{ props }">
                <VAvatar
                  v-bind="props"
                  :color="widget?.iconColor ?? 'primary'"
                  variant="tonal"
                  rounded
                  size="42"
                >
                  <RouterLink :to="widget.action.to">
                    <VIcon
                      :icon="widget.action.icon"
                      size="26"
                    />
                  </RouterLink>
                </VAvatar>
              </template>
            </VTooltip>
          </div>
        </div>
      </VCardText>
    </VCard>
  </component>
</template>
