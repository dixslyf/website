<script setup lang="ts">
  const showSplash = ref(true);
  onMounted(() => {
    // Hide the splash after a delay.
    setTimeout(() => {
      showSplash.value = false;
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
