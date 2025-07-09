<script setup lang="ts">
  import { MotionConfig } from "motion-v";
  import { useStore } from "@nanostores/vue";

  import { motionConfig, type MotionConfigState } from "@/stores/motion-config";
  import type { Ref } from "vue";

  // Safety: We're type casting to get rid of `readonly`.
  // `MotionConfig` should never mutate the config, so this is safe.
  const config = useStore(motionConfig) as Ref<MotionConfigState>;
</script>

<template>
  <MotionConfig v-bind="config">
    <slot />
  </MotionConfig>
</template>
