# init.md — Minimal Initialization Protocol

**Audience**
- Humans: understand what this is and how to adapt it safely.
- Agents: parse this structure to move from cold start to "READY" with minimal side effects.

**Conventions**
- `description`: human-readable explanation
- `command`: a safe, minimal shell probe (optional; prefer safer alternatives)
- `action`: a conceptual step the agent performs internally
- `policy`: a guardrail or constraint that must be followed
- `source`: canonical reference for verification or traceability
- `output_path`: target path for generated artifacts (never raw secrets)
- `await_instructions`: whether to pause for operator input

## INIT_SEQUENCE

### HOST_PREFLIGHT
Establish a basic understanding of the host and clock alignment without mutating the system.

**Steps:**
- **Description**: Note OS family and kernel; ensure basic toolchain compatibility.
  - **Action**: Read /etc/os-release and os.release() via safe file reads or APIs.
  - **Source**: OS_INFO

- **Description**: Confirm time coherence (NTP/clock drift) for consistent logs and metrics.
  - **Action**: Inspect prior timing notes or safe system time APIs (no privileged writes).
  - **Source**: SYSTEM_TIME_INFO

### RESOURCE_BASELINE
Draft a provisional resource profile to guide conservative concurrency.

**Steps:**
- **Description**: Capture approximate CPU cores, memory, storage headroom.
  - **Action**: Gather from safe APIs or cached diagnostics; avoid invasive polling.
  - **Source**: SYSTEM_HARDWARE_METRICS

- **Description**: Flag potential bottlenecks (disk saturation, elevated load).
  - **Action**: Set soft thresholds for warnings; do not enforce limits here.
  - **Source**: SYSTEM_PERFORMANCE_METRICS

### TOOL_DISCOVERY_AND_API_POLICY
Enumerate available tools/adapters and state strict routing policies.

**Steps:**
- **Description**: Load tool registry/capability matrix if present.
  - **Action**: Parse a tool schema file into memory (if available).
  - **Source**: TOOL_SCHEMA

- **Description**: Enforce API routing rules to maintain safety and provenance.
  - **Policy**:
    - Web search must use the designated search adapter.
    - REST calls must use approved HTTP clients/infrastructure modules.
    - Do not proxy REST via generic web fetchers not designed for it.
    - Prefer dedicated file tools for reading large or varied file types.
  - **Source**: API_ROUTING_POLICY

### SECRET_MANAGEMENT
Handle credentials securely; never hardcode secrets or read from arbitrary files.

**Steps:**
- **Description**: Retrieve credentials via a vault or approved secret manager.
  - **Action**: Load secrets into memory only; do not write to disk; no .env mutation at runtime.
  - **Source**: SECURE_VAULT

- **Description**: Confirm private key and secret storage permissions (conceptually if needed).
  - **Action**: Validate intended permission posture; log discrepancies for remediation.
  - **Source**: SECRET_STORAGE_PERMISSIONS

### NETWORK_SECURITY
Understand intended firewall posture and scanning plans; avoid active mutations by default.

**Steps:**
- **Description**: Record which ports/services should be open/closed.
  - **Action**: Log planned firewall narrative; do not apply changes here.
  - **Source**: FIREWALL_POLICY

- **Description**: Outline future security scanning cadence and tooling.
  - **Action**: Specify scanners (SAST/DAST/dependency audit) and ownership for activation later.
  - **Source**: SECURITY_SCANNER_PLAN

### CONTEXT_LOADING
Prime memory with configuration, docs, and project context.

**Steps:**
- **Description**: Identify and list context files (md/json/yml) and their purposes.
  - **Action**: Build an in-memory index; avoid loading large binaries.
  - **Source**: FILE_SYSTEM_SCAN

- **Description**: Load essential configs/prompts/docs into a fast in-memory map.
  - **Action**: Parse select files into a structured cache; skip raw secrets.
  - **Source**: PARSED_CONTEXT_FILES

