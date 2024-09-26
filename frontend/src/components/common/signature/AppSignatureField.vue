<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'

const dialogVisible = ref<boolean>(false)
const signatureImage = ref<string>()
</script>

<template>
  <div
    :class="twMerge('border-b min-w-36 min-h-[1.5em] cursor-pointer', $props?.class?.toString() ?? '')"
    @click="dialogVisible = !dialogVisible"
  >
    <img
      :src="signatureImage"
      class="max-w-full"
      alt=""
    >

    <SignatureDialog
      v-model:is-dialog-visible="dialogVisible"
      v-model:signature-image="signatureImage"
      @click="() => {}"
    />
  </div>
</template>
