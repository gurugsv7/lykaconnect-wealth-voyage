import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/lykaconnect-wealth-voyage/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

// To fix favicon.ico 404:
// 1. Place your favicon.ico file in the "public" folder at:
//    c:\Users\gurug\OneDrive\Desktop\web apps\lykaconnect-wealth-voyage\public\favicon.ico
// 2. No code change is needed if favicon.ico is present in the public folder.
// Vite will automatically serve /favicon.ico from /public.
