<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    title?: string;
    class?: string;
    style?: string;
    children: Snippet;
  };

  const { title = "", class: className = "", style = "", children }: Props = $props();
</script>

<div class="section {className}" {style}>
  <h2 class="section-title">
    {title}
  </h2>
  {@render children()}
</div>

<style>
  .section {
    position: relative;

    border-style: solid;
    border-width: 2px;
    border-color: var(--ctp-macchiato-mauve);
    border-radius: 4px;

    padding: 12px;
    margin: 8pt 0 0 0;
  }

  .section-title {
    position: absolute;
    top: -0.75em;
    left: 16pt;

    padding: 0 4px;
    margin: 0;

    font-size: 12pt;
    color: var(--ctp-macchiato-mauve);
    background-color: var(--ctp-macchiato-base);
  }
</style>
