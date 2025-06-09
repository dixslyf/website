<script>
  import { Section } from "$lib/components";
  const pages = [
    {
      display: "about",
      href: "/",
    },
    {
      display: "projects",
      href: "/projects",
    },
    {
      display: "contact",
      href: "/contact",
    },
  ];
</script>

<Section title="navbar">
  <div class="navbar">
    {#each pages as page (page.display)}
      <div class="link-container"><a href={page.href}>{page.display}</a></div>
    {/each}
  </div>
</Section>

<style>
  .navbar {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .link-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .link-container > a {
    font-size: 16pt;
    text-align: center;
  }
</style>
