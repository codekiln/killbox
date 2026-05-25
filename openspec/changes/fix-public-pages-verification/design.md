## Context

The Pages workflow deploys the Astro `dist/` output to `https://codekiln.github.io/killbox/`. Public Playwright verification receives that URL as `KILLBOX_PUBLIC_BASE_URL`.

## Goals / Non-Goals

**Goals:**
- Preserve the `/killbox/` base path for route smoke checks.
- Allow the version-readiness loop to use its configured wait budget.
- Keep local Playwright behavior unchanged.

**Non-Goals:**
- Do not alter Pages deployment infrastructure or site routing.
- Do not loosen playable smoke assertions.

## Decisions

1. Resolve route paths with a helper that appends paths to `baseURL.pathname`.
   - Rationale: `new URL("/themes/", baseURL)` resets to the origin root, which is wrong for repository Pages hosting.

2. Set test timeout from the configured deployment wait.
   - Rationale: the readiness loop already has bounded retry behavior, but Playwright's default timeout cut it off first.

## Risks / Trade-offs

- Public verification may take longer during Pages propagation -> The wait remains bounded by `KILLBOX_DEPLOYMENT_WAIT_MS`.
