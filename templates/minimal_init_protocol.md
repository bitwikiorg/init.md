# Minimal Init Protocol (Template)

**Intent**
- A smallest-possible initialization blueprint for agents.
- Safe-by-default: conceptual steps, strictly limited probes, zero secret exposure.

## INIT_SEQUENCE

### HOST_PREFLIGHT
Lightweight awareness of OS and time coherence.

**Steps:**
- **Description**: Capture OS family and version via safe reads.
  - **Action**: Read /etc/os-release if present; avoid privileged actions.
  - **Source**: OS_INFO

- **Description**: Note current timezone and time source.
  - **Action**: Use safe APIs; do not adjust system time.
  - **Source**: SYSTEM_TIME_INFO

### RESOURCE_BASELINE
Conservative resource awareness for planning.

**Steps:**
- **Description**: Record CPU cores and memory estimate.
  - **Action**: Use safe system APIs or cached metrics.
  - **Source**: SYSTEM_HARDWARE_METRICS

### TOOL_DISCOVERY_AND_API_POLICY
Route through approved adapters only.

**Steps:**
- **Description**: Load tool registry if present.
  - **Action**: Parse tool schema (optional).
  - **Source**: TOOL_SCHEMA

- **Description**: Enforce routing rules.
  - **Policy**:
    - Use designated search adapter.
    - Use approved HTTP clients for REST.
    - Prefer dedicated file tools for reading content.
  - **Source**: API_ROUTING_POLICY

### SECRET_MANAGEMENT
Never hardcode; load from vault only.

**Steps:**
- **Description**: Retrieve secrets via approved manager.
  - **Action**: Load into memory; avoid disk writes.
  - **Source**: SECURE_VAULT

### CONTEXT_LOADING
Index key docs and scripts; avoid raw loads.

**Steps:**
- **Description**: Build index of md/json/yml files (paths + purpose).
  - **Action**: Summarize without storing raw content.
  - **Source**: FILE_SYSTEM_SCAN

### STARTUP_VALIDATION_AND_ROLLBACK
Define pass criteria and READY signal.

**Steps:**
- **Description**: List diagnostics to run when enabled.
  - **Action**: Document commands; skip execution by default.
  - **Source**: DIAGNOSTIC_CHECKLIST

- **Description**: Announce READY upon criteria met.
  - **Action**: Print concise readiness message.
  - **Source**: SYSTEM_READINESS_SIGNAL

## EXECUTION_START

Create a tiny snapshot and announce READY.

**Steps:**
- **Description**: Generate INIT_CONTEXT_SNAPSHOT.md (summary only).
  - **Action**: Write directory overview + metrics headings.
  - **Output File**: ./INIT_CONTEXT_SNAPSHOT.md

- **Description**: Print READY + snapshot path.
  - **Action**: Log summary and await instructions.
  - **Await Instructions**: true