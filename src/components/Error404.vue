<script setup lang="ts">
  import { Stack } from "@/components/primitives";
</script>

<template>
  <Stack gap="var(--space-2xs)">
    <span
      :class="[$style.glitch, $style.glitchAnim1, $style.error404]"
      data-text="404"
    >
      404
    </span>
    <br />
    <span
      :class="[$style.glitch, $style.glitchAnim2, $style.errorNotFound]"
      data-text="NOT FOUND"
    >
      NOT FOUND
    </span>
  </Stack>
</template>

<style module>
  .error404,
  .errorNotFound {
    font-family: "Sixtyfour Variable", monospace;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings:
      "BLED" 0,
      "SCAN" 5;
    text-align: center;
  }

  .error404 {
    font-size: var(--type-6);
    color: var(--ctp-macchiato-red);
  }

  .errorNotFound {
    font-size: var(--type-4);
    color: var(--ctp-macchiato-flamingo);
  }

  /* Based on: https://codepen.io/alexnoz/pen/PmvMZm */
  .glitch {
    text-align: center;
    transform: scaleX(var(--scale, 1));
    text-shadow: 0 0 0.1em;
  }

  .glitch::before,
  .glitch::after {
    --slice-offset-index: 0;
    --horizontal-offset-factor: 0;
    --slice-height: 30%;

    --slice-y-start: calc(var(--slice-offset-index) * 10%);
    --slice-y-end: calc(var(--slice-y-start) + var(--slice-height));

    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;

    clip-path: polygon(
      0% var(--slice-y-start),
      100% var(--slice-y-start),
      100% var(--slice-y-end),
      0% var(--slice-y-end)
    );

    transform: translateX(calc(var(--horizontal-offset-factor) * 100%));

    text-shadow:
      calc(var(--horizontal-offset-factor) * -3em) 0 0.02em lime,
      calc(var(--horizontal-offset-factor) * -6em) 0 0.02em magenta;

    filter: drop-shadow(0 0 transparent);
  }

  .glitchAnim1 {
    animation: glitch-parent-scale 10s infinite alternate;
  }

  .glitchAnim1::before {
    animation: glitch-before 1.5s infinite alternate-reverse;
  }

  .glitchAnim1::after {
    animation: glitch-after 3s infinite alternate;
  }

  .glitchAnim2 {
    animation: glitch-parent-scale 20s 1s infinite alternate-reverse;
  }

  .glitchAnim2::before {
    animation: glitch-before 2.5s 1s infinite alternate;
  }

  .glitchAnim2::after {
    animation: glitch-after 3s 1s infinite alternate-reverse;
  }

  @keyframes glitch-parent-scale {
    15% {
      --scale: 0.8;
    }
    35% {
      --scale: 1.1;
    }
    40% {
      --scale: 1.2;
    }
    50% {
      --scale: 0.9;
    }
    85% {
      --scale: 1;
    }
  }

  @keyframes glitch-after {
    10%,
    30%,
    50%,
    70%,
    90% {
      --slice-offset-index: 0;
      --horizontal-offset-factor: 0;
    }
    0% {
      --slice-height: 15%;
    }
    20% {
      --horizontal-offset-factor: 0.01;
    }
    40% {
      --horizontal-offset-factor: 0.02;
      --slice-height: 20%;
      --slice-offset-index: 3;
    }
    60% {
      --horizontal-offset-factor: 0.05;
      --slice-height: 25%;
      --slice-offset-index: 6;
    }
    80% {
      --horizontal-offset-factor: 0.08;
      --slice-height: 5%;
      --slice-offset-index: 8;
    }
    100% {
      --horizontal-offset-factor: 0.09;
      --slice-height: 30%;
      --slice-offset-index: 1;
    }
  }

  @keyframes glitch-before {
    10%,
    30%,
    50%,
    70%,
    90% {
      --slice-offset-index: 0;
      --horizontal-offset-factor: 0;
    }
    0% {
      --slice-height: 15%;
      --slice-offset-index: 10;
    }
    20% {
      --horizontal-offset-factor: -0.01;
    }
    40% {
      --horizontal-offset-factor: -0.02;
      --slice-height: 17%;
      --slice-offset-index: 3;
    }
    60% {
      --horizontal-offset-factor: -0.05;
      --slice-height: 35%;
      --slice-offset-index: 6;
    }
    80% {
      --horizontal-offset-factor: -0.08;
      --slice-height: 5%;
      --slice-offset-index: 8;
    }
    100% {
      --horizontal-offset-factor: -0.09;
      --slice-height: 30%;
      --slice-offset-index: 1;
    }
  }
</style>
