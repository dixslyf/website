<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    title?: string;
    class?: string;
    children: Snippet;
  } & HTMLAttributes<HTMLDivElement>;

  const { title, children, class: className, ...rest }: Props = $props();
</script>

<div class="root {title ? 'pt-[0.75em]' : ''} {className}" {...rest}>
  <div class="subroot">
    {#if title}
      <h2 class="section-title">
        {title}
      </h2>
    {/if}
    <div class="content-container">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .root {
    display: flex;
    box-sizing: border-box;
  }

  .subroot {
    --accent: var(--ctp-macchiato-blue);
    --background-color: var(--ctp-macchiato-base);

    position: relative;

    flex: 1;

    border-style: solid;
    border-width: 2px;
    border-color: var(--accent);
    border-radius: 4px;

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

    .content-container {
      padding: 20px;
    }
  }
</style>
