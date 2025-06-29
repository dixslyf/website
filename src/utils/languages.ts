import langColors from "gh-lang-colors";

import { type IconifyJSON } from "@iconify/types";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
import deviconJson from "@iconify-json/devicon-plain/icons.json";

export const FALLBACK_LANG_COLOR = "#cccccc";

export function getLanguageColor(lang: string): string {
  return lang in langColors ? langColors[lang as keyof typeof langColors] : FALLBACK_LANG_COLOR;
}

export function getLanguageIcon(lang: string): string | null {
  lang = lang.toLowerCase();

  // Special cases.
  if (lang === "nix") {
    return "simple-icons:nixos";
  }

  if (lang === "jupyter notebook") {
    return "simple-icons:jupyter";
  }

  if (lang === "shell") {
    return "lucide:square-terminal";
  }

  // Try finding a matching icon from simple icons.
  if (lang in (simpleIconsJson as IconifyJSON)["icons"]) {
    return `simple-icons:${lang}`;
  }

  // Try finding a matching icon from the Devicon set.
  if (lang in (deviconJson as IconifyJSON)["icons"]) {
    return `devicon-plain:${lang}`;
  }

  return null;
}
