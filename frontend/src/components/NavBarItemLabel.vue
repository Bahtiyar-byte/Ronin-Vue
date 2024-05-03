<script setup>
import BaseIcon from '@/components/BaseIcon.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
  },
  className: {
    type: String,
  },
  isDesktopIconOnly: Boolean,
  isVIcon: Boolean,
})
</script>

<template>
  <slot />
  <BaseIcon
    v-if="icon && !isVIcon"
    :path="icon"
    class="transition-colors"
  />
  <v-icon
    v-if="icon && isVIcon"
    :icon="icon"
  />
  <span
    :class="`px-2 transition-colors${isDesktopIconOnly && icon ? ' lg:hidden' : ''}${className ? ' ' + className : ''}`"
  >{{ label }}</span>
</template>
