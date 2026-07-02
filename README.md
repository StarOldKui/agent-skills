# Agent Skills

Personal public skills for AI coding agents that support the Agent Skills format.

## Skills

### codemap-maintainer

Maintains `docs/codemap.md` and scoped `docs/codemap-*.md` files as compact, current architecture snapshots for a project.

Install:

```bash
npx skills add StarOldKui/agent-skills --skill codemap-maintainer
```

Recommended `AGENTS.md` instruction:

```markdown
Codemap: if the project has `docs/codemap.md`, evaluate it on every task. Update it in the same task whenever the architecture snapshot becomes stale, especially when system boundaries, ownership, runtime truth, persistence boundaries, routes, env contracts, integrations, infra assumptions, gating rules, or core flows change; otherwise briefly state that no codemap update is needed.
```

### codex-rate-limit-reset-credits

Checks local Codex/ChatGPT rate-limit reset credits from `~/.codex/auth.json` and returns only a sanitized Markdown table by default.

Install:

```bash
npx skills add StarOldKui/agent-skills --skill codex-rate-limit-reset-credits
```

Recommended `AGENTS.md` instruction:

```markdown
Use codex-rate-limit-reset-credits whenever checking Codex reset credits. The final success response should be only the Markdown table of status, title, granted_at local time, and expires_at local time; do not print tokens, cookies, raw API responses, or complete unique IDs.
```

## Repository Layout

```text
skills/
  codemap-maintainer/
    SKILL.md
    references/
      main-codemap-template.md
      child-codemap-template.md
  codex-rate-limit-reset-credits/
    SKILL.md
    scripts/
      check_reset_credits.js
    evals/
      evals.json
```

## Requirements

Each skill directory contains a `SKILL.md` file with `name` and `description` frontmatter.
