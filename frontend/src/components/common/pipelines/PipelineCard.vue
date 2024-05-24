<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationAsString } from 'unplugin-vue-router/types'
import type PipelineDisplayItem from '@/types/pipiline/PipelineDisplayItem'

const props = defineProps<{
  pipelineItems: PipelineDisplayItem[]
}>()

const cardProps = computed(() => {
  const { pipelineItems: __pipelineItems, ...otherProps } = props

  return otherProps
})
</script>

<template>
  <VCard v-bind="cardProps">
    <VCardText class="flex flex-wrap">
      <div
        v-for="(pipeline, key) in pipelineItems"
        :key="`pipeline-item-${key}`"
        class="w-[20%] px-4"
      >
        <RouterLink
          :to="pipeline.url as RouteLocationAsString"
          class="flex flex-column items-center"
        >
          <span class="text-lg font-medium">{{ pipeline.title }}</span>

          <VIcon
            :icon="pipeline.icon"
            class="mt-2 text-4xl"
          />

          <VChip class="mt-3">
            {{ pipeline.amount }}
          </VChip>
        </RouterLink>
      </div>
    </VCardText>
  </VCard>
</template>
