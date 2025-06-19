<script lang="ts">
  type Props = {
    count: number;
  };

  let { count }: Props = $props();

  function easeDelay(idx: number, count: number): number {
    const x = (20 * idx) / count;
    return x * x;
  }
</script>

<div class="root">
  {#each [...Array(count).keys()] as idx (idx)}
    <div class="bar" style="animation-delay: {easeDelay(idx, count)}ms;"></div>
  {/each}
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: min-content;
    gap: 12px;
    height: var(--height, 128px);
  }

  .bar {
    height: 8px;
    width: 8px;
    border-radius: 4px;

    background-color: var(--ctp-macchiato-blue);
    animation: stretch var(--duration, 2.4s) ease-in-out infinite;
  }

  @keyframes stretch {
    0%,
    40%,
    100% {
      height: 8px;
      background-color: var(--ctp-macchiato-blue);
    }

    20% {
      height: 100%;
      background-color: var(--ctp-macchiato-pink);
    }
  }
</style>
