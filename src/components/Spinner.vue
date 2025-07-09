<script setup lang="ts">
  import { computed } from "vue";

  const {
    count = 8,
    barStartHeight = "0.8rem",
    barPeakHeight = "6rem",
    barWidth = "0.8rem",
    barRadius = "0.8rem",
    barGap = "0.8rem",
    color = "var(--accent)",
    duration = 2400,
  } = defineProps<{
    count?: number;
    barStartHeight?: string;
    barPeakHeight?: string;
    barWidth?: string;
    barRadius?: string;
    barGap?: string;
    color?: string;
    duration?: number;
  }>();

  const durationStr = computed(() => `${duration}ms`);

  function easeDelay(idx: number, count: number): number {
    const x = (20 * idx) / count;
    return x * x;
  }
</script>

<template>
  <div :class="$style.spinner">
    <div
      v-for="idx in [...Array(count).keys()]"
      :key="idx"
      :class="$style.spinnerBar"
      :style="`animation-delay: ${easeDelay(idx, count)}ms`"
    ></div>
  </div>
</template>

<style module>
  .spinner {
    --bar-start-height: v-bind(barStartHeight);
    --bar-peak-height: v-bind(barPeakHeight);
    --bar-width: v-bind(barWidth);
    --bar-radius: v-bind(barRadius);
    --bar-gap: v-bind(barGap);
    --color: v-bind(color);
    --duration: v-bind(durationStr);

    display: flex;
    flex-direction: row;
    align-items: center;
    width: min-content;
    gap: var(--bar-gap);
    height: var(--bar-peak-height);
  }

  .spinnerBar {
    height: var(--bar-start-height);
    width: var(--bar-width);
    border-radius: var(--bar-radius);

    background-color: var(--color);
    animation: stretch var(--duration) ease-in-out infinite;
  }

  @keyframes stretch {
    0%,
    40%,
    100% {
      height: var(--bar-start-height);
      background-color: var(--color);
    }

    20% {
      height: 100%;
      background-color: var(--color);
    }
  }
</style>
