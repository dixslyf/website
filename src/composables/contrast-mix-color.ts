import { computed } from "vue";

import { flavors } from "@catppuccin/palette";

import { resolvedTheme } from "@/stores/theme";
import { useLazyStore } from "./lazy-store";

const DARK_CONTRAST_MIX_COLOR = flavors.macchiato.colors.text.hex;
const LIGHT_CONTRAST_MIX_COLOR = "#654735";

export function useContrastMixColor() {
  const $theme = useLazyStore(resolvedTheme, "light");
  return computed(() =>
    $theme.value === "dark" ? DARK_CONTRAST_MIX_COLOR : LIGHT_CONTRAST_MIX_COLOR,
  );
}
