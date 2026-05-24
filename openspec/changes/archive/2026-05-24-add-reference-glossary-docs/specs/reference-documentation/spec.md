## ADDED Requirements

### Requirement: Markdown reference documentation
The repository SHALL contain markdown-based reference documentation for shared Killbox terminology and concepts.

#### Scenario: Reference docs exist
- **WHEN** a developer looks for project reference documentation in the repository
- **THEN** they SHALL be able to find markdown documentation that can be read without running the game or a documentation site

### Requirement: Canonical glossary
The reference documentation SHALL include a glossary that defines reusable game and development terms in one canonical place, preferring established industry or genre terminology when that terminology accurately describes Killbox behavior.

#### Scenario: Glossary defines shared terms
- **WHEN** a term is used across specs, implementation, or player-facing copy as Killbox domain vocabulary
- **THEN** the glossary SHALL provide a concise definition for that term

#### Scenario: Glossary uses established terminology when accurate
- **WHEN** a glossary term has an established industry or genre meaning that accurately fits Killbox behavior
- **THEN** the glossary SHALL use that established term instead of inventing a one-off synonym

#### Scenario: Glossary defines exit
- **WHEN** a reader looks up the term "exit"
- **THEN** the glossary SHALL define it as the end of an enemy path where enemy combatants leave the lane and cause a leak event

#### Scenario: Glossary defines leak
- **WHEN** a reader looks up the term "leak"
- **THEN** the glossary SHALL define it as the event when an enemy combatant reaches the exit, leaves active simulation, and applies its configured leak damage to objective HP

### Requirement: Future reference-site compatibility
The reference documentation SHALL remain plain markdown that can later be incorporated into a GitHub Pages reference site without requiring site infrastructure in the current increment.

#### Scenario: Documentation stays static for now
- **WHEN** the glossary is added
- **THEN** it SHALL NOT require a static site generator, publishing workflow, or runtime game changes to be useful
