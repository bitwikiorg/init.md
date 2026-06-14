# init.md — Product Requirements Summary

## Definition

`init.md` is a human- and machine-readable procedure for inspecting a target, determining what it requires, applying the appropriate initialization pattern, validating the result, and reporting its operational state.

## Core Model

The root protocol remains general:

1. Inspect what exists.
2. Determine what is needed.
3. Create what applies.
4. Configure what is required.
5. Validate the result.
6. Report what became operational.

Templates define concrete initialization patterns for specific targets.

## Current Implementation

- Static Vite and React website.
- GitHub Pages deployment.
- Template browser with copy-to-clipboard behavior.
- Canonical Markdown files under `templates/` imported with Vite raw imports.
- Template metadata parsed from Markdown frontmatter.
- Build-time template metadata check.
- Visible GitHub, BIThub, BIThub Guides, and BITwiki links.

## Non-Goals

- No backend.
- No database.
- No account system.
- No execution runtime in this version.
- No fixed scaffold imposed on every target.
- No universal requirement to generate README, PRD, snapshot, context, server, task, or agent files.