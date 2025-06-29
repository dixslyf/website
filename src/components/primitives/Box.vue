<script setup lang="ts">
  const {
    paddingBlock = "var(--space-s)",
    paddingInline = "var(--space-s)",
    borderWidth = "var(--border-thin)",
    borderColor = "var(--accent)",
    borderColorHover = "var(--accent-sec)",
    label = null,
    labelComponent = "span",
    labelFontSize = "var(--type-0)",
  } = defineProps<{
    paddingBlock?: string;
    paddingInline?: string;
    borderWidth?: string;
    borderColor?: string;
    borderColorHover?: string;
    label?: string;
    labelComponent?: string;
    labelFontSize?: string;
  }>();
</script>

<template>
  <div :class="[$style.box, 'hoverScale']">
    <component
      :is="labelComponent"
      :class="$style.boxLabel"
    >
      {{ label }}
    </component>
    <slot />
  </div>
</template>

<style module>
  .box {
    padding-block: v-bind(paddingBlock);
    padding-inline: v-bind(paddingInline);

    --border-color: v-bind(borderColor);
    --border-color-hover: v-bind(borderColorHover);
    --box-accent: var(--border-color);

    --border-width: v-bind(borderWidth);
    border: var(--border-width) solid var(--box-accent);
    border-radius: var(--border-radius);
    outline: var(--border-width) transparent;
    outline-offset: calc(var(--border-width) * -1);

    &:hover {
      --box-accent: var(--border-color-hover);
    }

    position: relative;
  }

  .boxLabel {
    position: absolute;
    top: -0.75em;
    left: 0.75em;

    padding-inline: 0.25em;

    font-size: v-bind(labelFontSize);
    color: var(--box-accent);
    background-color: var(--bg);
  }
</style>
