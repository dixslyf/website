import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const THEME_KEY = "theme" as const;

export type Theme = "system" | "dark" | "light";

export const theme = persistentAtom<Theme>(THEME_KEY, "system");

export const resolvedTheme = atom<Exclude<Theme, "system"> | undefined>(
  (function () {
    const t = theme.get();
    return t === "system" ? undefined : t;
  })(),
);

const THEME_ORDER = ["system", "dark", "light"] as const;
export function cycleTheme() {
  const current = theme.get();
  const idx = THEME_ORDER.findIndex((t) => t === current);

  const newIdx = (idx + 1) % THEME_ORDER.length;
  const newTheme = THEME_ORDER[newIdx];

  theme.set(newTheme);
}

function applyTheme(theme: Exclude<Theme, "system">) {
  resolvedTheme.set(theme);

  if (theme === "dark") {
    document.body.classList.add("dark");
    return;
  }

  // Light.
  document.body.classList.remove("dark");
}

function applyMediaQueryTheme(query: { matches: boolean }) {
  applyTheme(query.matches ? "dark" : "light");
}

export function registerThemeApply() {
  theme.subscribe((t) => {
    if (t === "system") {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      query.removeEventListener("change", applyMediaQueryTheme); // Prevent redundant listener.
      query.addEventListener("change", applyMediaQueryTheme);
      applyMediaQueryTheme(query);
      return;
    }

    applyTheme(t);
  });
}
