<template>
  <VRow>
    <VCol
      cols="12"
      md="9"
    >
      <slot name="leftColumn" />
    </VCol>
    <VCol
      cols="12"
      md="3"
    >
      <div
        v-if="$slots.rightColumn"
        class="sticky top-4 space-y-6"
      >
        <slot name="rightColumn" />
      </div>
    </VCol>
  </VRow>
</template>
