<script>
  import "./styles.css";

  import { page } from "$app/state";

  import { Title, Navbar } from "$lib/components";

  const { children } = $props();
</script>

<div class="root-container">
  <div class="subroot-container">
    <Title />
    <Navbar />
    <div class="content-container-wrapper">
      {#key page.url.pathname}
        <div class="content-container">
          {@render children()}
        </div>
      {/key}
    </div>
  </div>
</div>

<style>
  .root-container {
    display: flex;
    justify-content: center;

    flex: 1;
    padding: 32px 0;
  }

  .subroot-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 70%;
  }

  .content-container-wrapper {
    /* See https://stackoverflow.com/a/50086485 */
    display: grid;
    grid-template-columns: 1fr;

    flex: 1;
  }

  .content-container {
    grid-row-start: 1;
    grid-column-start: 1;
  }
</style>
