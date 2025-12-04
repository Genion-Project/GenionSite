import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: "https://genion.site",
  integrations: [tailwind(), sitemap()],
  output: "static",
  adapter: vercel(),
});
