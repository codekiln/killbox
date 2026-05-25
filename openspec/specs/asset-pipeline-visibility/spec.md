# asset-pipeline-visibility Specification

## Purpose
Define static visibility for generated asset previews, atlas metadata, validation reports, and future AI art pipeline outputs.

## Requirements
### Requirement: Generated asset previews
The site SHALL expose generated asset previews and metadata through static pages.

#### Scenario: Visitor opens asset catalog
- **WHEN** a visitor opens the asset preview route
- **THEN** they SHALL see asset entries with type, theme association, lineage notes, source metadata, intended runtime use, and validation status

### Requirement: Atlas inspection stubs
The asset catalog SHALL include atlas inspection information suitable for future generated spritesheets.

#### Scenario: Atlas metadata is shown
- **WHEN** an asset entry references an atlas
- **THEN** the site SHALL show atlas id, frame count, dimensions, packing notes, and validation status

### Requirement: Asset validation reports
The platform SHALL render validation reports for asset and theme consistency.

#### Scenario: Validation report is rendered
- **WHEN** a visitor opens asset validation content
- **THEN** the site SHALL show pass, warning, or fail results for metadata completeness, theme consistency, readability, and runtime suitability

### Requirement: AI art pipeline integration path
The asset catalog SHALL support future AI-generated asset pipeline outputs without requiring a backend.

#### Scenario: Generated metadata is added
- **WHEN** generated asset metadata is added to the repository
- **THEN** the static site SHALL be able to render it as catalog and validation content during the next build

