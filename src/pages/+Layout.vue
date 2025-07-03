<script setup lang="ts">
  import "@/assets/css/global.css";

  import { computed, onMounted, ref } from "vue";

  import { usePageContext } from "vike-vue/usePageContext";

  import { MotionConfig, AnimatePresence, Motion } from "motion-v";

  import { Center, Stack } from "@/components/primitives";
  import { Splash, Navbar } from "@/components";
  import { sortRoutes } from "@/utils/routes";
  import { splashProps } from "@/utils/animations";

  const pageContext = usePageContext();
  const currentRoute = computed(() => pageContext.urlPathname);

  const routes = [
    {
      path: "/",
      name: "about",
    },
    {
      path: "/projects",
      name: "projects",
    },
    {
      path: "/contact",
      name: "contact",
    },
  ].sort((routeA, routeB) => sortRoutes(routeA.name, routeB.name));

  const showSplash = ref(true);
  onMounted(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      showSplash.value = false;
      return;
    }

    showSplash.value = true;

    // Hide the splash after a delay.
    setTimeout(() => {
      showSplash.value = false;
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 3000);
  });
</script>

<template>
  <div :class="$style.root">
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        <Motion
          v-if="showSplash"
          v-bind="splashProps()"
          asChild
        >
          <Splash />
        </Motion>
      </AnimatePresence>
      <Center gutters="0">
        <Stack gap="var(--space-xl)">
          <header>
            <Navbar
              :routes="routes"
              :currentRoutePath="currentRoute"
            />
          </header>

          <slot />
        </Stack>
      </Center>
    </MotionConfig>
  </div>
</template>

<style module>
  .root {
    padding-top: var(--space-m-l);
    padding-bottom: var(--space-xl-2xl);
    padding-inline: var(--space-m);
  }
</style>
