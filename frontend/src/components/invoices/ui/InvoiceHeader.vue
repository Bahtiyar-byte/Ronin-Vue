<template>
  <div class="d-flex flex-wrap justify-space-between flex-column rounded bg-var-theme-background flex-sm-row gap-6 p-6 mb-6 print:p-0">
    <div v-if="$slots.default">
      <slot />
    </div>

    <div
      v-if="$slots.right"
      class="d-flex flex-column justify-center gap-2"
    >
      <slot name="right" />
    </div>
  </div>
</template>
