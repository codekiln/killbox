import { describe, expect, it } from "vitest";
import {
  assets,
  designTokenGroups,
  factions,
  gameplayMechanics,
  platformRoutes,
  renderingExperiments,
  themes,
  validatePlatformContent
} from "../src/content/platform";

describe("platform content", () => {
  it("keeps route contracts stable for the Astro platform", () => {
    expect(platformRoutes.map((route) => route.href)).toEqual([
      "/play/",
      "/themes/",
      "/factions/",
      "/design-system/",
      "/rendering/",
      "/assets/",
      "/gameplay/"
    ]);
  });

  it("keeps theme, faction, asset, and atlas references internally valid", () => {
    expect(validatePlatformContent()).toEqual([]);
  });

  it("includes representative living design-system and validation content", () => {
    expect(themes.length).toBeGreaterThanOrEqual(2);
    expect(factions.length).toBeGreaterThanOrEqual(2);
    expect(assets.some((asset) => asset.atlas)).toBe(true);
    expect(designTokenGroups.flatMap((group) => group.tokens).length).toBeGreaterThanOrEqual(8);
    expect(renderingExperiments.some((experiment) => experiment.category === "readability")).toBe(true);
    expect(gameplayMechanics.map((mechanic) => mechanic.id)).toContain("fixed-build-pads");
  });
});
