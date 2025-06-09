<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    title: string | null;
    children: Snippet;
  };

  const { title = null, children }: Props = $props();
  const sectionBorderStyle = title === null ? "solid" : "none solid solid solid";
</script>

<div class="section" style="--section-border-style: {sectionBorderStyle}">
  <div class="section-top">
    {#if title !== null}
      <div class="section-top-border-left"></div>
    {/if}
    <h2 class="section-title">
      {title}
    </h2>
    {#if title !== null}
      <div class="section-top-border-right"></div>
    {/if}
  </div>
  {@render children()}
</div>

<style>
  .section {
    position: relative;
    border-style: var(--section-border-style);
    border-width: 2px;
    border-color: var(--ctp-macchiato-mauve);
    border-radius: 4px;
  }

  .section-top {
    position: absolute;
    align-items: center;
    top: -10px;
    width: 100%;

    display: flex;

    font-size: 12pt;
  }

  .section-title {
    font-size: 12pt;
    color: var(--ctp-macchiato-mauve);

    padding: 0 2px;
    margin: 0;
  }

  .section-top-border-left {
    border-style: solid none none solid;
    border-width: 2px;
    border-color: var(--ctp-macchiato-mauve);
    border-radius: 4px 0 0 0;

    height: 8px;
    width: 12px;

    position: relative;
    top: 4px;
    left: -2px;
  }

  .section-top-border-right {
    border-style: solid solid none none;
    border-width: 2px;
    border-color: var(--ctp-macchiato-mauve);
    border-radius: 0 4px 0;

    height: 8px;
    width: 100%;

    position: relative;
    top: 4px;
    left: 2px;
  }
</style>
