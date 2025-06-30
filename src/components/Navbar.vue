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
        <span :class="$style.navTitle">
          /home/dixslyf{{ typewriter.text.value }}
          <TextCaret :visible="typewriter.state.value !== TypewriterState.Idle" />
        </span>
        <Cluster
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
  .navRoot {
    --local-accent: var(--accent);
    &:hover {
      --local-accent: var(--accent-sec);
    }
  }

  .outerCluster {
    justify-content: center;

    font-size: var(--type-1);
    font-weight: 500;
  }

  .navTitle {
    flex-grow: 1;
  }

  .navlink {
    text-decoration: none;

    color: var(--fg);

    transition:
      color 0.2s ease-in-out,
      transform 0.2s ease-out; /* For hoverUnderline. */

    &:hover {
      color: var(--accent-nav-hover) !important;
    }
  }

  .navlinkCurrent {
    color: var(--local-accent) !important;
  }
</style>
