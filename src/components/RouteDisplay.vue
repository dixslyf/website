<script setup lang="ts">
  import { onMounted, ref } from "vue";

  import { useEventListener } from "@vueuse/core";

  import RawRouteDisplay from "./RawRouteDisplay.vue";

  const { initialRoutePath } = defineProps<{ initialRoutePath: string }>();

  const currentRoutePath = ref(initialRoutePath);

  onMounted(() => {
    useEventListener(document, "astro:before-preparation", (event) => {
      // Eagerly set up the route display's current path.
      currentRoutePath.value = event.to.pathname;
    });
  });
</script>

<template>
  <RawRouteDisplay :currentRoutePath />
</template>
