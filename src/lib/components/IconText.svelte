<script>
  const props = $props();
</script>

<div class="root">
  {#if props.icon}
    <span class="icon">{@render props.icon()}</span>
  {/if}
  <span class="label">{props.label}</span>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;

    padding: 0.4em 0.6em;

    border-radius: 12px;

    background-color: var(--ctp-macchiato-surface0);
  }

  .icon {
    color: var(--ctp-macchiato-flamingo);
  }

  .label {
    font-size: 10pt;
    font-weight: 600;
  }
</style>
