<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Component, ComponentType } from "svelte";

  import langColors from "gh-lang-colors";
  import * as si from "@icons-pack/svelte-simple-icons";
  import deviconList from "devicon/devicon.json";
  import { Code, SquareTerminal } from "@lucide/svelte";

  import { IconText } from ".";

  const FALLBACK_LANG_COLOR = "#cccccc";

  type Props = {
    languages: Record<string, number>;
  } & HTMLAttributes<HTMLDivElement>;

  const { languages, ...rest }: Props = $props();

  function getLangColor(lang: string): string {
    return lang in langColors ? langColors[lang as keyof typeof langColors] : FALLBACK_LANG_COLOR;
  }

  type IconDescriptor =
    | {
        set: "SimpleIcons";
        component: ComponentType; // SimpleIcons still uses ComponentType even though it is deprecated.
      }
    | {
        set: "Devicon";
        cssClass: string;
      }
    | {
        set: "Lucide";
        component: Component;
      };

  function getLangIconDescriptor(lang: string): IconDescriptor | null {
    lang = lang.toLowerCase();

    // Special cases.
    if (lang === "nix") {
      return {
        set: "SimpleIcons",
        component: si.SiNixos,
      };
    } else if (lang === "jupyter notebook") {
      return {
        set: "SimpleIcons",
        component: si.SiJupyter,
      };
    } else if (lang === "shell") {
      return {
        set: "Lucide",
        component: SquareTerminal,
      };
    }

    // Try finding a matching icon from simple icons.
    // Most icons seem to only have the first letter after the Si prefix capitalised.
    const iconSuffix = lang.charAt(0).toUpperCase() + lang.slice(1);
    const iconName = `Si${iconSuffix}`;
    if (iconName in si) {
      return { set: "SimpleIcons", component: si[iconName as keyof typeof si] };
    }

    // Try finding a matching icon from the Devicon set.
    // Entry names are always in lowercase it seems.
    const deviconMatch = deviconList.find((entry) => entry.name === lang);
    if (!deviconMatch) {
      return null;
    }

    // Reference for versions:
    // - https://github.com/devicons/devicon/blob/ca28c779441053191ff11710fe24a9e6c23690d6/devicon.json
    // - https://github.com/devicons/devicon/blob/ca28c779441053191ff11710fe24a9e6c23690d6/CONTRIBUTING.md
    const hasPlain = deviconMatch.versions.font.includes("plain");
    const hasOriginal = deviconMatch.versions.font.includes("original");
    const hasLine = deviconMatch.versions.font.includes("line");
    if (!hasPlain && !hasOriginal && !hasLine) {
      return null;
    }

    // Prefer plain > original > line.
    const version = hasPlain ? "plain" : hasOriginal ? "original" : "line";
    return { set: "Devicon", cssClass: `devicon-${lang}-${version}` };
  }

  const langsSizeTotal = $derived(Object.values(languages).reduce((prev, curr) => prev + curr));
  const languagesProcessed = $derived(
    Object.entries(languages)
      .sort(([, size1], [, size2]) => size2 - size1)
      .map(([language, size]) => ({
        language,
        percentage: (100 * size) / langsSizeTotal,
        iconDescriptor: getLangIconDescriptor(language),
        color: getLangColor(language),
      }))
  );

  type HoveredLanguage = {
    source: "bar-section" | "icon-text";
    language: string;
  };
  let hoveredLang: HoveredLanguage | null = $state(null);
  function iconTextClasses(language: string) {
    const base = "transition transform duration-100 ease-in-out ";

    if (hoveredLang?.language !== language) {
      return base;
    }

    const hovered = base + "outline-[2px] outline-solid outline-(--ctp-macchiato-pink) ";
    return hovered + (hoveredLang.source === "bar-section" ? "-translate-y-[4px]" : "");
  }
</script>

<div class="root" {...rest}>
  <label class="label"><Code />Languages</label>
  <div class="bar">
    {#each languagesProcessed as { language, percentage, color } (language)}
      <div
        class="bar-section"
        class:highlighted={hoveredLang?.language === language}
        class:dimmed={hoveredLang !== null && hoveredLang.language !== language}
        style="background-color: {color}; width: {percentage}%;"
        onmouseenter={() => (hoveredLang = { source: "bar-section", language })}
        onmouseleave={() => (hoveredLang = null)}
      ></div>
    {/each}
  </div>
  <div class="adaptive-row legend">
    {#each languagesProcessed as { language, percentage, color, iconDescriptor } (language)}
      <!-- Svelte seems to require dot notation to use a component from a variable. -->
      {#snippet icon()}
        {#if iconDescriptor?.set === "SimpleIcons" || iconDescriptor?.set === "Lucide"}
          <iconDescriptor.component />
        {:else if iconDescriptor?.set === "Devicon"}
          <i class={iconDescriptor.cssClass}></i>
        {/if}
      {/snippet}
      <IconText
        icon={iconDescriptor ? icon : undefined}
        label="{language} {percentage.toFixed(1)}%"
        onmouseenter={() => (hoveredLang = { source: "icon-text", language })}
        onmouseleave={() => (hoveredLang = null)}
        class={iconTextClasses(language)}
        --icon-color={color}
      ></IconText>
    {/each}
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 0;
    gap: 0.5em;
  }

  .bar {
    display: flex;
    flex-direction: row;

    height: 8px;
  }

  .dimmed {
    filter: brightness(70%) contrast(80%);
  }

  .bar-section {
    transition: filter 0.2s ease-in-out;
  }

  .bar-section.highlighted {
    outline: 2px solid var(--ctp-macchiato-pink);
    border-radius: 2px !important;
    z-index: 50;
  }

  .bar-section:first-child {
    border-radius: 2px 0 0 2px;
  }

  .bar-section:last-child {
    border-radius: 0 2px 2px 0;
  }

  .legend {
    margin-top: 8px;
    gap: 8px;
    flex-wrap: wrap;
  }
</style>
