import { build } from "vite";
import react from "@vitejs/plugin-react";

await build({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "standalone-assets",
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: "src/main.jsx",
      name: "YingguangAdminDemo",
      formats: ["iife"],
      fileName: () => "app.js",
      cssFileName: "app",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css") ? "app.css" : "assets/[name][extname]",
      },
    },
  },
});
