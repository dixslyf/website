<script setup lang="ts">
  const { size = "1em" } = defineProps<{ size?: string }>();
</script>

<template>
  <slot />
</template>

<style scoped>
  :slotted(.lucide) {
    width: v-bind(size);
    height: v-bind(size);
  }
</style>
