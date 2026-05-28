import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.glb"],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("three") ||
              id.includes("@react-three") ||
              id.includes("@dimforge/rapier3d-compat") ||
              id.includes("meshline") ||
              id.includes("three-mesh-bvh")
            ) {
              return "vendor-three";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (
              id.includes("react-router-dom") ||
              id.includes("react-router") ||
              id.includes("@remix-run")
            ) {
              return "vendor-router";
            }
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) {
              return "vendor-react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});

