<script setup lang="ts">
  import { watch } from "vue";

  import { TypewriterState, useTypewriter } from "@/composables/typewriter";

  const { routes, currentRoutePath } = defineProps<{
    routes: ReadonlyArray<{
      path: string;
      name: string;
    }>;
    currentRoutePath: string;
  }>();

  function routeDisplay(route: string) {
    if (route === "/") {
      return "";
    }
    return route;
  }

  const typewriter = useTypewriter({ initialText: routeDisplay(currentRoutePath) });
  watch(
    () => currentRoutePath,
    (newRoute, _oldRoute) => {
      typewriter.type(routeDisplay(newRoute));
    },
  );

  const columnGap = "var(--space-m)";
</script>

<template>
  <nav :class="$style.navRoot">
    <Box
      paddingInline="var(--space-m)"
      paddingBlock="calc(var(--space-m) / var(--line-height))"
      label="Navbar"
    >
      <Cluster
        :class="$style.outerCluster"
        :columnGap
        rowGap="var(--space-m)"
      >
        <span>
          <span :class="$style.currentPath"
            >/home/dixslyf<span>{{ typewriter.text.value }}</span></span
          >
          <TextCaret :visible="typewriter.state.value !== TypewriterState.Idle" />
        </span>
        <Cluster
          :class="$style.innerCluster"
          :columnGap
          rowGap="var(--space-2xs)"
        >
          <NuxtLink
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            :class="[
              $style.navlink,
              'hoverUnderline',
              { [$style.navlinkCurrent]: route.path === currentRoutePath },
            ]"
          >
            {{ route.name }}
          </NuxtLink>
        </Cluster>
      </Cluster>
    </Box>
  </nav>
</template>

<style module>
  .outerCluster {
    justify-content: space-between;

    font-size: var(--type-1);
    font-weight: 500;
  }

  .innerCluster {
    justify-content: flex-start;
  }

  .navRoot {
    --local-accent: var(--accent);
    &:hover {
      --local-accent: var(--accent-sec);
    }
  }

  .navlink {
    text-decoration: none;

    &:hover {
      color: var(--accent-nav-hover) !important;
    }
  }

  .navlinkCurrent {
    color: var(--local-accent) !important;
  }
</style>
