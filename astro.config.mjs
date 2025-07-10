// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.dixslyf.dev",
  integrations: [vue(), sitemap()],
  adapter: vercel({
    isr: {
      expiration: 60 * 60,
    },
  }),
});
