---
name: Dry-Run Init Protocol
target: Any target that needs proposed initialization work without mutation
purpose: Inspect the target, determine requirements, produce an initialization plan, and report what would become operational without changing files, services, or state.
mode:
  - dry run
creates:
  - No target artifacts
configures:
  - No target settings
validates:
  - Proposed checks are identified and checked for feasibility where possible without mutation
optional_outputs:
  - Dry-run report outside the target when the operator requests one
  - Proposed PLAN.md content when actionable work remains
  - Proposed validation checklist
---

# Dry-Run Init Protocol

Use this template to rehearse initialization without changing the target. The dry run may inspect and reason about requirements, but it must not create, configure, delete, install, migrate, start, stop, or overwrite anything in the target.

## Target Fit

Use this template when:

- the operator wants to understand impact before active initialization;
- the target is sensitive, remote, production-like, or shared;
- access is read-only;
- the correct template is unknown;
- proposed outputs need review before creation.

This template works for any target type. Server checks appear only when the target is actually a server or infrastructure environment.

## Procedure

### `INSPECT`

- `description`: Inspect enough to understand the target and its likely operational requirements.
- `inspect`: Existing files, configuration, docs, service descriptions, tool definitions, manifests, environment notes, or user-provided constraints that are relevant to the target.
- `condition`: Do not mutate. Do not broaden inspection beyond the target without reason.
- `source`: Read-only evidence.

### `DETERMINE`

- `description`: Select the closest initialization pattern or combine compatible pattern sections.
- `action`: Identify what would need to be created, configured, preserved, updated, or validated in an active run.
- `output`: A proposed initialization plan with conditions.

The plan should distinguish:

- required work;
- optional work;
- artifacts that should not be changed;
- questions or permissions needed before active mode;
- validation steps that would prove operation.

### `CREATE`

- `description`: Do not create target artifacts.
- `action`: If a report is requested, place it only where the operator explicitly permits. Otherwise keep the dry-run report in the response or calling system.
- `output`: Proposed content or artifact names, not actual target files.

### `CONFIGURE`

- `description`: Do not configure the target.
- `action`: Describe configuration that would be required in active mode, including paths, dependencies, services, tools, environment variables, agent instructions, or integrations.

### `VALIDATE`

- `description`: Validate the plan, not the initialized result.
- `validation`: Confirm the proposed work is internally consistent, target-relevant, and has a plausible validation method. Where read-only checks are available, use them to reduce uncertainty.
- `status`: Use `DRY_RUN_COMPLETE` when the plan is complete, or `BLOCKED` when the plan cannot be formed from available evidence.

### `REPORT`

Report:

- target identified;
- evidence inspected;
- selected template or pattern;
- work that would be created;
- work that would be configured;
- validation that would be run;
- artifacts that would remain untouched;
- warnings, unknowns, permissions, or blockers;
- whether the target would likely become operational after active initialization.

## Non-Mutation Rule

A dry run makes no target changes. Proposed files such as `README.md`, `AGENTS.md`, `SNAPSHOT.md`, server reports, task files, or configuration examples are only proposed unless the operator switches to active mode.