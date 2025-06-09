<script>
  import { page } from "$app/state";
  import { watch } from "runed";

  import { Typewriter } from "$lib/utils";

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
  /home/dixslyf{typewriter.current}
</h1>

<style>
  .title {
    color: var(--ctp-macchiato-lavender);
  }
</style>
