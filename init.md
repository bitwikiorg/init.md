# init.md - General Operational Initialization Protocol

`init.md` is a general initialization procedure that inspects a target, determines what it needs to become operational, creates and configures what applies, validates the result, and reports its operational state.

`init.md` is a target-specific initialization protocol for making a project, agent, service, server, workspace, or other system operational.

It does not impose one universal scaffold. It first inspects what already exists, identifies the target's purpose and requirements, determines what is missing or misconfigured, and then creates or configures only what applies.

Depending on the target, this may involve:

- creating directories or files;
- generating project documentation;
- adding an `AGENTS.md` file;
- configuring dependencies, tools, services, or environments;
- establishing startup procedures;
- creating snapshots or context files;
- defining tests or readiness checks.

It then validates that the initialized target works as intended and reports:

- what was inspected;
- what was created or changed;
- what was successfully validated;
- what remains incomplete or blocked;
- whether the target is operational.

Its core sequence is:

**Inspect -> Determine -> Create -> Configure -> Validate -> Report**

Templates provide complete concrete initialization procedures for different kinds of targets, while the canonical `init.md` defines the general method.

## 1. Purpose

Use this protocol to determine what a target needs in order to become operational.

The target may be new, incomplete, misconfigured, inactive, restored from a previous state, or being started in a new environment. Initialization succeeds when the relevant requirements have been inspected, created or configured when applicable, validated, and reported clearly.

## 2. Target

Before selecting an initialization pattern, identify the target without prescribing its type.

Record:

- what is being initialized;
- its intended function;
- its current location or environment;
- its expected users or operators;
- its desired operational result;
- any explicit constraints supplied by the user, project, or environment.

Target examples include software projects, repositories, AI agents, servers, services, workspaces, research environments, data pipelines, applications, tools, local directories, remote environments, and existing systems requiring restoration or reconfiguration.

## 3. Initialization Modes

Modes describe how the procedure should behave. A template may support one or more modes, and may define additional modes when useful.

### Active

Inspect the target and perform applicable initialization work.

### Dry run

Inspect the target, determine requirements, and report proposed work without changing the target.

### Repair

Inspect an existing target, identify missing or invalid initialization elements, and correct what applies.

### Reinitialize

Re-evaluate an already initialized target after substantial changes to its purpose, environment, dependencies, ownership, or operating model.

## 4. General Procedure

Follow the same high-level sequence for every target. The implementation details come from the target and selected template.

### `INSPECT`

Determine:

- what exists;
- what the target appears to be;
- what instructions and configuration already exist;
- what is complete;
- what is missing;
- what is contradictory;
- what can be reused.

Inspection must be relevant to the target. Do not scan unrelated files, directories, systems, or infrastructure without reason.

### `DETERMINE`

Determine:

- the target's operational requirements;
- which initialization pattern applies;
- which files, directories, dependencies, settings, tools, or services are required;
- which existing artifacts should remain unchanged;
- which outputs are useful;
- what validation is possible.

The procedure may select one template, combine compatible template sections, or create a target-specific initialization plan.

### `CREATE`

Create only what applies to the target and selected initialization pattern.

Possible outputs include:

- directories;
- configuration files;
- documentation;
- dependency manifests;
- agent instructions;
- project requirements;
- startup scripts;
- environment examples;
- context files;
- snapshots;
- tests;
- task files;
- data structures;
- service definitions.

These are examples, not universal requirements.

### `CONFIGURE`

Configure required elements so they work together.

Possible configuration includes:

- paths;
- runtime settings;
- dependencies;
- scripts;
- services;
- tools;
- environment variables;
- agent instructions;
- file relationships;
- permissions;
- integrations.

Only configure what the selected target and template require.

### `VALIDATE`

Validate that the intended result is operational.

Validation may include:

- required files exist;
- configuration parses;
- commands execute;
- services start;
- dependencies resolve;
- tests pass;
- instructions are internally consistent;
- expected outputs can be produced;
- required tools are accessible.

Validation must be derived from the target. Do not require server diagnostics for non-server targets. Do not declare success without a relevant validation step.

### `REPORT`

Report:

- what target was initialized;
- what was inspected;
- what was created;
- what was configured;
- what was validated;
- what remains incomplete;
- what warnings or blockers remain;
- where the important outputs are located;
- whether the target is operational.

## 5. Result States

Use this small general vocabulary unless a template needs to extend it:

- `OPERATIONAL`
- `OPERATIONAL_WITH_WARNINGS`
- `BLOCKED`
- `DRY_RUN_COMPLETE`

## 6. Conditional Agent Instructions

During inspection, determine whether the target will be operated or modified by AI agents.

When agent instructions are applicable:

- inspect whether an `AGENTS.md` file already exists;
- preserve valid existing instructions;
- create an `AGENTS.md` file when it would materially improve operation and none exists;
- derive its contents from the actual target;
- do not install one generic `AGENTS.md` into every project;
- do not assume different projects require identical agent instructions.

Different projects should have different `AGENTS.md` files. Different targets should have different `init.md` implementations.

## 7. Conditional Outputs

No output file is universally required except where the selected template or target requires it.

Examples:

- Generate a PRD only when product requirements need to be established.
- Generate a snapshot only when a resumable environment or system-state record is useful.
- Generate a README only when project documentation is missing or inadequate.
- Generate an `AGENTS.md` file only when agent operation applies.
- Generate a server report only for server or infrastructure targets.
- Generate a context file only when context must be externalized.
- Generate task files only when actionable work remains.

The operational artifact vocabulary for this phase includes `INIT.md`, `AGENTS.md`, `SELF.md`, `USER.md`, `TOOLS.md`, `STATE.md`, `PLAN.md`, `SNAPSHOT.md`, and project-specific specifications, configuration, indexes, or validation artifacts. Each artifact remains conditional.

## 8. Existing Work

Prefer adaptation over unnecessary replacement.

The procedure should:

- preserve relevant existing files;
- update incomplete files when appropriate;
- avoid generating duplicates;
- avoid overwriting substantial user-authored work without clear reason;
- identify conflicts before changing them;
- reuse existing project conventions where possible.

This is not a restrictive safety framework. It is basic initialization correctness.

## 9. Instruction Vocabulary

Use a small vocabulary when a step needs structure:

- `description` — what the step accomplishes;
- `condition` — when the step applies;
- `inspect` — what must be examined;
- `action` — what should be created or configured;
- `output` — any resulting artifact;
- `validation` — how the result is checked;
- `source` — evidence or input used;
- `status` — resulting operational state.

Do not require every field in every step. Do not make shell commands the default representation. Use commands only when commands are the right validation or configuration tool.

## 10. Templates

Templates are complete concrete initialization procedures for target categories, modes, or operating contexts.

Use a template when it better matches the target than the root procedure alone. A template may be used directly, adapted, or combined with compatible sections from another template when the target requires it.

Template source files may contain site metadata for indexing and display, but the usable instruction body is the protocol content itself.

## Final Product Statement

`init.md` is not one fixed scaffold.

It is a general procedure for determining what a target needs in order to become operational.

Templates provide complete concrete initialization procedures for different targets.

Inspect what exists. Determine what is needed. Create what applies. Configure what is required. Validate the result. Report what became operational.