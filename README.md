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

## Repository Layout

```text
skills/
  codemap-maintainer/
    SKILL.md
    references/
      main-codemap-template.md
      child-codemap-template.md
```

## Requirements

Each skill directory contains a `SKILL.md` file with `name` and `description` frontmatter.
