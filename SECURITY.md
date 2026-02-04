# Security Policy

## Supported Versions

- `main` contains the latest secure code, always protected by CI checks and the Telegram security guardrails described below.

## Reporting a Vulnerability

If you discover a security issue, please send a private message to `t.me/catruzh` or open a GitHub issue labelled `security`. Include:

1. Affected component (server, frontend, Cloudflare Stream, etc.).
2. Step-by-step reproduction.
3. Severity and impact.
4. Any mitigations you expect are easy to verify (logs, request headers, etc.).

The maintainers aim to acknowledge your report within three business days and follow up with a public fix or mitigation within 30 days.

## Security Controls

- **Telegram authentication** is limited to `env.telegram.initDataTtl` seconds (default 300s). Reused initData headers are tracked in a cache and rejected, so replaying webhooks is no longer possible.
- **Cloudflare Stream signed URLs** require the current `courseId`. The API only honors requests where the authenticated user already owns that course.
- **CI gates** run `npm run lint` for the frontend and `npm test` for the server on every `push`/`pull_request` to `main`. Failures block merges so regressions are caught early.

## Disclosure Process

Once a report is confirmed, we may:

1. Notify affected parties.
2. Patch the vulnerability.
3. Publish a short advisory if appropriate.

We appreciate responsible disclosure and will keep you posted throughout the process.
