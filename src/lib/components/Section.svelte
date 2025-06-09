<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    title: string | null;
    children: Snippet;
  };

  const { title = null, children }: Props = $props();
</script>

<div class="section">
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
  }

  .section-title {
    position: absolute;
    top: -0.75em;
    left: 8pt;

    padding: 0 4px;
    margin: 0;

    font-size: 12pt;
    color: var(--ctp-macchiato-mauve);
    background-color: var(--ctp-macchiato-base);
  }
</style>
