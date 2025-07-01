<script setup lang="ts">
  const {
    height = "1.2em",
    width = "0.15ch",
    radius = "1em",
    color = "currentcolor",
    opacity = "1",
    fadeInDuration = "200ms",
    blinkDuration = "5000ms",
    visible = true,
  } = defineProps<{
    height?: string;
    width?: string;
    radius?: string;
    color?: string;
    opacity?: string;
    fadeInDuration?: string;
    blinkDuration?: string;
    visible?: boolean;
  }>();
</script>

<template>
  <Transition name="textCaret">
    <div
      :class="$style.textCaretContainer"
      v-if="visible"
    >
      <div :class="$style.textCaret"></div>
    </div>
  </Transition>
</template>

<style module>
  .textCaretContainer {
    position: relative;
    display: inline;
  }

  .textCaret {
    position: absolute;
    display: inline;
    vertical-align: middle;

    left: 0.2ch;
    bottom: 0.08em;

    height: v-bind(height);
    width: v-bind(width);

    border-radius: v-bind(radius);

    background-color: v-bind(color);
  }
</style>

<style>
  @keyframes blink {
    0% {
      opacity: v-bind(opacity);
    }

    14% {
      opacity: 0;
    }

    28% {
      opacity: v-bind(opacity);
    }

    42% {
      opacity: 0;
    }

    56% {
      opacity: v-bind(opacity);
    }

    70% {
      opacity: 0;
    }

    84% {
      opacity: v-bind(opacity);
    }

    98% {
      opacity: 0;
    }
  }

  .textCaret-enter-active {
    transition: opacity v-bind(fadeInDuration) linear;
  }

  .textCaret-enter-to,
  .textCaret-leave-from {
    opacity: v-bind(opacity);
  }

  .textCaret-enter-from,
  .textCaret-leave-to {
    opacity: 0;
  }

  .textCaret-leave-active {
    animation-name: blink;
    animation-duration: v-bind(blinkDuration);
    animation-timing-function: linear;
  }
</style>
