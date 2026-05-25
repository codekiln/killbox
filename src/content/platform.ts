export type ValidationStatus = "pass" | "warning" | "fail";

export interface PlatformRoute {
  href: string;
  label: string;
  summary: string;
  surface: "play" | "world" | "system" | "catalog" | "docs";
}

export interface GameThemeManifest {
  id: string;
  name: string;
  biome: string;
  factionId: string;
  enemyTheme: string;
  tileset: string;
  environmentFx: string[];
  uiTheme: string;
  audioTheme: string;
  gameplayModifiers: string[];
  tags: string[];
  palette: string[];
  assetRefs: string[];
  lineage: string;
  readability: {
    contrast: ValidationStatus;
    laneClarity: ValidationStatus;
    towerEnemyDistinction: ValidationStatus;
    notes: string;
  };
}

export interface FactionPreview {
  id: string;
  name: string;
  role: string;
  combatRead: string;
  colors: string[];
  linkedThemes: string[];
}

export interface DesignTokenGroup {
  id: string;
  label: string;
  description: string;
  tokens: Array<{ name: string; value: string; usage: string }>;
}

export interface RenderingExperiment {
  id: string;
  name: string;
  category: "shader" | "particle" | "lighting" | "environment" | "readability";
  status: ValidationStatus;
  summary: string;
  validation: string;
}

export interface AssetCatalogEntry {
  id: string;
  name: string;
  type: "sprite" | "tileset" | "atlas" | "ui" | "audio" | "concept";
  themeId: string;
  lineage: string;
  source: string;
  runtimeUse: string;
  validation: ValidationStatus;
  atlas?: {
    id: string;
    frameCount: number;
    dimensions: string;
    packingNotes: string;
  };
}

export interface GameplayMechanicDoc {
  id: string;
  name: string;
  playerRead: string;
  systemRead: string;
  validation: string;
}

export const platformRoutes: PlatformRoute[] = [
  {
    href: "/play/",
    label: "Play",
    summary: "Embedded Phaser prototype with debug-state automation.",
    surface: "play"
  },
  {
    href: "/themes/",
    label: "Biome Themes",
    summary: "Theme manifests, palettes, FX, modifiers, and lineage.",
    surface: "world"
  },
  {
    href: "/factions/",
    label: "Faction Previews",
    summary: "Combat readability and visual ownership for each faction.",
    surface: "world"
  },
  {
    href: "/design-system/",
    label: "Design System",
    summary: "Tokens, component patterns, typography, and readability rules.",
    surface: "system"
  },
  {
    href: "/rendering/",
    label: "Rendering Sandbox",
    summary: "Shader, particle, lighting, and environment experiments.",
    surface: "system"
  },
  {
    href: "/assets/",
    label: "Asset Catalog",
    summary: "Generated asset metadata, atlas notes, and validation reports.",
    surface: "catalog"
  },
  {
    href: "/gameplay/",
    label: "Gameplay Docs",
    summary: "Mechanic documentation tied to runtime validation.",
    surface: "docs"
  }
];

export const themes: GameThemeManifest[] = [
  {
    id: "saltmarsh-vigil",
    name: "Saltmarsh Vigil",
    biome: "brackish marsh gate",
    factionId: "watchbound-engineers",
    enemyTheme: "silt oath raiders",
    tileset: "wetland causeway kit",
    environmentFx: ["reed sway", "low fog", "water glints"],
    uiTheme: "field brass",
    audioTheme: "damp percussion and signal horns",
    gameplayModifiers: ["wide early lanes", "merge pressure", "blocker value"],
    tags: ["first-playable", "defensive", "readability-baseline"],
    palette: ["#16201b", "#2d5f54", "#d9b46a", "#f2ead0", "#c6534b"],
    assetRefs: ["atlas-saltmarsh-props", "concept-gatehouse-vigil", "ui-field-brass"],
    lineage: "Derived from the first playable mission geometry and original Saltmarsh Crossing terminology.",
    readability: {
      contrast: "pass",
      laneClarity: "pass",
      towerEnemyDistinction: "pass",
      notes: "Warm path accents separate enemies from water and field surfaces."
    }
  },
  {
    id: "emberglass-quarry",
    name: "Emberglass Quarry",
    biome: "fractured glass quarry",
    factionId: "cinderwright-union",
    enemyTheme: "mirror husks",
    tileset: "basalt rail kit",
    environmentFx: ["heat shimmer", "glass sparks", "ember trails"],
    uiTheme: "workshop enamel",
    audioTheme: "chain clacks and furnace drones",
    gameplayModifiers: ["short sightlines", "splash reward", "volatile cover"],
    tags: ["prototype-theme", "high-contrast", "future-biome"],
    palette: ["#1b1916", "#3f5151", "#e05f3e", "#f1c56d", "#d8efe8"],
    assetRefs: ["concept-quarry-lanes", "atlas-emberglass-hazards"],
    lineage: "Representative future biome for testing warm VFX without losing enemy silhouettes.",
    readability: {
      contrast: "warning",
      laneClarity: "pass",
      towerEnemyDistinction: "warning",
      notes: "Ember particles must stay behind combat silhouettes."
    }
  }
];

