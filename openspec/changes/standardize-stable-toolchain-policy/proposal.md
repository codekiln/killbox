## Why

Killbox should make the preferred toolchain policy explicit so local development, AI-assisted work, and GitHub Pages deployment do not drift into stale runtimes or inconsistent package-manager behavior. This is timely because the Astro platform now depends on repeatable local and CI builds, and the project already uses mise as the visible command and tool entry point.

## What Changes

- Define a stable/LTS-first toolchain policy for project languages, CLIs, package-manager tooling, and GitHub Actions.
- Keep Node on the current supported stable/LTS major line already used by the project, while avoiding unnecessary patch-level pins in mise when a stable selector is more maintainable.
- Evaluate and adopt Aube as the preferred npm-compatible package manager through mise when it preserves deterministic installs, lockfile behavior, and CI reproducibility.
- Retain npm as the fallback package manager where Aube is unavailable or not yet validated for the project workflow.
- Align GitHub Actions with the same stable/LTS policy by using current stable action majors and the project Node line for build and test jobs.
- Document that Python and other unused languages are not introduced by this policy unless a future scoped change requires them.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `dev-environment`: define stable/LTS toolchain requirements for mise, package-manager selection, and GitHub Actions.

## Impact

- Affected configuration: `mise.toml`, package-manager install commands, lockfile usage, and GitHub Actions Pages deployment workflow.
- Affected documentation: developer setup and validation notes that explain the stable/LTS policy, Aube preference, npm fallback, and no-Python non-goal.
- Affected validation: local install/check/build flow and Pages CI must continue to be deterministic and reproducible after any toolchain updates.
