# Dry-Run Init Protocol (Template)

**Intent**
- Rehearsal-only initialization: no mutation, no enforcement.
- Ideal for pre-production mental models and command playbooks.

## INIT_SEQUENCE

### HOST_PREFLIGHT
Mentally confirm OS/time alignment without probing.

**Steps:**
- **Description**: OS family and kernel fit expectations.
  - **Action**: Reference prior inventories; note discrepancies.
  - **Source**: OS_INFO

- **Description**: Clock alignment acknowledged.
  - **Action**: Note any drift assumptions for later remediation.
  - **Source**: SYSTEM_TIME_INFO

### RESOURCE_BASELINE
Notional compute/storage profile.

**Steps:**
- **Description**: CPU/memory/storage expectations.
  - **Action**: Use container defaults or prior notes; set soft limits.
  - **Source**: SYSTEM_HARDWARE_METRICS

- **Description**: Hypothetical bottlenecks.
  - **Action**: Define alert thresholds for future activation.
  - **Source**: SYSTEM_PERFORMANCE_METRICS

### TOOL_DISCOVERY_AND_API_POLICY
Reiterate approved routes and adapters.

**Steps:**
- **Description**: Command registry and features.
  - **Action**: Summarize available entry points and controllers.
  - **Source**: COMMAND_AND_FEATURE_INDEX

- **Description**: Routing rules.
  - **Policy**:
    - Use designated search adapter in role-play.
    - Use approved HTTP clients; no ad hoc fetch.
    - Prefer file utilities for content inspection.
  - **Source**: API_ROUTING_POLICY

### SECRET_MANAGEMENT
Validate credential flow assumptions.

**Steps:**
- **Description**: Bootstrap with test doubles or in-memory mocks.
  - **Action**: Exercise encryption/decryption pathways conceptually.
  - **Source**: VAULT_FLOW_NOTES

- **Description**: Target permission posture for storage.
  - **Action**: Record intended fs permissions; defer checks.
  - **Source**: STORAGE_PERMISSIONS_PLAN

### CONTEXT_LOADING
Curate rehearsal knowledge.

**Steps:**
- **Description**: Catalog guides/prompts/configs by listing only.
  - **Action**: Assemble notes linking assets to roles.
  - **Source**: FILE_SYSTEM_SCAN

- **Description**: Sketch context snapshot shape.
  - **Action**: Define future ./cache/context.snapshot.json fields (no writes).
  - **Source**: SERIALIZED_CONTEXT_MAP

### CODE_GOVERNANCE_AND_STATE
Plan governance; avoid state writes.

**Steps:**
- **Description**: Diffs on mutation.
  - **Policy**: Append to ./logs/code_history/<timestamp>.patch in active mode.
  - **Source**: VERSION_CONTROL_POLICY

- **Description**: Backup and cache routines, later.
  - **Action**: Document sync and purge cadence for go-live.
  - **Source**: BACKUP_AND_CACHE_PLANS

### STARTUP_VALIDATION_AND_ROLLBACK
Define checks and signals for future runs.

**Steps:**
- **Description**: Lint/tests/static analysis plan.
  - **Action**: List commands and pass criteria.
  - **Source**: DIAGNOSTIC_CHECKLIST

- **Description**: READY announcement format.
  - **Action**: Define summary message structure (metrics + snapshot path).
  - **Source**: SYSTEM_READINESS_SIGNAL

## EXECUTION_START

Conclude rehearsal with a blueprint.

**Steps:**
- **Description**: Draft the intended INIT_CONTEXT_SNAPSHOT.md (on paper/notes).
  - **Action**: Define directory tree, metrics headings, and context catalog for future real runs.
  - **Output File**: ./INIT_CONTEXT_SNAPSHOT.md

- **Description**: Define short READY summary format for future active runs.
  - **Action**: Record message template and fields.
  - **Await Instructions**: true