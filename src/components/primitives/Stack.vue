<script setup lang="ts">
  const {
    gap = "var(--space-s)",
    direction = "column",
    alignItems = "normal",
  } = defineProps<{
    gap?: string;
    direction?: "column" | "row";
    alignItems?: string;
  }>();
</script>

<template>
  <div :class="$style.stack">
    <slot />
  </div>
</template>

<style module>
  .stack {
    display: flex;
    flex-direction: v-bind(direction);
    justify-content: flex-start;
    align-items: v-bind(alignItems);
    gap: v-bind(gap);
  }
</style>
