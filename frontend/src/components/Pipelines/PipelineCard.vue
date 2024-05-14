<script setup lang="ts">
import { computed } from 'vue';
import PipelineDisplayItem from "@/types/pipiline/PipelineDisplayItem";

const props = defineProps<{
  pipelineItems: PipelineDisplayItem[];
}>();

const cardProps = computed(() => {
  const { pipelineItems, ...otherProps } = props;
  return otherProps;
});
</script>

<template>
  <v-card v-bind="cardProps">
    <v-card-text class="flex flex-wrap">
      <div class="w-[20%] px-4" v-for="(pipeline, key) in pipelineItems" :key="`pipeline-item-${key}`">
        <router-link class="flex flex-column items-center" :to="pipeline.url">
          <span class="text-lg font-medium">{{ pipeline.title }}</span>

          <span v-if="pipeline?.icon?.length"
                class="material-symbols-outlined mt-2 text-4xl"
          >
            {{ pipeline.icon }}
          </span>

          <v-chip class="mt-2">{{ pipeline.amount }}</v-chip>
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>
