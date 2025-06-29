<script setup lang="ts">
  const showSplash = ref(true);

  onBeforeMount(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      showSplash.value = false;
    }
  });

  onMounted(() => {
    if (!showSplash.value) {
      return;
    }

    // Hide the splash after a delay.
    setTimeout(() => {
      showSplash.value = false;
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 2000);
  });
</script>

<template>
  <FadeTransition>
    <Splash v-if="showSplash" />
  </FadeTransition>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
