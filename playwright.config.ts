import { defineConfig, devices } from "@playwright/test";

const publicBaseURL = process.env.KILLBOX_PUBLIC_BASE_URL?.trim();
const localBaseURL = process.env.PLAYWRIGHT_BASE_URL?.trim() || "http://127.0.0.1:4173";
const baseURL = publicBaseURL || localBaseURL;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry"
  },
  ...(publicBaseURL
    ? {}
    : {
        webServer: {
          command: "npm run preview",
          url: localBaseURL,
          reuseExistingServer: true
        }
      }),
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