export const factions: FactionPreview[] = [
  {
    id: "watchbound-engineers",
    name: "Watchbound Engineers",
    role: "Defensive builders who stabilize chokepoints under pressure.",
    combatRead: "Round towers, brass accents, and pale targeting marks read as player-owned.",
    colors: ["#f2ead0", "#d9b46a", "#2d5f54"],
    linkedThemes: ["saltmarsh-vigil"]
  },
  {
    id: "cinderwright-union",
    name: "Cinderwright Union",
    role: "Industrial specialists built for splash damage experiments.",
    combatRead: "Angular silhouettes and red-orange cores distinguish them from neutral quarry terrain.",
    colors: ["#e05f3e", "#f1c56d", "#3f5151"],
    linkedThemes: ["emberglass-quarry"]
  }
];

export const designTokenGroups: DesignTokenGroup[] = [
  {
    id: "color",
    label: "Color",
    description: "Gameplay-first colors avoid relying on a single hue family.",
    tokens: [
      { name: "ink", value: "#121418", usage: "Primary text and deep backing surfaces" },
      { name: "bone", value: "#f5f0df", usage: "High-emphasis text and selected strokes" },
      { name: "reed", value: "#2d5f54", usage: "World panels and marsh surfaces" },
      { name: "signal", value: "#d9b46a", usage: "Interactable emphasis and lane callouts" },
      { name: "breach", value: "#c6534b", usage: "Objective damage, leaks, and danger state" }
    ]
  },
  {
    id: "type",
    label: "Typography",
    description: "Compact, readable type supports repeated inspection and test automation.",
    tokens: [
      { name: "display", value: "clamp(2.3rem, 5vw, 4.6rem)", usage: "First-viewport product signal" },
      { name: "section", value: "1.4rem", usage: "Route section headings" },
      { name: "body", value: "1rem", usage: "Documentation and cards" },
      { name: "caption", value: "0.82rem", usage: "Validation, metadata, and labels" }
    ]
  },
  {
    id: "shape",
    label: "Shape",
    description: "Small radii keep tools crisp and production-oriented.",
    tokens: [
      { name: "radius-small", value: "4px", usage: "Tags and swatches" },
      { name: "radius-card", value: "8px", usage: "Repeated preview cards" },
      { name: "grid-gap", value: "16px", usage: "Dense responsive layouts" }
    ]
  }
];

export const renderingExperiments: RenderingExperiment[] = [
  {
    id: "fog-depth-bands",
    name: "Fog Depth Bands",
    category: "environment",
    status: "pass",
    summary: "Layered marsh fog preview that never covers lane strokes or objective HP.",
    validation: "Enemy and tower silhouettes remain readable at 720p and mobile widths."
  },
  {
    id: "impact-spark-budget",
    name: "Impact Spark Budget",
    category: "particle",
    status: "warning",
    summary: "Short-lived hit particles for ranger, blast, slow, and leak feedback.",
    validation: "Needs particle cap before dense waves become noisy."
  },
  {
    id: "lane-contrast-ramp",
    name: "Lane Contrast Ramp",
    category: "readability",
    status: "pass",
    summary: "Palette ramp for path strokes over biome tilesets.",
    validation: "Maintains visible route shape across marsh and quarry palettes."
  }
];

