import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api/pipeline': 'http://127.0.0.1:8787' } },
  test: { environment: "jsdom", include: ["src/**/*.test.{ts,tsx}"] },
});
