<script setup lang="ts">
  import { computed, ref, type Ref } from "vue";

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

  type HoveredLanguage = {
    source: "bar-section" | "icon-text";
    language: string;
  };
  let hoveredLang: Ref<HoveredLanguage | null> = ref(null);
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
            [$style.highlighted]: hoveredLang?.language === language,
            [$style.dimmed]: hoveredLang !== null && hoveredLang.language !== language,
          },
        ]"
        :style="`background-color: ${color}; width: ${percentage}%;`"
        @mouseenter="hoveredLang = { source: 'bar-section', language }"
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
              [$style.langBadgeHover]:
                hoveredLang?.language === language && hoveredLang?.source === 'bar-section',
            },
          ]"
        >
          <IconText
            :icon="icon"
            :iconColor="color"
            @mouseenter="hoveredLang = { source: 'icon-text', language }"
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
      border-radius: 2px !important;
      z-index: 50;
    }

    &:first-child {
      border-radius: 2px 0 0 2px;
    }

    &:last-child {
      border-radius: 0 2px 2px 0;
    }
  }

  .langBadge {
    transition: transform 100ms ease-in-out;

    &:hover {
      outline: 2px solid var(--accent-sec);
    }
  }

  .langBadgeHover {
    transform: translateY(-0.4em);
    outline: 2px solid var(--accent-sec);
  }
</style>
