# init.md — General Operational Initialization Protocol PRD

## Product Definition

`init.md` is a human- and machine-readable procedure for inspecting a target, determining what it requires, applying the appropriate initialization pattern, validating the result, and reporting its operational state.

The repository provides the canonical general protocol, target-specific templates, and a static website for browsing and copying those templates.

## Scope

This version focuses on broad target initialization. A target may be a software project, repository, AI agent, server, service, workspace, research environment, data pipeline, application, tool, local directory, remote environment, or existing system requiring restoration or reconfiguration.

The project does not provide a backend, database, account system, hosted execution runtime, or automatic target execution in this version.

## Core Model

The root protocol determines the initialization process:

1. Inspect what exists.
2. Determine what is needed.
3. Create what applies.
4. Configure what is required.
5. Validate the result.
6. Report what became operational.

Templates define concrete initialization patterns for specific targets and modes. Target-specific requirements belong in templates rather than the root protocol.

## Template-Driven Specialization

The repository includes these canonical templates:

- Minimal initialization.
- Dry-run initialization.
- Development-project initialization.
- Agent initialization.
- Server initialization.

Templates declare metadata for name, target, purpose, mode, likely created artifacts, configured elements, validation checks, and optional outputs. Metadata describes likely behavior and does not force universal output creation.

## Conditional Artifact Generation

Generated files are conditional. No output file is universally required except where the selected template or target requires it.

Examples:

- Generate a README only when project documentation is missing or inadequate.
- Generate a PRD only when product requirements need to be established.
- Generate `AGENTS.md` only when agent operation applies.
- Generate a snapshot only when a point-in-time record is useful.
- Generate a server report only for server or infrastructure targets.

## Canonical Markdown Source

The Markdown files under `templates/` are the canonical source of template content. The website imports those Markdown files directly with Vite raw imports.

The template browser must:

- render content from the canonical Markdown files;
- parse and display template metadata;
- provide source links to each Markdown file;
- copy the exact canonical Markdown content, including metadata;
- avoid storing complete template bodies as TypeScript strings.

The build runs a template integrity check that verifies the expected template files and metadata fields exist.

## Website Requirements

The website is a static Vite and React application deployed through GitHub Pages. It preserves the template browser, copy-to-clipboard behavior, and the Overview, Protocol, Templates, and Guide structure.

The public interface should communicate:

- `init.md` is not one fixed scaffold;
- the six-stage initialization process;
- the relationship between the root protocol and templates;
- conditional generated outputs;
- target-specific agent instructions;
- BIThub as the discussion and contribution destination.

## BITwiki And BIThub Integration

The visual and editorial system should align with the BITwiki ecosystem through strong black, white, and neutral structure, high-contrast typography, geometric protocol surfaces, restrained accents, and precise technical language.

Required public links:

- GitHub repository: <https://github.com/bitwikiorg/init.md>
- BIThub forum: <https://hub.bitwiki.org/>
- BIThub Guides: <https://hub.bitwiki.org/c/platform/guides/28>
- BITwiki: <https://bitwiki.org/>

BIThub is presented as the place to discuss the protocol, ask questions, share templates, propose improvements, and report implementation experiences.

## Deployment

GitHub Pages remains the public interface. The existing deploy workflow builds the Vite site and uploads the `dist` artifact to Pages.

## Non-Goals

- No new framework.
- No backend service.
- No database.
- No account system.
- No hosted execution runtime.
- No universal production server checklist in the root protocol.
- No universal requirement to generate README, PRD, snapshot, context, task, server, or agent files.

## Acceptance Criteria

- Root `init.md` is target-neutral and follows Inspect, Determine, Create, Configure, Validate, Report.
- Server-specific checks live in the server template.
- Existing minimal, server, and dry-run template concepts are preserved and corrected.
- Development-project and agent templates exist.
- Templates include metadata and optional outputs.
- The website renders canonical Markdown template files and copies exact source content.
- GitHub, BIThub, Guides, and BITwiki links are visible.
- README and PRD describe the corrected model.
- Production build succeeds without adding a backend or execution runtime.