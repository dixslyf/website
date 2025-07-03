<script setup lang="ts">
  import {Box, Stack } from "@/components/primitives";
</script>

<template>
  <Box
    paddingInline="var(--space-m)"
    paddingBlock="var(--space-m)"
    label="About Me"
    labelComponent="h1"
  >
    <Stack gap="1em">
      <p>Hi! I'm Dixon <span class="weak">(Sean Low Yan Feng)</span>. I like to:</p>
      <ul>
        <li>Tinker with <strong>Linux</strong> and <strong>open-source software</strong>.</li>
        <li>
          Use the <strong>terminal</strong>. Here are some of my favourite tools: Neovim, Git, Nix, Zeillj, zoxide.
        </li>
        <li><strong>Learn</strong> new things (usually, but not limited to, software).</li>
      </ul>
      <p>
        I am also passionate about <strong>artificial intelligence</strong>, <strong>software engineering</strong> and
        <strong>reproducibility</strong>.
      </p>
    </Stack>
  </Box>
</template>

<style module>
  .categoryLabel {
    text-align: left;
  }
</style>
