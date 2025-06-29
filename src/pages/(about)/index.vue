<script setup lang="ts">
  import { definePageMeta } from "#imports";
  definePageMeta({
    name: "about",
  });
</script>

<template>
  <Stack gap="var(--space-l)">
    <AboutMe />
    <Technologies />
  </Stack>
</template>

<style module>
  .nameDisplay {
    margin-top: var(--fluid-h-0-240);
    margin-bottom: calc(1.5 * var(--fluid-h-0-240));
  }
</style>
