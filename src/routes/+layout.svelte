<script>
  import "./styles.css";

  import { Navbar } from "$lib/components";

  const { children } = $props();
</script>

<div class="root-container">
  <div class="content-container">
    <Navbar />
    {@render children()}
  </div>
</div>

<style>
  .root-container {
    display: flex;
    justify-content: center;
    padding: 32pt 0;
  }

  .content-container {
    width: 70%;
  }
</style>
