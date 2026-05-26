## 1. Audit

- [ ] 1.1 Verify current official stable/LTS guidance for Node, mise, Aube, npm compatibility, and the GitHub Actions used by the Pages workflow.
- [ ] 1.2 Inventory current `mise.toml`, package-manager lockfiles, package scripts, and Pages workflow install/build/test commands.
- [ ] 1.3 Confirm no Python runtime, task, or CI dependency is required for this change.

## 2. Toolchain Configuration

- [ ] 2.1 Update `mise.toml` to encode stable/LTS tool selectors and release-age policy where practical without adding unused languages.
- [ ] 2.2 Evaluate adding Aube through mise as the preferred npm-compatible package manager while keeping npm available as fallback.
- [ ] 2.3 Update local install, build, and validation task commands only if they remain deterministic with the selected package-manager path.
- [ ] 2.4 Update GitHub Pages workflow action versions, Node configuration, cache settings, and install commands to match the stable/LTS policy.

## 3. Documentation

- [ ] 3.1 Document the repository toolchain policy, including stable/LTS selectors, mise as the local source of truth, Aube preference, npm fallback, and no-Python non-goal.
- [ ] 3.2 Document how contributors should run install, local checks, browser checks, and public deployment verification after toolchain changes.

## 4. Validation

- [ ] 4.1 Run dependency installation from a clean-enough local state using the selected package-manager path.
- [ ] 4.2 Run linting, unit tests, static build, browser smoke coverage, and OpenSpec validation.
- [ ] 4.3 Run or verify the GitHub Pages deployment workflow and public deployment check after the change lands.
- [ ] 4.4 Record any Aube blocker and keep npm as default if Aube does not pass reproducibility validation.
