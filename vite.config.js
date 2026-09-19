import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/prime-ai-app-builder/",
  plugins: [react()],
});
