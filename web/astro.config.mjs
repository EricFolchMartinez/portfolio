// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ericfolch.com",
  integrations: [preact({ compat: true })],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Local dev: forward /api to the FastAPI backend running on :8000.
      proxy: {
        "/api": "http://localhost:8000",
      },
    },
  },
});
