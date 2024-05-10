<script setup lang="ts">
import TableSampleJobs from "@/components/Jobs/TableSampleJobs.vue";

const props = defineProps<{
  title: string;
}>();

const { ...vCardProps } = props;

</script>

<template>
  <v-card v-bind="vCardProps">
    <TableSampleJobs :props-headers="[
      { text: 'Name', value: 'name'},
      { text: 'Contact', value: 'contact'},
      { text: 'Category', value: 'category'},
    ]"
    :show-action="false"
    />
  </v-card>
</template>
