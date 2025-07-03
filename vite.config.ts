import path from "path";

import vue from "@vitejs/plugin-vue";
import vercel from "vite-plugin-vercel";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vike(), vercel(), vue()],
  build: {
    target: "es2022",
  },
});
