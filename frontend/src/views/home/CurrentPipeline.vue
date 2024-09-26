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

const statistics = [
  {
    title: 'Leads',
    stats: '230k',
    icon: 'tabler-chart-pie-2',
    color: 'primary',
  },
  {
    title: 'Prospects',
    stats: '8.549k',
    icon: 'tabler-users',
    color: 'info',
  },
  {
    title: 'Approved',
    stats: '1.423k',
    icon: 'tabler-shopping-cart',
    color: 'error',
  },
  {
    title: 'Completed',
    stats: '$9745',
    icon: 'tabler-currency-dollar',
    color: 'success',
  },
  {
    title: 'Invoiced',
    stats: '$9745',
    icon: 'tabler-currency-dollar',
    color: 'success',
  },
]
</script>

<template>
  <VCard
    v-bind="cardProps"
    title="Current pipeline"
  >
    <template #append>
      <span class="text-disabled text-subtitle-2">Updated 1 month ago</span>
    </template>

    <VCardText>
      <VRow class="d-flex justify-space-evenly">
        <VCol
          v-for="(pipeline, key) in pipelineItems"
          :key="`pipeline-item-${key}`"
          cols="4"
          md="2"
        >
          <RouterLink
            :to="pipeline.url as RouteLocationAsString"
            class="flex flex-column items-center"
          >
            <div class="d-flex gap-x-4 align-center">
              <VAvatar
                :color="statistics[key].color"
                variant="tonal"
                size="40"
                rounded
              >
                <VIcon :icon="pipeline.icon" />
              </VAvatar>

              <div class="d-flex flex-column">
                <div class="text-body-2">
                  {{ pipeline.title }}
                </div>
                <h5 class="font-weight-medium">
                  {{ pipeline.amount }}
                </h5>
              </div>
            </div>
          </RouterLink>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
