<script>
  import "./styles.css";

  import "@fontsource/iosevka/100.css";
  import "@fontsource/iosevka/200.css";
  import "@fontsource/iosevka/300.css";
  import "@fontsource/iosevka/400.css";
  import "@fontsource/iosevka/500.css";
  import "@fontsource/iosevka/600.css";
  import "@fontsource/iosevka/700.css";
  import "@fontsource/iosevka/800.css";
  import "@fontsource/iosevka/900.css";

  import { page } from "$app/state";
  import { fly } from "svelte/transition";

  import { Title, Navbar, Stack, Group } from "$lib/components";

  const { children } = $props();
</script>

<div class="root-container">
  <div class="subroot-container">
    <Stack>
      <Title />
      <Navbar />
      <div class="content-container-wrapper">
        {#key page.url.pathname}
          <div
            class="content-container"
            in:fly={{ x: "30%", duration: 500 }}
            out:fly={{ x: "-30%", duration: 500 }}
          >
            {@render children()}
          </div>
        {/key}
      </div>
    </Stack>
  </div>
</div>

<style>
  .root-container {
    display: flex;
    justify-content: center;
    padding: 32pt 0;
  }

  .subroot-container {
    width: 70%;
  }

  .content-container-wrapper {
    position: relative;
  }

  .content-container {
    position: absolute;
    inset: 0;
  }
</style>
