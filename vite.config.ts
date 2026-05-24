import { defineConfig } from "vitest/config";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/killbox/" : "/",
  build: {
    target: "es2022"
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
