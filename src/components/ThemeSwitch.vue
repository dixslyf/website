<script setup lang="ts">
  import { computed } from "vue";

  import { AnimatePresence, Motion } from "motion-v";
  import { Icon } from "@iconify/vue";

  import { WMotionConfig } from "@/components/wrappers";
  import { fadeProps } from "@/utils/animations";
  import { theme, cycleTheme } from "@/stores/theme";
  import { useLazyStore } from "@/composables/lazy-store";

  const $theme = useLazyStore(theme);
  const title = computed(() =>
    $theme.value === "system"
      ? "Follow system theme"
      : $theme.value === "dark"
        ? "Dark mode"
        : "Light mode",
  );

  const themeAnimProps = fadeProps({ duration: 0.2 });
</script>

<template>
  <WMotionConfig>
    <button
      :title
      :class="$style.themeIconContainer"
      @click="() => cycleTheme()"
    >
      <AnimatePresence mode="wait">
        <Motion
          asChild
          v-if="$theme === 'system'"
          v-bind="themeAnimProps"
        >
          <Icon icon="lucide:sun-moon" />
        </Motion>
        <Motion
          asChild
          v-else-if="$theme === 'dark'"
          v-bind="themeAnimProps"
        >
          <Icon icon="lucide:moon" />
        </Motion>
        <Motion
          asChild
          v-else
          v-bind="themeAnimProps"
        >
          <Icon icon="lucide:sun" />
        </Motion>
      </AnimatePresence>
    </button>
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
