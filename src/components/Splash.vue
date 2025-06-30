<script setup lang="ts">
  // For avoiding layout shift during initial load.
  const showNameDisplay = ref(false);
  onMounted(() => {
    showNameDisplay.value = true;
  });
</script>

<template>
  <div :class="$style.splashRoot">
    <Stack :class="$style.splashStack">
      <Center>
        <Motion
          v-if="showNameDisplay"
          v-bind="fadeProps()"
          asChild
        >
          <NameDisplay :class="$style.splashContent" />
        </Motion>
      </Center>
    </Stack>
  </div>
</template>

<style module>
  .splashRoot {
    position: fixed;
    z-index: 9999;

    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-color: var(--bg);
  }

  .splashStack {
    height: 80%;
    justify-content: center;
  }
</style>
