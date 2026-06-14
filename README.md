# init.md

`init.md` is a human- and machine-readable procedure for inspecting a target, determining what it requires, applying the appropriate initialization pattern, validating the result, and reporting its operational state.

It is not one fixed scaffold. The canonical file defines the general initialization procedure. Templates specialize that procedure for specific targets.

## 1. Definition

Use `init.md` when a target needs to become operational. A target may be a software project, repository, AI agent, server, service, workspace, research environment, data pipeline, application, tool, local directory, remote environment, or existing system requiring restoration or reconfiguration.

## 2. How It Works

The root protocol stays general. It identifies the target, chooses or adapts an initialization pattern, creates and configures only what applies, validates the intended result, and reports the operational state.

Templates provide concrete patterns for common target categories. They describe likely behavior, not mandatory output bundles.

## 3. Six-Stage Initialization Process

1. Inspect what exists.
2. Determine what is needed.
3. Create what applies.
4. Configure what is required.
5. Validate the result.
6. Report what became operational.

## 4. General Protocol Versus Templates

- `init.md` defines the target-neutral procedure.
- `templates/` contains target-specific initialization patterns.
- Generated outputs are conditional.
- Validation is derived from the target.
- Existing work should be adapted before creating replacements.

No output file is universally required except where the selected template or target requires it.

## 5. Available Templates

- `templates/minimal_init_protocol.md` — smallest reasonable initialization pattern for narrow gaps.
- `templates/dry_run_init_protocol.md` — no-change inspection and proposed initialization plan.
- `templates/development_project_init_protocol.md` — software projects, repositories, apps, packages, CLIs, websites, and monorepos.
- `templates/agent_init_protocol.md` — agent instructions, tools, prompts, state, and startup validation.
- `templates/server_init_protocol.md` — server, service host, infrastructure, and deployment readiness.

Each template includes metadata for likely targets, modes, created artifacts, configured elements, validation checks, and optional outputs.

## 6. Usage For Agents

Agents can read the root protocol or a selected template directly. During inspection, determine whether agent instructions are applicable. Create `AGENTS.md` only when agent operation applies and valid target-specific instructions do not already exist.

Different projects should have different `AGENTS.md` files. Different targets should have different `init.md` implementations.

## 7. Usage For Humans

1. Identify the target and intended operational result.
2. Choose the closest template.
3. Copy or adapt the template.
4. Run the procedure in active, dry-run, repair, or reinitialize mode.
5. Review the validation result.
6. Keep the resulting target-specific `init.md` with the target.

Example instructions:

```text
Initialize this repository using the development-project template.
Inspect this server using the server template in dry-run mode.
Determine what this agent workspace needs to become operational.
Create an AGENTS.md file only if this project would benefit from one.
```

## 8. Usage For Developers

This repository preserves a static Vite and React website for browsing init templates and copying practical init instructions.

Common commands:

```bash
npm install
npm run dev
npm run build
```

The build runs `scripts/check-templates.mjs` before compiling the site. That check verifies the expected template files exist and contain the required metadata fields.

## 9. Website

The public site is deployed with GitHub Pages from the existing Vite build. It uses the Markdown files under `templates/` for metadata and keeps copy-to-clipboard behavior focused on concise init instructions, not raw template source.

GitHub Pages must use **Build and deployment > Source: GitHub Actions** for this repository. Do not use **Deploy from a branch > root**, because that serves the unbuilt Vite source files and the browser will try to load `/src/main.tsx` directly.

Repository: <https://github.com/bitwikiorg/init.md>

## 10. BIThub Discussion

Use BIThub to discuss the protocol, ask questions, share templates, propose improvements, and report implementation experiences.

- BIThub forum: <https://hub.bitwiki.org/>

## 11. Contributing

Contributions should preserve the distinction between the general protocol and target-specific templates. Avoid adding universal requirements to the root protocol when they belong in a template.

When updating templates, keep the Markdown files canonical and maintain their metadata fields.

## 12. License

MIT License. See `LICENSE`.