- **Description**: Persist the context map for quick restoration if permitted.
  - **Action**: Serialize context summary (not raw contents) to a snapshot file.
  - **Output Path**: ./cache/context.snapshot.json
  - **Source**: SERIALIZED_CONTEXT_MAP

- **Description**: Inventory key scripts/utilities for operational awareness.
  - **Action**: List notable scripts and their intended roles.
  - **Source**: SCRIPT_INVENTORY

### CODE_GOVERNANCE_AND_STATE
Reinforce auditability and data hygiene.

**Steps:**
- **Description**: Capture semantic diffs for any code mutations.
  - **Policy**: Append diffs to ./logs/code_history/<timestamp>.patch when changes occur.
  - **Source**: VERSION_CONTROL_POLICY

- **Description**: Protect templates and historical scripts.
  - **Policy**: Deletions require an explicit purge flag acknowledged by the operator.
  - **Source**: CODE_RETENTION_POLICY

- **Description**: Plan backup strategy for data directories.
  - **Action**: Define sync flow to backup target; defer execution until approved.
  - **Source**: BACKUP_STRATEGY

- **Description**: Plan cache hygiene.
  - **Action**: Age-out files older than 7 days; confirm before enabling in production.
  - **Source**: CACHE_POLICY

- **Description**: Plan telemetry/logging fan-out.
  - **Action**: Describe how logs will forward to centralized sinks when configured.
  - **Source**: CENTRALIZED_LOGGING_PLAN

### STARTUP_VALIDATION_AND_ROLLBACK
Define diagnostics and READY/ROLLBACK signals.

**Steps:**
- **Description**: List lint/test/static analysis to run before READY.
  - **Action**: Document commands and pass criteria; do not run by default.
  - **Source**: DIAGNOSTIC_CHECKLIST

- **Description**: Define the READY signal and rollback triggers.
  - **Action**: Specify log format and any state file changes for READY vs. ROLLBACK.
  - **Source**: SYSTEM_READINESS_SIGNAL

### SELF_PRIMING_AND_CONTEXTUALIZATION
Load core directives, prompts, and recent memory to ground behavior.

**Steps:**
- **Description**: Read core directives and instance/system prompts.
  - **Action**: Load directives and system overview docs into working memory.
  - **Source**: CORE_AND_PROMPTS

- **Description**: Engage cognitive recall of recent, high-salience interactions.
  - **Action**: Query memory adapters to assemble a current situational vector.
  - **Source**: INTERNAL_MEMORY_RETRIEVAL

- **Description**: Confirm priming complete and await commands.
  - **Action**: Log completion and enter ACCEPTING state.
  - **Source**: SELF_PRIMING_STATUS

## MINIMUM_RUNTIME_CONTEXT_LOAD

Essential elements that should be present in working memory for baseline operation:

- Host metadata (CPU cores, RAM, IP, GPU) from cached metrics files if available.
- Tool capability matrix (if applicable).
- Core directives and system prompts.
- Key scripts and docs index (paths + purposes, not raw contents).
- Recent log excerpt or last-run context (if present).
- Version history patches (for auditability).
- Snapshot of context state (sanitized summary).

## EXECUTION_START

Produce a concise, machine-readable snapshot and announce readiness.

**Steps:**
- **Description**: Generate a snapshot with directory overview, metrics table, and context locations.
  - **Action**: Create a Markdown file summarizing the environment and context (no raw contents).
  - **Output File**: ./INIT_CONTEXT_SNAPSHOT.md
  - **Content Structure**:
    - Directory tree (depth 3, omit hidden/system dirs) with purposes.
    - Metrics table: hostname, uptime, CPU cores, RAM, GPU presence, disk free %, load avg (5m), IP, timezone, last snapshot time.
    - Key context locations (what it is, where it lives, where to learn more).
  - **Data Principles**:
    - Factual, minimal, human- and machine-readable.
    - No secrets, no raw file contents.
  - **Source**: SYSTEM_READINESS_REPORT

- **Description**: Announce snapshot path and READY state.
  - **Action**: Print a concise message and await further instructions.
  - **Source**: SYSTEM_READINESS_REPORT
  - **Await Instructions**: true