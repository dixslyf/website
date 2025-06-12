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
    --accent: var(--ctp-macchiato-blue);
    --background-color: var(--ctp-macchiato-base);

    position: relative;

    border-style: solid;
    border-width: 2px;
    border-color: var(--accent);
    border-radius: 4px;

    padding: 20px;
    margin: 8pt 0 0 0;

    background-color: var(--background-color);

    transition: transform 0.2s ease-in-out;
    &:hover {
      --accent: var(--accent-hover, var(--ctp-macchiato-pink));
      transform: scale(1.01);
    }

    .section-title {
      position: absolute;
      top: -0.75em;
      left: 8pt;

      padding: 0 4px;
      margin: 0;

      font-size: 12pt;
      color: var(--accent);
      background-color: var(--background-color);
    }
  }
</style>
