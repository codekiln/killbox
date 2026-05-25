# Archive Notes: improve-command-panel-readability

## Rationale

The first playable command rail was technically functional but visually cluttered. Browser review showed the top of the panel mixing mission log text, title text, tower choices, wave controls, and gameplay labels in a way that made the main control surface hard to understand.

This change made the right-side command rail read as a proper tool surface: command title, mission status, build choices, wave actions, tactical hints, and recent messages now live in distinct sections.

## Lessons Learned

- A semantic e2e pass was not enough for this issue; a screenshot made the overlapping labels obvious.
- The command panel needed map/gameplay geometry cleanup too, because the gate and player markers were visually competing with the panel edge.
- The debug overlay should avoid the right command rail during local visual review.

## Tech Debt

- The scene still uses immediate-mode Phaser text and hard-coded layout constants. If more UI is added, a small retained UI layout helper may be worth introducing.
- Mobile layout has not received the same level of visual polish as desktop.