export const assets: AssetCatalogEntry[] = [
  {
    id: "atlas-saltmarsh-props",
    name: "Saltmarsh Props Atlas",
    type: "atlas",
    themeId: "saltmarsh-vigil",
    lineage: "Generated-prop placeholder metadata for reeds, signposts, wet stones, and gate markers.",
    source: "static manifest seed",
    runtimeUse: "Future decorative props outside tower/enemy silhouettes.",
    validation: "pass",
    atlas: {
      id: "saltmarsh-props-v0",
      frameCount: 24,
      dimensions: "1024x1024",
      packingNotes: "Reserved 8px padding for future pixel bleed checks."
    }
  },
  {
    id: "concept-gatehouse-vigil",
    name: "Gatehouse Vigil Concept",
    type: "concept",
    themeId: "saltmarsh-vigil",
    lineage: "Original concept slot for defended objective exploration.",
    source: "AI art pipeline placeholder",
    runtimeUse: "Objective silhouette and mission briefing reference.",
    validation: "warning"
  },
  {
    id: "ui-field-brass",
    name: "Field Brass UI Kit",
    type: "ui",
    themeId: "saltmarsh-vigil",
    lineage: "Derived from current command panel readability fixes.",
    source: "design token seed",
    runtimeUse: "HUD panels, validation badges, and command surfaces.",
    validation: "pass"
  },
  {
    id: "atlas-emberglass-hazards",
    name: "Emberglass Hazards Atlas",
    type: "atlas",
    themeId: "emberglass-quarry",
    lineage: "Future biome hazard metadata for animated cracks and heat vents.",
    source: "static manifest seed",
    runtimeUse: "Rendering sandbox stress test for warm VFX.",
    validation: "warning",
    atlas: {
      id: "emberglass-hazards-v0",
      frameCount: 18,
      dimensions: "1024x512",
      packingNotes: "Hot-color frames require enemy silhouette contrast validation."
    }
  },
  {
    id: "concept-quarry-lanes",
    name: "Quarry Lane Concept",
    type: "concept",
    themeId: "emberglass-quarry",
    lineage: "Composition reference for fractured lanes, rail crossings, and safe tower silhouettes.",
    source: "AI art pipeline placeholder",
    runtimeUse: "Future biome concept validation before tileset production.",
    validation: "warning"
  }
];

export const gameplayMechanics: GameplayMechanicDoc[] = [
  {
    id: "fixed-build-pads",
    name: "Fixed Build Pads",
    playerRead: "Players select curated pads, then choose tower archetypes from the command panel.",
    systemRead: "Pad occupancy is serializable state and tower build commands are deterministic.",
    validation: "Debug API reports occupied pads and tower counts after smoke commands."
  },
  {
    id: "scripted-waves",
    name: "Scripted Waves",
    playerRead: "The wave button advances pressure through predictable enemy compositions.",
    systemRead: "Fixed ticks spawn, move, damage, defeat, leak, and resolve enemy combatants.",
    validation: "Playwright starts a wave and confirms active enemies through semantic state."
  },
  {
    id: "shared-economy",
    name: "Shared Economy",
    playerRead: "Gold is a team resource spent on towers and earned from defeated enemies.",
    systemRead: "Economy values live in game state and are exposed to browser automation.",
    validation: "Unit tests cover command application and deterministic state snapshots."
  }
];

export function validatePlatformContent(): string[] {
  const issues: string[] = [];
  const routeHrefs = new Set<string>();
  const themeIds = new Set(themes.map((theme) => theme.id));
  const factionIds = new Set(factions.map((faction) => faction.id));

  for (const route of platformRoutes) {
    if (routeHrefs.has(route.href)) {
      issues.push(`Duplicate route href: ${route.href}`);
    }
    routeHrefs.add(route.href);
  }

  for (const theme of themes) {
    if (!factionIds.has(theme.factionId)) {
      issues.push(`Theme ${theme.id} references missing faction ${theme.factionId}`);
    }
    if (theme.palette.length < 4) {
      issues.push(`Theme ${theme.id} needs at least four palette colors`);
    }
    for (const assetRef of theme.assetRefs) {
      if (!assets.some((asset) => asset.id === assetRef)) {
        issues.push(`Theme ${theme.id} references missing asset ${assetRef}`);
      }
    }
  }

  for (const faction of factions) {
    for (const themeId of faction.linkedThemes) {
      if (!themeIds.has(themeId)) {
        issues.push(`Faction ${faction.id} references missing theme ${themeId}`);
      }
    }
  }

  for (const asset of assets) {
    if (!themeIds.has(asset.themeId)) {
      issues.push(`Asset ${asset.id} references missing theme ${asset.themeId}`);
    }
    if (asset.type === "atlas" && !asset.atlas) {
      issues.push(`Atlas asset ${asset.id} is missing atlas metadata`);
    }
  }

  return issues;
}
