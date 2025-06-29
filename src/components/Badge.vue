<script setup lang="ts">
  const {
    bg = "var(--bg-light)",
    fg = "var(--fg)",
    padding = "0.4em 1em",
    borderRadius = "2rem",
    fontSize = "var(--type--1)",
  } = defineProps<{
    bg?: string;
    fg?: string;
    padding?: string;
    borderRadius?: string;
    fontSize?: string;
  }>();
</script>

<template>
  <span :class="$style.badge">
    <slot />
  </span>
</template>

<style module>
  .badge {
    border-radius: v-bind(borderRadius);
    padding: v-bind(padding);
    background-color: v-bind(bg);
    color: v-bind(fg);
    font-size: v-bind(fontSize);
  }
</style>
