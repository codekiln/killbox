## ADDED Requirements

### Requirement: First playable documentation
The reference documentation SHALL describe the actual first playable mission loop, architecture boundaries, and original terminology.

#### Scenario: Developer reads docs after change
- **WHEN** a developer reads README or reference docs
- **THEN** they SHALL find accurate setup, run, verification, deployment, architecture, and gameplay terminology for the implemented vertical slice

### Requirement: Tech debt and future multiplayer notes
The documentation SHALL preserve notable limitations and future multiplayer assumptions discovered during implementation.

#### Scenario: Deferred work is documented
- **WHEN** a developer reviews architecture or archive notes
- **THEN** they SHALL find clear notes for unresolved tech debt and future lockstep/rollback work
