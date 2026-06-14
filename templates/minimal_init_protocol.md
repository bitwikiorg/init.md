---
name: Minimal Init Protocol
target: Any small target with a narrow operational gap
purpose: Identify the least work required for the target to become operational, apply only that work, validate it, and report the result.
mode:
  - active
  - repair
  - reinitialize
creates:
  - The smallest missing artifact or structure that the target actually needs
configures:
  - Only relationships, settings, or instructions required by that artifact
validates:
  - The minimum relevant check proving the target can operate as intended
optional_outputs:
  - README.md when human-facing documentation is missing or inadequate
  - AGENTS.md when agent operation applies and no valid instruction file exists
  - INIT.md or init.md when the target needs a local initialization procedure
  - PLAN.md when unresolved work remains
---

# Minimal Init Protocol

Use this template when a target needs the smallest reasonable initialization pass. The goal is not to create a standard project layout. The goal is to discover the minimum missing requirement, apply it when appropriate, validate it, and report the state.

## Target Fit

Use this template when:

- the target is small, local, or clearly scoped;
- the operator wants a low-change initialization;
- one missing artifact, setting, or instruction may be enough;
- broad infrastructure, product, or agent setup would be excessive.

Do not assume server access, production infrastructure, package manifests, snapshots, PRDs, or agent instructions.

## Procedure

### `INSPECT`

- `description`: Identify what the target is and what already exists.
- `inspect`: The target location, visible files or configuration, existing instructions, obvious entry points, and operator constraints.
- `condition`: Stay within the target boundary unless another location is directly referenced.
- `source`: Existing files, directory names, user-provided constraints, or environment metadata that is directly relevant.

### `DETERMINE`

- `description`: Decide the minimum requirement that blocks operation.
- `action`: Choose the smallest applicable initialization step.
- `condition`: If no change is needed, move directly to validation and report.
- `output`: A short statement of the selected requirement and why it applies.

Possible minimum requirements include one missing instruction file, one directory, one configuration value, one dependency manifest, one validation command, or one documentation update. These are examples, not defaults.

### `CREATE`

- `description`: Create only the selected missing artifact or structure.
- `condition`: Skip creation when the target already contains a usable equivalent.
- `action`: Preserve existing work and avoid duplicates.
- `output`: The created or updated artifact, if any.

### `CONFIGURE`

- `description`: Connect the created or existing artifact to the target.
- `condition`: Configure only what is required for the selected minimum step.
- `action`: Update paths, references, scripts, permissions, or instructions when they are directly necessary.

### `VALIDATE`

- `description`: Prove the target can perform its intended minimum operation.
- `validation`: Use the cheapest relevant check available, such as file existence, parseability, a documented command, a link between files, or a simple manual review.
- `status`: Use `OPERATIONAL`, `OPERATIONAL_WITH_WARNINGS`, or `BLOCKED`.

### `REPORT`

Report:

- target identified;
- requirement selected;
- artifacts created or updated;
- configuration performed;
- validation result;
- remaining warnings or blockers;
- final status.

## Example Outcomes

- A local directory with no documentation receives a concise `README.md`, then validates that the file identifies the target and next action.
- A small code project with adequate documentation but no agent instructions receives an `AGENTS.md` only if agents will operate in it.
- A target with all required artifacts receives no new files and reports `OPERATIONAL` after validation.