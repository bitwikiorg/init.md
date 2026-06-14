---
name: Agent Init Protocol
target: AI agent, agent workspace, agent-enabled repository, automation worker, or tool-using assistant environment
purpose: Inspect what an agent requires to operate in a specific target, create or configure only applicable instructions, tools, prompts, state, and validation checks, and report agent readiness.
mode:
  - active
  - dry run
  - repair
  - reinitialize
creates:
  - AGENTS.md when agent operation applies and valid instructions are absent
  - SELF.md when identity, role, capabilities, or boundaries must be explicit
  - USER.md when operator context is required for correct interaction
  - TOOLS.md when tool availability, permissions, or invocation rules must be documented
  - STATE.md or PLAN.md when current condition or pending work must be externalized
configures:
  - Agent instructions
  - Model or provider settings when applicable
  - Tool definitions
  - Prompt files
  - Workspace directories
  - State or context references
  - Expected inputs and outputs
validates:
  - Instructions are target-specific and internally consistent
  - Required tools or providers are accessible where validation is permitted
  - Startup path, prompts, and expected outputs are clear
  - Existing instructions are preserved or repaired without unnecessary replacement
optional_outputs:
  - AGENTS.md
  - SELF.md
  - USER.md
  - TOOLS.md
  - STATE.md
  - PLAN.md
  - SNAPSHOT.md
  - Prompt files
  - Tool registry
  - Startup validation report
---

# Agent Init Protocol

Use this template when the target will be operated, modified, or assisted by an AI agent. The template does not prescribe one universal agent file tree. It determines what this specific agent target requires.

## Target Fit

Use this template when the target is an AI agent, agent workspace, agent-enabled repository, automation worker, tool-using assistant environment, or system whose operation depends on agent instructions.

Do not create generic agent files in every project. Agent artifacts are useful only when they materially improve operation.

## Procedure

### `INSPECT`

- `description`: Identify the agent's intended role and the target it operates on.
- `inspect`: Existing `AGENTS.md` files, prompts, tool definitions, provider or model configuration, workspace directories, state files, context files, schedules, expected inputs and outputs, permissions, and operator constraints.
- `condition`: Preserve valid existing instructions. Respect nested instruction scopes when they exist.
- `source`: Existing agent files, project docs, tool schemas, prompt files, configuration, and user instructions.

### `DETERMINE`

- `description`: Decide what the agent needs to become operational in this target.
- `action`: Identify required instructions, tool access, prompt structure, provider configuration, state representation, context handoff, validation checks, and boundaries.
- `output`: A target-specific agent initialization plan.

Possible decisions include:

- create `AGENTS.md` only when agent operation applies and no valid instruction file exists;
- create `SELF.md` only when identity, role, capabilities, or boundaries need to be explicit;
- create `USER.md` only when operator context materially affects operation;
- create `TOOLS.md` only when tool permissions or invocation rules need durable documentation;
- create `STATE.md` or `PLAN.md` only when current condition or pending work must be externalized;
- create `SNAPSHOT.md` only when a point-in-time state record is useful.

Continuity artifacts such as durable memory or heartbeat instructions may exist in some systems, but this template does not prescribe them as normative outputs for this phase.

### `CREATE`

Create only applicable artifacts. Possible outputs include:

- `AGENTS.md`;
- `SELF.md`;
- `USER.md`;
- `TOOLS.md`;
- `STATE.md`;
- `PLAN.md`;
- `SNAPSHOT.md`;
- prompt files;
- tool registry files;
- startup validation reports;
- workspace directories.

Every artifact must be derived from the target. Do not install a reusable generic instruction file without adaptation.

### `CONFIGURE`

- `description`: Make the agent artifacts usable together.
- `action`: Configure instruction precedence, model or provider settings, tool permissions, prompt references, state locations, input and output conventions, schedules when applicable, and validation commands.
- `condition`: Configure only what is required for this agent target.

### `VALIDATE`

- `description`: Confirm the agent can operate with the initialized instructions and tools.
- `validation`: Check instruction consistency, required files, tool availability, provider configuration, prompt references, expected input and output paths, state handoff, and any startup or dry-run command the target supports.
- `status`: Use `OPERATIONAL`, `OPERATIONAL_WITH_WARNINGS`, `BLOCKED`, or `DRY_RUN_COMPLETE`.

### `REPORT`

Report:

- agent target identified;
- role, boundaries, and operating context;
- inspected instructions, prompts, tools, and state;
- created or updated artifacts;
- configuration performed;
- validation result;
- warnings, missing access, or blockers;
- final status.

## Agent-Specific Notes

- Different targets should have different agent instructions.
- Nested projects may require nested `AGENTS.md` files.
- Tool access must reflect real permissions and limitations.
- Agent readiness is validated by the target's required startup path, not by a generic checklist.