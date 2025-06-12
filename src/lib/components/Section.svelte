<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    title?: string;
    children: Snippet;
  } & HTMLAttributes<HTMLDivElement>;

  const { title = "", children, ...rest }: Props = $props();
</script>

<div class="section" {...rest}>
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
