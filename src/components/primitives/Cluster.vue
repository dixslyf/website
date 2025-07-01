<script setup lang="ts">
  const { columnGap = "var(--space-s)", rowGap = "var(--space-s)" } = defineProps<{
    columnGap?: string;
    rowGap?: string;
  }>();
</script>

<template>
  <div :class="$style.cluster">
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
