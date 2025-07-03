<script setup lang="ts">
  import { Center, Cluster, Stack } from "@/components/primitives";
</script>

<template>
  <Center>
    <Cluster
      :class="$style.nameDisplayContent"
      column-gap="var(--space-m)"
    >
      <!-- Using stack instead of letter-spacing because letter-spacing
      annoyingly adds a space at the end of the last character. -->
      <Stack
        :class="$style.nameChinese"
        gap="0.2em"
      >
        <span>刘</span>
        <span>岩</span>
        <span>峰</span>
      </Stack>
      <Stack
        :class="$style.latinContainer"
        gap="var(--space-m)"
      >
        <span :class="$style.nameEnglish">Dixon Sean Low Yan Feng</span>
        <span :class="$style.subtitle">Developer</span>
      </Stack>
    </Cluster>
  </Center>
</template>

<style module>
  .nameDisplayContent {
    align-items: center;
    justify-content: center;
  }

  .nameChinese {
    font-size: var(--type-6);
    font-weight: 400;
    font-family: Noto Sans SC Variable;
    line-height: 1;
    color: var(--accent-splash);
  }

  .latinContainer {
    padding-block: var(--space-xs);
    justify-content: space-between;
  }

  .nameEnglish {
    max-inline-size: 14ch;
    line-height: 1.3;
    font-weight: 700;
    font-size: var(--type-3);
  }

  .subtitle {
    font-weight: 400;
    font-size: var(--type-2);
    color: var(--fg-dim-1);
  }
</style>
