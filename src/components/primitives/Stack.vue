<script setup lang="ts">
  const { gap = "var(--space-s)", direction = "column" } = defineProps<{
    gap?: string;
    direction?: "column" | "row";
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
    gap: v-bind(gap);
  }
</style>
