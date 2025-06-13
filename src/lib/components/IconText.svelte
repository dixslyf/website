<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    icon?: Snippet;
    class?: string;
    label: string;
  } & HTMLAttributes<HTMLDivElement>;
  const { icon, label, class: className, ...rest }: Props = $props();
</script>

<div class="root {className}" {...rest}>
  {#if icon}
    <span class="icon">{@render icon()}</span>
  {/if}
  <span class="label">{label}</span>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;

    padding: var(--padding, 0.4em 0.6em);
    line-height: 0;

    border-radius: 8px;

    background-color: var(--bg, var(--ctp-macchiato-surface0));
  }

  .icon {
    color: var(--icon-color, var(--ctp-macchiato-flamingo));
  }

  .label {
    font-size: var(--font-size, 10pt);
    font-weight: 600;
  }
</style>
