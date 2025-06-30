<script setup lang="ts">
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
  <AnimatePresence>
    <Motion
      v-if="showSplash"
      v-bind="splashProps()"
      asChild
    >
      <Splash />
    </Motion>
  </AnimatePresence>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
