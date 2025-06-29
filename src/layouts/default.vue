<script setup lang="ts">
  import { useRoute, useRouter } from "#imports";

  const router = useRouter();
  const route = useRoute();

  const routes = router.options.routes
    .map(({ path, name }) => ({
      path,
      name: name?.toString() || "undefined",
    }))
    // Sort order: about, projects, contact
    .sort((routeA, routeB) => {
      if (routeA.name === "about") {
        return -1;
      }

      if (routeB.name === "about") {
        return 1;
      }

      if (routeA.name === "projects" && routeB.name === "contact") {
        return -1;
      }

      if (routeA.name === "contact" && routeB.name === "projects") {
        return 1;
      }

      return 0;
    });
</script>

<template>
  <div :class="$style.root">
    <Center gutters="0">
      <Stack gap="var(--space-m)">
        <header>
          <Navbar
            :routes="routes"
            :currentRoutePath="route.path"
          />
        </header>

        <slot />
      </Stack>
    </Center>
  </div>
</template>

<style module>
  .root {
    padding-top: var(--space-m-l);
    padding-bottom: var(--space-xl-2xl);
    padding-inline: var(--space-m);
  }
</style>
