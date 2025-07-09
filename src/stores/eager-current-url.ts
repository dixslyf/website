import { atom, type PreinitializedWritableAtom } from "nanostores";

export const currentUrl: PreinitializedWritableAtom<URL | null> = atom(null);

export function registerCurrentUrlHook() {
  document.addEventListener("astro:before-preparation", (e) => {
    currentUrl.set(e.to);
  });
}
