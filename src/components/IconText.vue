<script setup lang="ts">
  const {
    icon,
    iconSize = "1em",
    iconColor = "currentcolor",
    gap = "0.5em",
    iconYOffset = "-0.04em",
  } = defineProps<{
    icon?: string | null;
    iconSize?: string;
    iconColor?: string;
    gap?: string;
    iconYOffset?: string;
  }>();
</script>

<template>
  <div :class="$style.iconText">
    <Icon
      v-if="icon"
      :name="icon"
      :class="$style.icon"
    />
    <slot />
  </div>
</template>

<style module>
  .iconText {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    gap: v-bind(gap);
  }

  .icon {
    font-size: v-bind(iconSize);
    color: v-bind(iconColor);
    transform: translateY(v-bind(iconYOffset));
  }
</style>
