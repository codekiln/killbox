# Killbox Glossary

This glossary is the canonical home for recurring Killbox vocabulary. Add terms here when they appear across specs, implementation, UI copy, or developer discussion often enough that their meaning could drift. Prefer established industry or genre terms when they accurately describe Killbox behavior.

## Terms

### Exit

The end of an enemy path where enemy combatants leave the lane and cause a leak event.

### Leak

A leak is the event when an enemy combatant reaches the exit, leaves active simulation, and applies its configured leak damage to objective HP.

Leak is a gameplay lifecycle term, not just a synonym for damage. After a leak, the enemy combatant is no longer counted as active for wave simulation.
