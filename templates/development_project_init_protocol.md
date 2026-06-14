---
name: Development Project Init Protocol
target: Software development project, repository, application, library, CLI, website, or monorepo
purpose: Inspect a development target, determine the project-specific artifacts and commands required for productive operation, configure what applies, validate the developer workflow, and report readiness.
mode:
  - active
  - dry run
  - repair
  - reinitialize
creates:
  - README.md when missing or inadequate
  - AGENTS.md when agent contributors will operate in the project and no valid guidance exists
  - PRD.md or specification files when product requirements must be established
  - Source, test, task, or configuration files only when required by the project
configures:
  - Package or dependency manifests
  - Development scripts
  - Linting and formatting
  - Test commands
  - Build and preview commands
  - Environment examples
validates:
  - Required commands run or are documented as unavailable
  - Manifests parse
  - Dependencies resolve where installation is in scope
  - Tests, lint, type checks, or builds pass when applicable
optional_outputs:
  - README.md
  - AGENTS.md
  - PRD.md
  - .env.example
  - PLAN.md
  - task or issue files
  - source directories
  - tests
  - validation report
---

# Development Project Init Protocol

Use this template for software development projects. A small library, a website, a CLI, and a monorepo should not receive identical output. The target determines which artifacts and commands apply.

## Target Fit

Use this template when the target is a codebase, repository, application, package, library, website, CLI, tool, or monorepo.

Do not assume every development project needs a PRD, `AGENTS.md`, tests, a package manager, a `src` directory, or the same build commands.

## Procedure

### `INSPECT`

- `description`: Understand the project as it exists.
- `inspect`: Repository files, README, license, package or dependency manifests, source layout, tests, scripts, build config, deployment config, environment examples, issue or task files, existing specs, existing agent instructions, and user constraints.
- `condition`: Preserve local conventions and avoid unrelated cleanup.
- `source`: Files in the project, package scripts, framework configuration, docs, and operator instructions.

### `DETERMINE`

- `description`: Decide what the project requires to become operational for development.
- `action`: Identify project type, expected developer workflow, missing documentation, missing manifests, dependency setup, command surface, environment requirements, validation checks, and optional agent guidance.
- `output`: A project-specific initialization plan.

Possible decisions include:

- create or update `README.md` only when entry-point documentation is missing or misleading;
- create `AGENTS.md` only when agent contribution or operation applies;
- create `PRD.md` only when product requirements need to be established;
- add `.env.example` only when environment variables are required;
- add or repair package scripts only when the project has a compatible package system;
- add tests only when there is a clear test surface and project convention;
- add source directories only when the project lacks an expected implementation location.

### `CREATE`

Create only applicable artifacts. Possible outputs include:

- `README.md`;
- `AGENTS.md`;
- `PRD.md` or another specification file;
- package or dependency manifests;
- source directories;
- test files;
- lint or formatting configuration;
- `.env.example`;
- development scripts;
- task or issue files;
- validation reports.

When an existing file is substantial and mostly correct, update it instead of replacing it.

### `CONFIGURE`

- `description`: Make the selected development artifacts work together.
- `action`: Configure dependency manifests, package scripts, build commands, test commands, linting, formatting, environment examples, deployment settings, agent instructions, file references, and documentation links.
- `condition`: Match the project's existing framework and style.

### `VALIDATE`

- `description`: Confirm the developer workflow is operational.
- `validation`: Use relevant checks such as manifest parsing, dependency installation when permitted, lint, type check, tests, build, preview, executable CLI command, documentation link review, or agent instruction consistency.
- `status`: Use `OPERATIONAL`, `OPERATIONAL_WITH_WARNINGS`, `BLOCKED`, or `DRY_RUN_COMPLETE`.

Do not declare a development project operational without a validation step tied to its real workflow.

### `REPORT`

Report:

- project identified;
- project type and operational goal;
- inspected files and commands;
- created or updated artifacts;
- configuration changes;
- validation commands or reviews;
- remaining warnings, blockers, or deferred work;
- final status.

## Project-Specific Examples

- A small library may need accurate package metadata, a README usage example, and a test command.
- A website may need build and preview commands plus deployment notes.
- A CLI may need executable configuration, command examples, and smoke tests.
- A monorepo may need workspace discovery, package-specific commands, and scoped agent instructions.