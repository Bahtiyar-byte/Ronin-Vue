<script setup lang="ts">
import type EstimateSection from '@/types/estimateSections/EstimateSection'

defineProps<{
  sections?: Partial<EstimateSection>[]
}>()
</script>

<template>
  <div>
    <div
      v-for="(section, idx) in sections"
      :key="`contract-section-${section.id}`"
      :data-test="`contract-section-${section.id}`"
    >
      <p
        v-if="section.name?.length"
        class="font-semibold mb-2"
      >
        {{ section.name }}
      </p>

      <p v-if="section.description?.length">
        {{ section.description }}
      </p>

      <AppDivider v-if="idx !== (sections?.length ?? 1) - 1" />
    </div>
  </div>
</template>
