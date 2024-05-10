<script setup lang="ts">
import cn from "classnames";
</script>

<template>
  <section :class="cn('container md:px-12 py-6', $props.class ?? '')">
    <slot />
  </section>
</template>
