<script setup lang="ts">
  const {
    columnGap = "var(--space-s)",
    rowGap = "var(--space-s)",
    class: className,
  } = defineProps<{
    columnGap?: string;
    rowGap?: string;
    class?: string;
  }>();
</script>

<template>
  <div :class="`${$style.cluster} ${className}`">
    <slot />
  </div>
</template>

<style module>
  .cluster {
    display: flex;
    flex-wrap: wrap;
    column-gap: v-bind(columnGap);
    row-gap: v-bind(rowGap);
  }
</style>
