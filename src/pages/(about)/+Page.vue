<script setup lang="ts">
  import { TransitionGroup } from "vue";

  import { motion } from "motion-v";

  import { Stack } from "@/components/primitives";
  import { AboutMe, Technologies } from "@/components";
  import { slideInProps } from "@/utils/animations";

  // const route = useRoute();
  const slideInDirection = "right"; // route.meta.inDirection || "right";
</script>

<template>
  <Stack gap="var(--space-l)">
    <TransitionGroup>
      <motion.div
        key="about-me"
        v-bind="slideInProps({ direction: slideInDirection })"
      >
        <AboutMe />
      </motion.div>
      <motion.div
        key="technologies"
        v-bind="slideInProps({ direction: slideInDirection, idx: 1, delayStep: 0.4 })"
      >
        <Technologies />
      </motion.div>
    </TransitionGroup>
  </Stack>
</template>

<style module>
  .nameDisplay {
    margin-top: var(--fluid-h-0-240);
    margin-bottom: calc(1.5 * var(--fluid-h-0-240));
  }
</style>
