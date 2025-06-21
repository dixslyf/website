<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };
  const { children }: Props = $props();
</script>

<div class="stack">{@render children()}</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--space, 1.5rem);
  }

  .stack > * {
    margin-block: 0;
  }
</style>
