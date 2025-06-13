<script>
  import { IconText } from "$lib/components";
  import {
    SiSvelte,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiDrizzle,
    SiJest,
    SiVitest,
    SiPytorch,
    SiPython,
    SiNixos,
    SiCplusplus,
    SiC,
    SiLua,
    SiRust,
    SiGnubash,
    SiGit,
    SiArchlinux,
    SiNeovim,
    SiGithubactions,
    SiMantine,
    SiTypst,
  } from "@icons-pack/svelte-simple-icons";

  const webTech = [
    { icon: SiSvelte, label: "Svelte" },
    { icon: SiReact, label: "React" },
    { icon: SiNextdotjs, label: "Next.js" },
    { icon: SiTailwindcss, label: "TailwindCSS" },
    { icon: SiDrizzle, label: "Drizzle" },
    { icon: SiJest, label: "Jest" },
    { icon: SiVitest, label: "Vitest" },
    { icon: SiMantine, label: "Mantine" },
  ];

  const aiTech = [
    { icon: SiPytorch, label: "PyTorch" },
    { icon: null, label: "Optuna" },
  ];

  const langProTech = [
    { icon: SiPython, label: "Python" },
    { icon: SiNixos, label: "Nix" },
    { icon: null, label: "Java" },
    { icon: SiRust, label: "Rust" },
    { icon: SiTypescript, label: "TypeScript" },
  ];

  const langAcqTech = [
    { icon: SiLua, label: "Lua" },
    { icon: SiC, label: "C" },
    { icon: SiCplusplus, label: "C++" },
    { icon: SiGnubash, label: "Bash" },
  ];

  const ciCdTech = [{ icon: SiGithubactions, label: "GitHub Actions" }];

  const osTech = [
    { icon: SiNixos, label: "NixOS" },
    { icon: SiArchlinux, label: "Arch Linux" },
  ];

  const miscTech = [
    { icon: SiGit, label: "Git" },
    { icon: SiNeovim, label: "Neovim" },
    { icon: SiTypst, label: "Typst" },
  ];
</script>

{#snippet iconSet(items)}
  {#each items as item (item.label)}
    {#snippet icon()}{#if item.icon}<item.icon size="16" />{/if}{/snippet}
    <IconText icon={item.icon ? icon : undefined} label={item.label} />
  {/each}
{/snippet}

<div class="root">
  <div class="adaptive-row">
    <div class="adaptive-cell">
      Web:
      <div class="icon-group">{@render iconSet(webTech)}</div>
    </div>

    <div class="adaptive-cell">
      Machine learning / artificial intelligence:
      <div class="icon-group">{@render iconSet(aiTech)}</div>
    </div>
  </div>

  <div class="adaptive-row">
    <div class="adaptive-cell">
      Languages (proficient):
      <div class="icon-group">{@render iconSet(langProTech)}</div>
    </div>

    <div class="adaptive-cell">
      Languages (acquainted):
      <div class="icon-group">{@render iconSet(langAcqTech)}</div>
    </div>
  </div>

  <div class="adaptive-row">
    <div class="adaptive-cell">
      Continuous development / continuous integration:
      <div class="icon-group">{@render iconSet(ciCdTech)}</div>
    </div>

    <div class="adaptive-cell">
      Operating systems:
      <div class="icon-group">{@render iconSet(osTech)}</div>
    </div>
  </div>

  <div class="adaptive-row">
    <div class="adaptive-cell">
      Miscellaneous:
      <div class="icon-group">{@render iconSet(miscTech)}</div>
    </div>
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .adaptive-row {
    gap: 1.5em 1em;
  }

  .icon-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    margin-top: 8px;
  }
</style>
