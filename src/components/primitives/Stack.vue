<script setup lang="ts">
  const { gap = "var(--space-s)" } = defineProps<{ gap?: string }>();
</script>

<template>
  <div :class="$style.stack">
    <slot />
  </div>
</template>

<style module>
  .stack {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: v-bind(gap);
  }
</style>
