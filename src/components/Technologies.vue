<script setup lang="ts">
  import { computed, type ComputedRef } from "vue";

  import * as simpleIcons from "simple-icons";
  import type { SimpleIcon } from "simple-icons";

  import { Badge, IconText } from "@/components";
  import { Box, Grid, Stack, Cluster } from "@/components/primitives";
  import { contrastColor, FALLBACK_LANG_COLOR, getLanguageColor } from "@/utils/languages";
  import { useOverlayBg } from "@/composables/overlay-bg";
  import { useContrastMixColor } from "@/composables/contrast-mix-color";

  const overlayBg = useOverlayBg();
  const contrastMixColor = useContrastMixColor();

  type Tech = {
    icon: string | null;
    label: string;
    color: ComputedRef<string | null>;
  };

  function getIconColor(tech: Omit<Tech, "color">): string | null {
    const t = { ...tech, label: tech.label === "NixOS" ? "Nix" : tech.label };
    if (!t.icon) {
      return null;
    }

    const color = getLanguageColor(t.label);
    if (color !== FALLBACK_LANG_COLOR) {
      return color;
    }

    if (t.icon.startsWith("simple-icons:")) {
      const slug = t.icon.slice("simple-icons:".length);
      const cSlug = slug[0].toUpperCase() + slug.slice(1);
      const entryName = `si${cSlug}`;
      if (entryName in simpleIcons) {
        const iconData = simpleIcons[entryName as keyof typeof simpleIcons] as SimpleIcon;
        return `#${iconData["hex"]}`;
      }
    }

    return FALLBACK_LANG_COLOR;
  }

  const rawTechData = {
    Web: [
      { icon: "simple-icons:vuedotjs", label: "Vue.js" },
      { icon: "simple-icons:astro", label: "Astro" },
      { icon: "simple-icons:react", label: "React" },
      { icon: "simple-icons:nextdotjs", label: "Next.js" },
      { icon: "simple-icons:tailwindcss", label: "TailwindCSS" },
      { icon: "simple-icons:drizzle", label: "Drizzle" },
      { icon: "simple-icons:jest", label: "Jest" },
      { icon: "simple-icons:vitest", label: "Vitest" },
      { icon: "simple-icons:mantine", label: "Mantine" },
    ],

    "Machine learning / artificial intelligence": [
      { icon: "simple-icons:pytorch", label: "PyTorch" },
      { icon: null, label: "Optuna" },
      { icon: "simple-icons:kaggle", label: "Kaggle" },
    ],

    "Languages (proficient)": [
      { icon: "simple-icons:python", label: "Python" },
      { icon: "simple-icons:nixos", label: "Nix" },
      { icon: "devicon-plain:java", label: "Java" },
      { icon: "simple-icons:rust", label: "Rust" },
      { icon: "simple-icons:typescript", label: "TypeScript" },
    ],

    "Languages (acquainted)": [
      { icon: "simple-icons:lua", label: "Lua" },
      { icon: "simple-icons:c", label: "C" },
      { icon: "simple-icons:cplusplus", label: "C++" },
      { icon: "simple-icons:gnubash", label: "Bash" },
    ],

    "Continuous integration / continuous deployment": [
      { icon: "simple-icons:githubactions", label: "GitHub Actions" },
    ],

    "Operating systems": [
      { icon: "simple-icons:nixos", label: "NixOS" },
      { icon: "simple-icons:archlinux", label: "Arch Linux" },
    ],

    Miscellaneous: [
      { icon: "simple-icons:git", label: "Git" },
      { icon: "simple-icons:neovim", label: "Neovim" },
      { icon: "simple-icons:typst", label: "Typst" },
    ],

    "Experimented with": [
      { icon: "simple-icons:nuxt", label: "Nuxt" },
      { icon: "simple-icons:svelte", label: "Svelte" },
      { icon: null, label: "Vike" },
    ],
  };

  const techData: Record<string, Tech[]> = Object.fromEntries(
    Object.entries(rawTechData).map(([cat, entries]) => [
      cat,
      entries.map(({ icon, label }) => ({
        icon,
        label,
        color: computed(() => {
          const base = getIconColor({ icon, label });
          if (!base) return null;
          return contrastColor(base, overlayBg.value, contrastMixColor.value);
        }),
      })),
    ]),
  );
</script>

<template>
  <Box
    paddingInline="var(--space-m)"
    paddingBlock="var(--space-m)"
    label="Technologies and Skills"
    labelComponent="h1"
  >
    <Grid
      target-min-width="25rem"
      gap="var(--space-l)"
    >
      <Stack
        v-for="[cat, values] in Object.entries(techData)"
        gap="0.5em"
      >
        <p :class="$style.categoryLabel">{{ cat }}:</p>
        <Cluster
          columnGap="var(--space-xs)"
          rowGap="var(--space-xs)"
        >
          <Badge v-for="{ icon, label, color } in values">
            <IconText
              :icon="icon"
              :iconColor="color.value ?? undefined"
              >{{ label }}</IconText
            >
          </Badge>
        </Cluster>
      </Stack>
    </Grid>
  </Box>
</template>

<style module>
  .categoryLabel {
    text-align: left;
  }
</style>
