<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

import logo from "@/assets/tailwind.jpg";

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  // @ts-expect-error There are some props inside
  ...RouterLink.props,
})

const to = ref(props?.to ?? { name: 'Dashboard' });

</script>

<template>
  <div>
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
  </div>

</template>
