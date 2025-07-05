<script setup lang="ts">
  import { ref, watch } from "vue";

  import { TextCaret } from "@/components";
  import { TypewriterState, useTypewriter } from "@/composables/typewriter";

  const { currentRoutePath } = defineProps<{
    currentRoutePath: string;
  }>();

  function routeDisplay(route: string) {
    if (route === "/") {
      return "";
    }
    return route;
  }

  const typewriter = useTypewriter({ initialText: currentRoutePath });
  watch(
    () => currentRoutePath,
    (newRoute, _oldRoute) => {
      typewriter.type(routeDisplay(newRoute));
    },
  );
</script>

<template>
  <span :class="$style.routeDisplay">
    /home/dixslyf{{ typewriter.text.value }}
    <TextCaret :visible="typewriter.state.value !== TypewriterState.Idle" />
  </span>
</template>

<style module>
  .routeDisplay {
    flex-grow: 1;
  }
</style>
