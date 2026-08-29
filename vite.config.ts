import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Mobile-first build: relative asset paths so the bundle works when
// loaded from the Capacitor WebView (file:// / capacitor:// origin),
// not just from a normal http(s) host.
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
