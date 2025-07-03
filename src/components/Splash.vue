<script setup lang="ts">
  import { onMounted, ref } from "vue";

  import { AnimatePresence, Motion, motion } from "motion-v";

  import { Stack, Center } from "@/components/primitives";
  import { NameDisplay } from "@/components";
  import { splashProps, fadeProps } from "@/utils/animations";

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

  // For avoiding layout shift during initial load.
  const showNameDisplay = ref(false);
  onMounted(() => {
    showNameDisplay.value = true;
  });
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="showSplash"
      v-bind="splashProps()"
      :class="$style.splashRoot"
    >
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
    </motion.div>
  </AnimatePresence>
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
