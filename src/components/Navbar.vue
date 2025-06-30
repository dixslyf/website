<script setup lang="ts">
  import { watch } from "vue";

  import { useDark, useToggle } from "@vueuse/core";

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

  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  const themeAnimProps = slideProps({
    inDirection: "up",
    outDirection: "up",
    inDistance: 1,
    outDistance: -1,
    duration: 0.3,
  });

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
          <div :class="$style.themeIconContainer">
            <AnimatePresence mode="wait">
              <Motion
                asChild
                v-if="isDark"
                v-bind="themeAnimProps"
              >
                <Icon
                  :name="'lucide:moon'"
                  :class="$style.themeIcon"
                  @click="toggleDark()"
                />
              </Motion>
              <Motion
                asChild
                v-else
                v-bind="themeAnimProps"
              >
                <Icon
                  :name="'lucide:sun'"
                  :class="$style.themeIcon"
                  @click="toggleDark()"
                />
              </Motion>
            </AnimatePresence>
          </div>
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

  .innerCluster {
    align-items: center;
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

  .themeIconContainer {
    display: flex;
  }

  .themeIcon {
    cursor: pointer;

    &:hover {
      color: var(--accent-nav-hover);
    }
  }
</style>
