import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use relative base so the build works on any static host (GitHub Pages,
// Netlify, S3, etc.) without path rewrites.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
