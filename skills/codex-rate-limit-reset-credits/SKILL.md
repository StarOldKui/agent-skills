---
name: codex-rate-limit-reset-credits
description: Check local Codex/ChatGPT rate-limit reset credits by reading ~/.codex/auth.json and calling the ChatGPT reset-credits endpoint. Use this whenever the user asks to check Codex reset credits, rate-limit reset credits, reset info, available reset credits, or asks to re-check after a reset-credit lookup. Return only the reset-credit Markdown table by default, with no explanatory prose, no tokens, no cookies, and no complete unique IDs.
---

# Rate Limit Reset Credits

Use this skill to check the user's local reset-credit availability from the Codex/ChatGPT credential file and return a compact table.

## Safety Rules

- Do not print `access_token`, `refresh_token`, `id_token`, cookies, Authorization headers, raw response bodies, or complete unique IDs.
- Do not enable shell tracing.
- Do not save the raw API response unless the user explicitly asks and the saved file is sanitized first.
- Keep the final success response to the Markdown table only.

## Query Workflow

1. Resolve `scripts/check_reset_credits.js` relative to this `SKILL.md`, then run it with Node.js:

```bash
node <skill-dir>/scripts/check_reset_credits.js
```

2. If the script returns `status: 401`, respond only:

```text
Credentials are expired or the Authorization header is missing.
```

3. If the script returns any other error, respond with the shortest practical English error line and do not include secrets.

4. On success, convert the sanitized `credits` array into exactly this Markdown table shape and nothing else:

```markdown
| status | title | granted_at_local | expires_at_local |
|---|---|---:|---:|
| available | Full reset (Weekly + 5 hr) | 2026-07-02 05:04:29 AEST | 2026-08-01 05:04:29 AEST |
```

Do not include `available_count` by default. Include it only if the current user explicitly asks for the count.

## Endpoint Contract

- Auth file: `~/.codex/auth.json`
- Token path: `tokens.access_token`
- Endpoint: `https://chatgpt.com/backend-api/wham/rate-limit-reset-credits`
- Header: `Authorization: Bearer <access_token>`
- Time conversion: convert `granted_at` and `expires_at` from UTC to the local system timezone.
