<script setup lang="ts">
  import { useRouter, RouterView, useRoute } from "vue-router";

  import { Navbar } from "@/components";
  import { Stack, Center } from "@/components/primitives";

  const router = useRouter();
  const route = useRoute();

  const routes = router.options.routes.map(({ path, name }) => ({
    path,
    name: name?.toString() || "undefined",
  }));
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

        <RouterView />
      </Stack>
    </Center>
  </div>
</template>

<style module>
  .root {
    padding-block: var(--space-m-l);
    padding-inline: var(--space-m);
  }
</style>
