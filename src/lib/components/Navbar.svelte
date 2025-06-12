<script lang="ts">
  import { page } from "$app/state";

  import { Section } from "$lib/components";

  const pathname = $derived(page.url.pathname);

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

  function linkClasses(href: string) {
    return href === pathname ? "link link-current" : "link";
  }
</script>

<Section title="navbar">
  <div class="navbar">
    {#each pages as page (page.display)}
      <div class="link-container">
        <a href={page.href} class={linkClasses(page.href)}>{page.display}</a>
      </div>
    {/each}
  </div>
</Section>

<style>
  .navbar {
    display: flex;
    align-items: center;
  }

  .link-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .link {
    font-size: 16pt;
    text-align: center;
    text-decoration: none;

    color: var(--ctp-macchiato-text);
    &:hover {
      color: var(--ctp-macchiato-blue);
    }
  }

  .link-current {
    font-weight: bold;
    /* --accent is set by the Section */
    color: var(--accent);
  }
</style>
