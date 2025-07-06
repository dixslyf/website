<script setup lang="ts">
  import { useDark, useToggle } from "@vueuse/core";
  import { AnimatePresence, Motion } from "motion-v";

  import { Icon } from "@iconify/vue";

  import { WMotionConfig } from "@/components/wrappers";
  import { fadeProps } from "@/utils/animations";

  const isDark = useDark({
    selector: "body",
  });
  const toggleDark = useToggle(isDark);

  const themeAnimProps = fadeProps({ duration: 0.2 });
</script>

<template>
  <WMotionConfig>
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
  </WMotionConfig>
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
