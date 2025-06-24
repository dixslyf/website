<script setup lang="ts">
  const {
    paddingBlock = "var(--space-s)",
    paddingInline = "var(--space-s)",
    borderWidth = "var(--border-thin)",
    fg = "inherit",
    bg = "transparent",
  } = defineProps<{
    paddingBlock?: string;
    paddingInline?: string;
    borderWidth?: string;
    fg?: string;
    bg?: string;
  }>();
</script>

<template>
  <div :class="$style.box">
    <slot />
  </div>
</template>

<style module>
  .box {
    padding-block: v-bind(paddingBlock);
    padding-inline: v-bind(paddingInline);

    border: v-bind(borderWidth) solid;
    border-radius: 1rem;
    outline: v-bind(borderWidth) transparent;
    outline-offset: calc(v-bind(borderWidth) * -1);

    color: v-bind(fg);
    background-color: v-bind(bg);
  }

  .box * {
    color: inherit;
  }
</style>
