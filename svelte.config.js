import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
    preprocess: [vitePreprocess(), mdsvex()],
    extensions: [".svelte", ".svx"],
};

export default config;
