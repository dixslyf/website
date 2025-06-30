// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "motion-v/nuxt"],
  srcDir: "src/",
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  css: ["@/assets/css/styles.css"],
  fonts: {
    families: [
      { name: "Iosevka", weights: [400, 500, 600, 700] },
      { name: "Noto Sans SC", weights: ["100 900"] },
    ],
  },
  runtimeConfig: {
    githubToken: "",
  },
  app: {
    pageTransition: { name: "page-slide-left", mode: "out-in" },
  },
});
