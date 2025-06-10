<script>
  const { class: className = "", style = "", children } = $props();
</script>

<div class="stack {className}" {style}>{@render children()}</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    align-items: var(--align, stretch);
    justify-content: var(--justify, flex-start);

    gap: var(--gap, 8px);
    padding: var(--padding, 0);
  }
</style>
