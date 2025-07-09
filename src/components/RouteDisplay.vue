<script setup lang="ts">
  import { computed } from "vue";

  import { useStore } from "@nanostores/vue";

  import RawRouteDisplay from "./RawRouteDisplay.vue";
  import { currentUrl } from "@/stores/eager-current-url";

  const { initialRoutePath } = defineProps<{
    initialRoutePath: string;
  }>();

  const $currentUrl = useStore(currentUrl);
  const currentRoutePath = computed(() => $currentUrl.value?.pathname ?? initialRoutePath);
</script>

<template>
  <RawRouteDisplay :currentRoutePath />
</template>
