<script>
  const { class: className = "", style = "", children } = $props();
</script>

<div class="group {className}" {style}>{@render children()}</div>

<style>
  .group {
    display: flex;
    flex-direction: row;
    flex-wrap: var(--wrap, nowrap);
    justify-content: var(--justify, flex-start);
    align-items: var(--align, center);

    gap: var(--gap, 8px);
    padding: var(--padding, 0);
  }
</style>
