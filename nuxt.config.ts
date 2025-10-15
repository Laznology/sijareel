// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindss()],
  },
  ui: {
    colorMode: false,
  },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],
});
