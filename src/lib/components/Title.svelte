<script>
  import { page } from "$app/state";
  import { fade } from "svelte/transition";
  import { watch } from "runed";

  import { Typewriter, TypewriterState } from "$lib/utils";
  import { TextCaret } from "$lib/components";
  import { blink } from "$lib/transitions";

  const pathname = $derived(page.url.pathname);
  const pathnameDisplay = $derived(pathname === "/" ? "" : pathname);

  const typewriter = new Typewriter();
  watch(
    () => pathnameDisplay,
    (value) => {
      typewriter.type(value);
    }
  );
</script>

<h1 class="title">
  /home/dixslyf{typewriter.current}{#if typewriter.state !== TypewriterState.Idle}<span
      in:fade={{ duration: 200 }}
      out:blink
    >
      <TextCaret --color="var(--ctp-macchiato-lavender)" />
    </span>{/if}
</h1>

<style>
  .title {
    color: var(--ctp-macchiato-lavender);
  }
</style>
