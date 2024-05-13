<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const { ...vCardProps } = props;
</script>

<template>
  <v-card v-bind="vCardProps">

  </v-card>
</template>
