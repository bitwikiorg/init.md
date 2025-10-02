# Server Init Protocol (Template)

**Intent**
- Production-oriented initialization with clear, safe probes.
- Emphasizes precise execution rules, architectural context, and tool policies.

## INIT_SEQUENCE

### HOST_PREFLIGHT
Verify OS/kernel compatibility and time alignment (read-only by default).

**Steps:**
- **Description**: Note OS family and kernel.
  - **Action**: Use safe reads; prefer APIs to shell.
  - **Source**: OS_INFO

- **Description**: Verify NTP/time coherence.
  - **Action**: Read time settings; report drift; no mutation.
  - **Source**: SYSTEM_TIME_INFO

### RESOURCE_BASELINE
Capture compute/storage baseline to size workloads.

**Steps:**
- **Description**: CPU, RAM, GPU presence (if applicable), disk free.
  - **Action**: Prefer safe APIs and cached metrics.
  - **Source**: SYSTEM_HARDWARE_METRICS

- **Description**: Load average and thresholds.
  - **Action**: Read load metrics; set warning thresholds.
  - **Source**: SYSTEM_PERFORMANCE_METRICS

### ARCHITECTURE_AND_TOOLS
Ground execution rules in actual system design.

**Steps:**
- **Description**: Document services, runtimes, and schedulers in use.
  - **Action**: Summarize architecture: containers, queues, cron, orchestrators.
  - **Source**: SYSTEM_ARCHITECTURE_DOCS

- **Description**: Declare toolchain versions and paths.
  - **Action**: Pin required CLIs and SDKs; define PATH expectations.
  - **Source**: TOOLCHAIN_POLICY

### TOOL_DISCOVERY_AND_API_POLICY
Define exact routing for external services.

**Steps:**
- **Description**: Load capability matrix (if present).
  - **Action**: Parse and validate schemas.
  - **Source**: TOOL_SCHEMA

- **Description**: Enforce API routing rules.
  - **Policy**:
    - Use approved HTTP clients/infrastructure modules.
    - Do not proxy REST via generic fetchers.
    - File access via dedicated file tools; stream large files.
  - **Source**: API_ROUTING_POLICY

### SECRET_MANAGEMENT
Strict credential handling and permissions.

**Steps:**
- **Description**: Pull secrets from vault into memory only.
  - **Action**: No disk writes; short-lived tokens preferred.
  - **Source**: SECURE_VAULT

- **Description**: Validate permissions on secret dirs/keys.
  - **Action**: Confirm intended permission posture.
  - **Source**: SECRET_STORAGE_PERMISSIONS

### NETWORK_SECURITY
Confirm firewall posture and scanning plan.

**Steps:**
- **Description**: Authorized ports/services only.
  - **Action**: Document intended ufw/security-group state.
  - **Source**: FIREWALL_POLICY

- **Description**: Scanning cadence (SAST/DAST/deps).
  - **Action**: Define cadence, owners, and thresholds.
  - **Source**: SECURITY_SCANNER_PLAN

### CONTEXT_LOADING
Load environment, docs, and schedules.

**Steps:**
- **Description**: Index configs and docs.
  - **Action**: Build in-memory map of paths and purposes.
  - **Source**: FILE_SYSTEM_SCAN

- **Description**: Inventory cron manifests.
  - **Action**: List active schedules and owners.
  - **Source**: PROJECT_CRON_MANIFESTS

- **Description**: Persist sanitized context snapshot.
  - **Action**: Serialize a summary (no raw content) to disk.
  - **Output Path**: ./cache/context.snapshot.json
  - **Source**: SERIALIZED_CONTEXT_MAP

### CODE_GOVERNANCE_AND_STATE
Auditability, backups, caches, telemetry.

**Steps:**
- **Description**: Semantic diffs for changes.
  - **Policy**: Append to ./logs/code_history/<timestamp>.patch
  - **Source**: VERSION_CONTROL_POLICY

- **Description**: Backup strategy (data dirs).
  - **Action**: Define rsync/remote storage targets; defer execution.
  - **Source**: BACKUP_STRATEGY

- **Description**: Cache hygiene.
  - **Action**: Expire >7d files when enabled; configurable.
  - **Source**: CACHE_POLICY

- **Description**: Logging fan-out.
  - **Action**: Plan forwarding to centralized sinks.
  - **Source**: CENTRALIZED_LOGGING_PLAN

### STARTUP_VALIDATION_AND_ROLLBACK
Diagnostics, readiness, and rollback.

**Steps:**
- **Description**: Lint/tests/static analysis.
  - **Action**: List commands and pass criteria.
  - **Source**: DIAGNOSTIC_CHECKLIST

- **Description**: READY signal and rollback triggers.
  - **Action**: Define log format and state change; specify when to roll back.
  - **Source**: SYSTEM_READINESS_SIGNAL

### SELF_PRIMING_AND_CONTEXTUALIZATION
Load directives/prompts and recent context.

**Steps:**
- **Description**: Core directives and system prompts.
  - **Action**: Load into working memory.
  - **Source**: CORE_AND_PROMPTS

- **Description**: Memory recall of salient events.
  - **Action**: Query memory adapters; assemble situational vector.
  - **Source**: INTERNAL_MEMORY_RETRIEVAL

- **Description**: Enter ACCEPTING state.
  - **Action**: Log completion and await commands.
  - **Source**: SELF_PRIMING_STATUS

## MINIMUM_RUNTIME_CONTEXT_LOAD

Essential elements:
- Host metadata (from cached metrics)
- Tool capability matrix (if present)
- Core directives/prompts
- Cron manifests and script inventory
- Recent logs (sanitized) and version patches
- Context snapshot (sanitized summary)

## EXECUTION_START

**Steps:**
- **Description**: Generate INIT_CONTEXT_SNAPSHOT.md (summaries only).
  - **Action**: Create directory tree (depth 3), metrics table, key locations.
  - **Output File**: ./INIT_CONTEXT_SNAPSHOT.md

- **Description**: Print READY + snapshot path.
  - **Action**: Log concise summary; await instructions.
  - **Await Instructions**: true