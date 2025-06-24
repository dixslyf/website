<script setup lang="ts">
  const {
    max = "var(--measure)",
    gutters = "var(--space-s)",
    intrinsic = false,
  } = defineProps<{
    max?: string;
    gutters?: string;
    intrinsic?: boolean;
  }>();
</script>

<template>
  <div
    :class="{
      [$style.centerBase]: true,
      [$style.centerNonintrinsic]: !intrinsic,
      [$style.centerIntrinsic]: intrinsic,
    }"
  >
    <slot />
  </div>
</template>

<style module>
  .centerBase {
    box-sizing: content-box;
    max-inline-size: v-bind(max);
    margin-inline: auto;
  }

  .centerNonintrinsic {
    padding-inline: v-bind(gutters);
  }

  .centerIntrinsic {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
