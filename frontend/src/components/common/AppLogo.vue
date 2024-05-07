<script setup lang="ts">
import { ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import logo from "@/assets/tailwind.jpg";

const props = defineProps<{
  to: RouteLocationRaw;
}>();

const to = ref(props?.to ?? { name: 'Dashboard' });

</script>

<template>
  <router-link v-if="to" :to="to">
    <v-img
      :src="logo"
      width="100"
    />
  </router-link>
  <v-img v-else
    :src="logo"
     width="100"
  />
</template>
