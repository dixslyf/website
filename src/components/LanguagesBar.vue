<script setup lang="ts">
  import { computed, ref, type Ref } from "vue";

  import { Stack, Cluster } from "@/components/primitives";
  import { IconText, Badge } from "@/components";
  import { getLanguageIcon, getLanguageColor } from "@/utils/languages";

  const { languages } = defineProps<{
    languages: Record<string, number>;
  }>();

  const langsSizeTotal = computed(() =>
    Object.values(languages).reduce((prev, curr) => prev + curr),
  );

  const langsProcessed = computed(() =>
    Object.entries(languages)
      .sort(([, size1], [, size2]) => size2 - size1) // Sort by size in descending order.
      .map(([lang, size]) => ({
        language: lang,
        percentage: (100 * size) / langsSizeTotal.value,
        icon: getLanguageIcon(lang),
        color: getLanguageColor(lang),
      })),
  );

  let hoveredLang: Ref<string | null> = ref(null);
</script>

<template>
  <Stack>
    <IconText icon="lucide:code"><span :class="$style.languagesLabel">Languages</span></IconText>
    <Stack
      direction="row"
      gap="0"
      :class="$style.bar"
    >
      <div
        v-for="{ language, percentage, color } in langsProcessed"
        :key="language"
        :class="[
          $style.barSection,
          {
            [$style.highlighted]: hoveredLang === language,
            [$style.dimmed]: hoveredLang && hoveredLang !== language,
          },
        ]"
        :style="`background-color: ${color}; width: ${percentage}%;`"
        @mouseenter="hoveredLang = language"
        @mouseleave="hoveredLang = null"
      ></div>
    </Stack>
    <Cluster row-gap="var(--space-xs)">
      <template
        v-for="{ language, percentage, color, icon } in langsProcessed"
        :key="language"
      >
        <Badge
          :class="[
            $style.langBadge,
            {
              [$style.langBadgeHover]: hoveredLang === language,
            },
          ]"
        >
          <IconText
            :icon="icon"
            :iconColor="color"
            @mouseenter="hoveredLang = language"
            @mouseleave="hoveredLang = null"
          >
            {{ language }} {{ percentage > 0.1 ? percentage.toFixed(1) : "< 0.1" }}%
          </IconText>
        </Badge>
      </template>
    </Cluster>
  </Stack>
</template>

<style module>
  .languagesLabel {
    font-weight: 600;
  }

  .bar {
    height: 0.5rem;
  }

  .dimmed {
    filter: brightness(70%) contrast(80%);
  }

  .barSection {
    transition: filter 0.2s ease-in-out;

    &.highlighted {
      outline: 2px solid var(--accent-sec);
      border-radius: var(--border-radius) !important;
      z-index: 50;
    }

    &:first-child {
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }

    &:last-child {
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
  }

  .langBadge {
    transition: transform 100ms ease-in-out;
  }

  .langBadgeHover {
    transform: scale(1.03);
    outline: 2px solid var(--accent-sec);
  }
</style>
