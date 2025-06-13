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
    padding: 32px 0;
  }

  .subroot-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 70%;
  }

  .content-container-wrapper {
    position: relative;
  }

  .content-container {
    position: absolute;
    margin-bottom: 32px;
  }
</style>
