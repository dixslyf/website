<script setup lang="ts">
  import { watch } from "vue";
  import { RouterLink } from "vue-router";

  import { TextCaret } from "@/components";
  import { Box, Cluster } from "@/components/primitives";
  import { TypewriterState, useTypewriter } from "@/composables/typewriter";

  const { routes, currentRoutePath } = defineProps<{
    routes: ReadonlyArray<{
      path: string;
      name: string;
    }>;
    currentRoutePath: string;
  }>();

  const typewriter = useTypewriter();
  watch(
    () => currentRoutePath,
    (newRoute, _oldRoute) => {
      if (newRoute === "/") {
        typewriter.type("");
        return;
      }
      typewriter.type(newRoute);
    },
  );

  const columnGap = "var(--space-m)";
</script>

<template>
  <nav :class="$style.nav">
    <Box
      class="hoverScale"
      paddingInline="var(--space-m)"
      paddingBlock="calc(var(--space-m) / var(--line-height))"
    >
      <Cluster
        :class="$style.outerCluster"
        :columnGap
        rowGap="var(--space-m)"
      >
        <span>
          /home/dixslyf<span>{{ typewriter.text.value }}</span>
          <TextCaret :visible="typewriter.state.value !== TypewriterState.Idle" />
        </span>
        <Cluster
          :class="$style.innerCluster"
          :columnGap
          rowGap="var(--space-2xs)"
        >
          <RouterLink
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="hoverUnderline"
          >
            {{ route.name }}
          </RouterLink>
        </Cluster>
      </Cluster>
    </Box>
  </nav>
</template>

<style module>
  .outerCluster {
    justify-content: space-between;
  }

  .innerCluster {
    justify-content: flex-start;
  }

  .nav {
    font-weight: 500;
  }
</style>
