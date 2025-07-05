<script setup lang="ts">
  import { useDark, useToggle } from "@vueuse/core";
  import { AnimatePresence, Motion } from "motion-v";

  import { Icon } from "@iconify/vue";
  import { slideProps } from "@/utils/animations";

  const isDark = useDark({
    selector: "body",
  });
  const toggleDark = useToggle(isDark);

  const themeAnimProps = slideProps({
    inDirection: "up",
    outDirection: "up",
    inDistance: 1,
    outDistance: -1,
    duration: 0.3,
  });
</script>

<template>
  <div
    :class="$style.themeIconContainer"
    @click="toggleDark()"
  >
    <AnimatePresence mode="wait">
      <Motion
        asChild
        v-if="isDark"
        v-bind="themeAnimProps"
      >
        <Icon :icon="'lucide:moon'" />
      </Motion>
      <Motion
        asChild
        v-else
        v-bind="themeAnimProps"
      >
        <Icon :icon="'lucide:sun'" />
      </Motion>
    </AnimatePresence>
  </div>
</template>

<style module>
  .themeIconContainer {
    display: flex;
    cursor: pointer;
    &:hover {
      color: var(--accent-nav-hover);
    }
  }
</style>
