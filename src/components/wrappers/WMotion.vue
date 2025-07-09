<script setup lang="ts">
  import type { MotionProps } from "motion-v";

  import { Motion } from "motion-v";

  import WMotionConfig from "./WMotionConfig.vue";

  const motionProps = defineProps<MotionProps & { class?: string; style?: Record<string, any> }>();
</script>

<template>
  <WMotionConfig>
    <Motion v-bind="motionProps">
      <slot />
    </Motion>
  </WMotionConfig>
</template>
