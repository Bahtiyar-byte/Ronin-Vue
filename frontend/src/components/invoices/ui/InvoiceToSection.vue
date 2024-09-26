<script setup lang="ts">
import type Contact from '@/types/contacts/Contact'

defineProps<Partial<{
  title: string
  contact: Contact
}>>()
</script>

<template>
  <div>
    <h6
      v-if="title"
      class="font-medium text-body mb-4"
    >
      {{ title }}:
    </h6>
    <div v-if="contact">
      <p v-if="contact?.name">
        {{ contact.name }}
      </p>
      <p v-if="contact?.phone">
        <a :href="`tel:${contact.phone}`">
          {{ contact.phone }}
        </a>
      </p>
      <p v-if="contact?.address">
        {{ contact.address }}
      </p>
      <p v-if="contact?.email">
        <a :href="`mailto:${contact.email}`">
          {{ contact.email }}
        </a>
      </p>
    </div>
  </div>
</template>
