<script setup lang="ts">
defineProps<Props>()

interface Props {
  crew: { name: string; color: string }
}
</script>

<template>
  <div class="main__scheduler__bottom__trade__crew">
    <div
      class="main__scheduler__bottom__trade__crew__color__size"
      :style="{ background: `${crew.color}` }"
    />
    <div class="crew__name">
      {{ crew.name }}
    </div>
  </div>
</template>

<style scoped>
.main__scheduler__bottom__trade__crew{
  width: 100%;
  max-width: 125px;
  height: 100%;
  padding: 3px;
  display: flex;
  flex-direction: row;
}

.main__scheduler__bottom__trade__crew__color__size{
  background: #8BC541;
  width: 14px;
  /* height: 47px; */
  height: 100%;
  margin-right: 2px;
}

.crew__name{
  font-size: 0.8em;
  font-weight: bold;
}
</style>
