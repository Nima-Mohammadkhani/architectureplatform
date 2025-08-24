import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Pages({
      dirs: "src/pages",
      extensions: ["tsx", "ts", "jsx", "js"],
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: "architectureplatform",
        short_name: "architectureplatform",
        description:
          "A PWA platform for architecture and interior design with projects, services, blog, and shop.",
        theme_color: "#ffffff",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
