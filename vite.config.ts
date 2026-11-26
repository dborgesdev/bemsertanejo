import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { SITE_URL } from "./src/config/siteData";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "site-seo",
      transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", SITE_URL),
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`,
        });
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc></url>
</urlset>
`,
        });
      },
    },
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
