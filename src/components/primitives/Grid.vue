<script setup lang="ts">
  const { gap = "--space-s", targetMinWidth = "10rem" } = defineProps<{
    gap?: string;
    targetMinWidth?: string;
  }>();
</script>

<template>
  <div :class="$style.grid">
    <slot />
  </div>
</template>

<style module>
  .grid {
    display: grid;
    grid-gap: v-bind(gap);
    --target-min-w: v-bind(targetMinWidth);
  }

  @supports (width: min(var(--target-min-w), 100%)) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(min(var(--target-min-w), 100%), 1fr));
    }
  }
</style>
