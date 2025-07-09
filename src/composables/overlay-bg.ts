import { computed } from "vue";

import { flavors } from "@catppuccin/palette";

import { resolvedTheme } from "@/stores/theme";
import { useLazyStore } from "./lazy-store";

const DARK_OVERLAY_BG = flavors.macchiato.colors.base.hex;
const LIGHT_OVERLAY_BG = "#f9f5d7" as const;

export function useOverlayBg() {
  const $theme = useLazyStore(resolvedTheme, "light");
  return computed(() => ($theme.value === "dark" ? DARK_OVERLAY_BG : LIGHT_OVERLAY_BG));
}
