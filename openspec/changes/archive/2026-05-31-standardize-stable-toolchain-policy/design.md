## Context

The repository currently uses mise as the local entry point for Node 24, OpenSpec, and common project tasks. The package workflow is npm-based today: `package-lock.json` is present, `mise.toml` sets `npm.package_manager = "npm"`, and GitHub Pages CI installs with `npm ci`.

The developer preference notes favor a mise-centric workflow, latest stable or LTS tool lines, a release-age buffer where practical, and Aube as the preferred npm-compatible package manager with npm as fallback. This change should encode that policy without making unrelated language or runtime additions.

## Goals / Non-Goals

**Goals:**

- Make stable/LTS-first toolchain selection an explicit repository contract for local development and GitHub Actions.
- Keep mise as the local source of truth for project tools and task entry points.
- Prefer Aube for Node package workflows when it remains compatible with the existing npm package shape, deterministic installs, and CI validation.
- Keep GitHub Pages CI on the same project Node line and current stable action majors or runtime settings.
- Preserve fast, reproducible static builds for the Astro platform.

**Non-Goals:**

- Do not introduce Python, Python tasks, or Python CI jobs as part of this policy.
- Do not change Phaser, Astro, gameplay, or design-system runtime behavior.
- Do not replace the existing lockfile strategy unless Aube validation proves a better deterministic path.
- Do not move package dependencies to unstable, nightly, canary, or prerelease channels.

## Decisions

- Use mise fuzzy selectors for tools where the selector communicates the desired stable line. For Node, the project should remain on the current supported major line rather than a patch pin, so contributors receive compatible patch/minor updates through mise while CI still validates the resulting application.
- Keep app dependency determinism separate from tool-line freshness. Package dependencies may remain resolved through the lockfile even when the package-manager CLI or language tool is selected by a stable/LTS policy.
- Add Aube through mise only after validating install, lockfile, build, tests, Playwright checks, and Pages workflow compatibility. If Aube cannot provide a reproducible install for the current package shape, npm remains the configured package manager until a later scoped change.
- Treat GitHub Actions as part of the toolchain. The Pages workflow should use the project Node line and current stable action majors or runtime compatibility settings so repository CI does not lag behind local development policy.
- Document unused language boundaries. Python preferences can exist outside the project, but this repository should only declare Python if a future feature actually requires it.

## Risks / Trade-offs

- Aube compatibility with the current npm lockfile could be incomplete or surprising. Mitigation: validate Aube locally and in CI before switching default install commands; keep npm as fallback.
- Latest stable tool selectors can introduce changes more often than exact pins. Mitigation: retain deterministic package locks, use a release-age buffer where practical, and require the full project check before applying changes.
- GitHub Actions major upgrades can alter defaults. Mitigation: update one workflow at a time, preserve existing permissions and Pages deployment shape, and verify the public deployment check after merge.
- CI cache behavior may differ between npm and Aube. Mitigation: make cache keys and install commands explicit in the workflow implementation.

## Migration Plan

1. Confirm the current official stable/LTS lines and supported action majors during `/opsx:apply`.
2. Update `mise.toml` and docs to express the stable/LTS policy without adding unused languages.
3. Validate whether Aube can become the default Node package manager while preserving the existing lockfile and deterministic install behavior.
4. Update GitHub Actions to the same policy and verify local checks plus Pages deployment verification.
5. If any toolchain change fails reproducibility validation, revert only that implementation choice and keep the policy documented with npm fallback.

## Open Questions

- Should Aube be enabled in CI immediately if local validation passes, or should CI remain on npm for one additional iteration while Aube is documented as the preferred local path?
- Which release-age setting is appropriate for this repo once current mise behavior and Aube behavior are confirmed during apply?
