# init.md — Product Requirements Summary

## Definition

`init.md` is a general initialization procedure that inspects a target, determines what it needs to become operational, creates and configures what applies, validates the result, and reports its operational state.

## Core Model

The root protocol remains general:

1. Inspect what exists.
2. Determine what is needed.
3. Create what applies.
4. Configure what is required.
5. Validate the result.
6. Report what became operational.

Templates define complete concrete initialization procedures for specific targets.

## Current Implementation

- Static Vite and React website.
- GitHub Pages deployment.
- Root init.md and template browser with copy-to-clipboard behavior.
- Canonical Markdown files under `templates/` imported with Vite raw imports.
- Template metadata parsed from Markdown frontmatter.
- Copy buttons copy complete usable instruction bodies, not frontmatter metadata.
- Build-time template metadata check.
- GitHub and BIThub links limited to header and footer.

## Non-Goals

- No backend.
- No database.
- No account system.
- No execution runtime in this version.
- No fixed scaffold imposed on every target.
- No universal requirement to generate README, PRD, snapshot, context, server, task, or agent files.