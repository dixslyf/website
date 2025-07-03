import vikeVue from "vike-vue/config";
import * as vercel from "@vite-plugin-vercel/vike/config";
import type { Config } from "vike/types";

export default {
  title: "dixslyf",
  description: "dixslyf's website",
  extends: [vikeVue, vercel],
  prerender: {
    enable: true,
    keepDistServer: true, // Needed for Vercel plugin.
  },
} satisfies Config;
