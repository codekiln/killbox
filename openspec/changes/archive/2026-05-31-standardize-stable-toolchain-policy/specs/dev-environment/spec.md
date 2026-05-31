## ADDED Requirements

### Requirement: Stable toolchain policy
The repository SHALL define project language, CLI, package-manager, and GitHub Actions toolchains using latest stable or LTS-compatible selectors where practical.

#### Scenario: Contributor inspects local toolchain policy
- **WHEN** a contributor reads the project toolchain configuration
- **THEN** the required project tools SHALL use stable or LTS-compatible selectors where practical
- **AND** unused languages SHALL NOT be introduced solely because they exist in personal preference examples

#### Scenario: CI inspects deployment toolchain policy
- **WHEN** a GitHub Pages workflow builds and verifies the site
- **THEN** the workflow SHALL use the project Node line
- **AND** GitHub Actions dependencies SHALL use current stable action majors or runtime compatibility settings

### Requirement: Preferred npm-compatible package manager
The repository SHALL prefer Aube for Node package workflows when it preserves deterministic installs, lockfile behavior, local reproducibility, and CI reproducibility.

#### Scenario: Aube is validated for the current package workflow
- **WHEN** Aube successfully installs the existing Node dependency graph using the repository lockfile strategy
- **THEN** local package-manager tasks MAY use Aube as the default npm-compatible package manager
- **AND** npm SHALL remain documented as a fallback path

#### Scenario: Aube is not validated for the current package workflow
- **WHEN** Aube cannot reproduce the existing install, build, test, or CI behavior
- **THEN** npm SHALL remain the default package manager
- **AND** the repository SHALL document the blocker before switching package-manager defaults

### Requirement: Toolchain reproducibility validation
The repository SHALL validate toolchain changes with the same deterministic checks used for the Astro platform and public deployment workflow.

#### Scenario: Toolchain configuration changes
- **WHEN** project tool, package-manager, or CI action versions are changed
- **THEN** dependency installation, TypeScript validation, unit tests, static build, browser smoke coverage, OpenSpec validation, and public deployment verification SHALL remain runnable through documented commands
