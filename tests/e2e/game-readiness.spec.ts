import { expect, test, type Page } from "@playwright/test";
import type { KillboxDebugState } from "../../src/game/debug";

const expectedVersion = process.env.KILLBOX_EXPECTED_VERSION?.trim();
const deploymentWaitMs = readPositiveInt("KILLBOX_DEPLOYMENT_WAIT_MS", expectedVersion ? 120_000 : 15_000);
const deploymentPollMs = readPositiveInt("KILLBOX_DEPLOYMENT_POLL_MS", 5_000);

test("initial game is playable", async ({ page, baseURL }) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for Killbox e2e verification.");
  }

  await openReadyDeployment(page, baseURL);
  await expect(page.locator("#game-root canvas")).toBeVisible();

  const description = await readDebugState(page);
  expect(description.scene).toBe("prototype-arena");
  expect(description.activePlayers).toBeGreaterThanOrEqual(1);
  expect(description.objectiveHp).toBe("1000/1000");
  expect(description.wave.index).toBe(1);
  expect(description.buildPads).toHaveLength(8);
  expect(description.controls).toContain("build-pad:toggle");

  const commandResult = await page.evaluate(() => {
    const debug = window.__KILLBOX_DEBUG__;
    if (!debug) {
      throw new Error("Killbox debug API is not installed.");
    }

    const padId = debug.describe().buildPads[0]?.id;
    if (!padId) {
      throw new Error("No build pad is available for the smoke command.");
    }

    const snapshot = debug.dispatch({
      type: "build-pad:toggle",
      padId,
      towerType: "e2e-tower"
    });

    return {
      padId,
      occupiedBy: snapshot.buildPads.find((pad) => pad.id === padId)?.occupiedBy,
      occupiedAfter: debug.describe().buildPads.find((pad) => pad.id === padId)?.occupied
    };
  });

  expect(commandResult.occupiedBy).toBe("e2e-tower");
  expect(commandResult.occupiedAfter).toBe(true);
  await expect(page.locator("#semantic-state")).toContainText("Build pads: 1/8");
});

async function openReadyDeployment(page: Page, baseURL: string): Promise<void> {
  const deadline = Date.now() + deploymentWaitMs;
  const errors: string[] = [];

  while (Date.now() <= deadline) {
    try {
      await page.goto(withCacheBust(baseURL), { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => Boolean(window.__KILLBOX_DEBUG__), null, {
        timeout: Math.min(deploymentPollMs, 10_000)
      });

      if (!expectedVersion) {
        return;
      }

      const versionState = await page.evaluate(() => ({
        appVersion: document.querySelector<HTMLElement>("#app")?.dataset.killboxVersion,
        visibleVersion: document.querySelector<HTMLElement>("#deployment-version")?.dataset.killboxVersion,
        debugVersion: window.__KILLBOX_DEBUG__?.describe().deploymentVersion
      }));

      if (
        versionState.appVersion === expectedVersion &&
        versionState.visibleVersion === expectedVersion &&
        versionState.debugVersion === expectedVersion
      ) {
        await expect(page.locator("#deployment-version")).toContainText(expectedVersion);
        return;
      }

      errors.push(
        `served app=${versionState.appVersion ?? "missing"} visible=${
          versionState.visibleVersion ?? "missing"
        } debug=${versionState.debugVersion ?? "missing"}`
      );
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }

    await page.waitForTimeout(deploymentPollMs);
  }

  const latest = errors.at(-1) ?? "no page response";
  throw new Error(
    `Timed out after ${deploymentWaitMs}ms waiting for ${baseURL} to serve version ${
      expectedVersion ?? "any"
    }. Latest state: ${latest}`
  );
}

async function readDebugState(page: Page): Promise<KillboxDebugState> {
  return page.evaluate(() => {
    const debug = window.__KILLBOX_DEBUG__;
    if (!debug) {
      throw new Error("Killbox debug API is not installed.");
    }
    return debug.describe();
  });
}

function withCacheBust(rawURL: string): string {
  const url = new URL(rawURL);
  url.searchParams.set("killbox_verify", `${Date.now()}`);
  return url.toString();
}

function readPositiveInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
