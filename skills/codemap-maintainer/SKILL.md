---
name: codemap-maintainer
description: Maintain `docs/codemap.md` plus scoped `docs/codemap-*.md` files as the latest architecture snapshot for a project. Use this whenever starting a new project, auditing project docs, changing architecture, auth, billing, infra, integrations, or any code path that may make the existing codemap stale. Prefer this skill whenever the user mentions codemap, project map, system overview, architecture snapshot, docs structure, or wants context files that future threads can attach.
---

# Codemap Maintainer

Use this skill to keep a project's `docs/` folder centered on a compact codemap family instead of scattered architecture notes.

## Goal

Produce and maintain a small set of high-signal files that future threads can attach as context:

- `docs/codemap.md`
- `docs/codemap-*.md` only when a subsystem needs its own detail page

The codemap family is the latest snapshot only. Do not turn it into a changelog, migration diary, or decision log unless the user explicitly asks for that.

## Core rules

1. Treat `docs/codemap.md` as the top-level map.
2. Keep the main codemap short enough to be attachable without wasting context.
3. Split details into `docs/codemap-*.md` only when that reduces context size or isolates a subsystem cleanly.
4. Update codemap files in the same change that changes the underlying system, if the current docs become stale.
5. Prefer verified facts from source code, env contracts, routes, queries, migrations, and official vendor docs.
6. If a fact cannot be verified from the repo or a trusted source, mark it as unknown instead of guessing.
7. Do not preserve transition language like "after X was removed" unless the user explicitly wants migration history.
8. Do not create `README`, `architecture`, or vendor-specific markdown docs when the codemap family can absorb the information.
9. Write every statement as a present-tense snapshot. Avoid transition words like "now", "still", "currently", "no longer", "previously", "older", or wording that implies change history.

## When to split into child codemaps

Create a child codemap only if at least one of these is true:

- The subsystem has enough detail to bloat the main codemap.
- Future tasks will often target that subsystem alone.
- The subsystem is owned by a different repo, service, or vendor boundary.
- The subsystem has contracts that are easy to break without explicit documentation.

Common examples:

- `docs/codemap-clerk.md`
- `docs/codemap-stripe.md`
- `docs/codemap-<adjacent-system>.md`

## Recommended structure

### Main codemap

`docs/codemap.md` should usually cover:

1. Maintenance rule
2. Product boundary and local project paths
3. Current runtime sources of truth
4. End-to-end request and state flows
5. Infra snapshot
6. Important env contracts
7. Child codemap index
8. Read-first files

Keep it focused on project-wide understanding.

### Child codemap

A child codemap should usually cover:

1. Scope
2. Responsibilities and non-goals
3. Important local paths and files
4. Runtime contracts, routes, tables, or events
5. Critical invariants and gating rules
6. Required env vars or dashboard-side setup

Keep each child codemap narrow.

## Workflow

### 1. Discover the actual system

Read only the files needed to answer:

- What is the product boundary?
- Which repo owns which behavior?
- What is the runtime truth source?
- Which external vendors or adjacent repos matter?
- Which flows are easiest to break?

Prefer source-of-truth artifacts:

- route handlers
- service layers
- schema files
- migrations
- env usage sites
- webhook handlers
- auth middleware
- infrastructure adapters

### 2. Decide the codemap split

Use the smallest useful doc set.

Default:

- one `docs/codemap.md`

Add child codemaps only where detail is dense or separable.

### 3. Write the main codemap

Make it readable top to bottom. It should explain the current system quickly, not exhaustively.

Good main-codemap content:

- exact local repo paths
- exact env variable names
- exact route families
- exact ownership boundaries
- verified infra facts
- verified unknowns

Bad main-codemap content:

- stale history
- open-ended brainstorming
- copied source code
- large config dumps
- unverified infrastructure claims

### 4. Write child codemaps

Each child file should answer:

- what this subsystem owns
- what it does not own
- how it connects to the rest of the system
- what changes would likely require doc updates

### 5. Remove overlap

When the user wants codemap-only docs:

- merge overlapping `README` or `architecture` content into the codemap family
- delete redundant docs instead of maintaining multiple truths

### 6. Re-check after edits

Before finishing, verify:

- file paths exist
- env names match code
- event names match handlers
- tables and routes are spelled correctly
- child docs are referenced from the main codemap
- no stale migration narrative remains

## Context discipline

This skill exists partly to save model context.

Follow these constraints:

- Keep `docs/codemap.md` compact.
- Push vendor detail into child codemaps.
- Do not duplicate the same explanation across files.
- Summarize large infra sections instead of pasting raw config.
- Prefer bullets and short sections over prose-heavy essays.

## Update policy

If a code change affects any of these, update the codemap family in the same task when practical:

- system boundaries
- runtime truth source
- auth flow
- billing flow
- webhook contract
- env contract
- repo ownership
- infra assumptions
- gating rules

If the change is local and does not affect the current snapshot, leave docs alone.

## Official-doc usage

When documenting vendor behavior, prefer official sources and cite only what matters:

- auth providers
- payment providers
- deployment platforms
- cloud infrastructure

Use repo code for project-specific behavior. Use vendor docs for vendor-specific constraints.

## Templates

Use these bundled references when drafting or normalizing files:

- `references/main-codemap-template.md`
- `references/child-codemap-template.md`

Read only the template you need.
