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
      <a href={page.href}>{page.display}</a>
    {/each}
  </div>
</Section>

<style>
  .navbar {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .navbar > a {
    font-size: 16pt;
    flex-grow: 1;
    text-align: center;
  }
</style>
