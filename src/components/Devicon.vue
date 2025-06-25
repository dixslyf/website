<script setup lang="ts">
  // Unfortunately, since we cannot import JSON files as const,
  // we have to resort to runtime checking.
  import deviconJson from "devicon/devicon.json";
  import { computed } from "vue";
  const validIcons = new Set(
    deviconJson
      .map((iconMeta) => iconMeta.versions.font.map((ver) => `${iconMeta.name}-${ver}`))
      .flat(),
  );

  const {
    icon,
    variant = "plain",
    size = "1em",
  } = defineProps<{
    icon: string;
    variant?:
      | "original"
      | "plain"
      | "line"
      | "original-wordmark"
      | "plain-wordmark"
      | "line-wordmark";
    size?: string;
  }>();

  const fullIcon = computed(() => `${icon}-${variant}`);
  if (!validIcons.has(fullIcon.value)) {
    throw Error(`Invalid Devicon \`${fullIcon}\``);
  }
</script>

<template>
  <i :class="[$style.devicon, `devicon-${fullIcon}`]"></i>
</template>

<style module>
  .devicon {
    font-size: v-bind(size);
  }
</style>
