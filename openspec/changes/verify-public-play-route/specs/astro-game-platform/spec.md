## MODIFIED Requirements

### Requirement: Deployment version continuity
The Astro site SHALL preserve visible deployment version information used by deployment verification.

#### Scenario: Published version is visible on Astro site
- **GIVEN** a production build includes a deployment version identifier
- **WHEN** a browser opens the built Astro site
- **THEN** the page SHALL visibly show the version identifier and expose it through stable DOM state

#### Scenario: Public verifier checks canonical play route
- **GIVEN** a public GitHub Pages deployment includes a deployment version identifier
- **WHEN** the public deployment verifier checks the playable game
- **THEN** it SHALL open the canonical `/play/` route before comparing visible DOM state and debug API version state
