import vikeVue from "vike-vue/config";
import type { Config } from "vike/types";

export default {
  title: "dixslyf",
  description: "dixslyf's website",
  extends: vikeVue as typeof vikeVue,
  prerender: true,
} satisfies Config;
