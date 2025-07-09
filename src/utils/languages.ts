import langColors from "gh-lang-colors";

import { type IconifyJSON } from "@iconify/types";
import simpleIconsJson from "@iconify-json/simple-icons/icons.json";
import deviconJson from "@iconify-json/devicon-plain/icons.json";

import chroma from "chroma-js";

export const FALLBACK_LANG_COLOR = "#cccccc";
export const MIN_COLOR_CONTRAST = 4.5;

export function getLanguageColor(lang: string): string {
  return lang in langColors ? langColors[lang as keyof typeof langColors] : FALLBACK_LANG_COLOR;
}

export function contrastColor(fg: string, bg: string, mix: string): string {
  const fgC = chroma(fg);
  const bgC = chroma(bg);
  const mixC = chroma(mix);

  let newFgC = fgC;
  for (let step = 0; step < 10; step++) {
    const contrast = chroma.contrast(newFgC, bgC);
    if (contrast >= MIN_COLOR_CONTRAST) {
      break;
    }

    const ratio = (1 / contrast) * 0.3;
    newFgC = newFgC.mix(mixC, ratio, "oklch");
  }

  return newFgC.hex("rgb");
}

export function getLanguageIcon(lang: string): string | null {
  lang = lang.toLowerCase();

  // Special cases.
  if (lang === "nix") {
    return "simple-icons:nixos";
  }

  if (lang === "vue") {
    return "simple-icons:vuedotjs";
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
