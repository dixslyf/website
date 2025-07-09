<script setup lang="ts">
  import { AnimatePresence, Motion } from "motion-v";

  import { Icon } from "@iconify/vue";
  import { useStore } from "@nanostores/vue";

  import { WMotionConfig } from "@/components/wrappers";
  import { fadeProps } from "@/utils/animations";
  import { theme, cycleTheme } from "@/stores/theme";

  const $theme = useStore(theme);

  const themeAnimProps = fadeProps({ duration: 0.2 });
</script>

<template>
  <WMotionConfig>
    <div
      :class="$style.themeIconContainer"
      @click="() => cycleTheme()"
    >
      <AnimatePresence mode="wait">
        <Motion
          asChild
          v-if="$theme === 'dark'"
          v-bind="themeAnimProps"
        >
          <Icon :icon="'lucide:moon'" />
        </Motion>
        <Motion
          asChild
          v-else-if="$theme === 'light'"
          v-bind="themeAnimProps"
        >
          <Icon :icon="'lucide:sun'" />
        </Motion>
        <Motion
          asChild
          v-else
          v-bind="themeAnimProps"
        >
          <Icon :icon="'lucide:sun-moon'" />
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
