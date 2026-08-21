import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => ({
  base: process.env.GITHUB_PAGES === "true" ? "/bijli-bhai/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [command === "serve" && dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
