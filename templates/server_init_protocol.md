---
name: Server Init Protocol
target: Server, service host, production infrastructure, or deployment environment
purpose: Inspect server-specific operational requirements, configure what applies, validate readiness, and report deployment state.
mode:
  - active
  - dry run
  - repair
  - reinitialize
creates:
  - Server report when host state must be recorded
  - Service definitions or startup scripts when required
  - Environment examples when configuration must be documented without secrets
  - Runbook or validation report when operations need handoff material
configures:
  - Operating system prerequisites
  - Runtime settings
  - Services
  - Networking and firewall policy
  - Secret references
  - Logging, backups, and deployment checks
validates:
  - Required services start or are already running
  - Dependencies and ports are available
  - Configuration parses
  - Resource, storage, time, and security checks pass or produce warnings
optional_outputs:
  - SERVER.md
  - RUNBOOK.md
  - SNAPSHOT.md
  - INIT_CONTEXT_SNAPSHOT.md
  - .env.example
  - health check or readiness report
---

# Server Init Protocol

Use this template for servers, service hosts, production infrastructure, or deployment environments. Server-specific checks belong here, not in the general root protocol.

## Target Fit

Use this template when the target's operation depends on host state, services, network posture, secrets, storage, startup behavior, or deployment readiness.

Do not use this template for a non-server target unless server infrastructure is actually part of its operation.

## Procedure

### `INSPECT`

- `description`: Build a relevant picture of the host and service environment.
- `inspect`: Operating system, kernel, clock and time source, CPU, RAM, storage, load, users or service accounts, runtime versions, service manager, container or orchestrator state, network interfaces, listening ports, firewall policy, secret locations by reference, logging destinations, backup expectations, and existing runbooks.
- `condition`: Use read-only inspection first. Avoid privileged or destructive actions unless the operator explicitly authorizes them.
- `source`: Host files, service definitions, package manifests, deployment docs, cloud or container metadata, monitoring notes, and operator constraints.

### `DETERMINE`

- `description`: Decide what the server needs to become operational.
- `action`: Identify required packages, services, ports, environment variables, secret references, storage paths, permissions, startup order, deployment commands, monitoring hooks, backup strategy, and rollback expectations.
- `condition`: Treat every output as conditional. A snapshot, server report, or runbook is useful only when it helps operation, handoff, audit, or recovery.
- `output`: A server-specific initialization plan.

### `CREATE`

Create only artifacts required by the server target. Possible outputs include:

- service definitions;
- startup scripts;
- `.env.example` without secrets;
- `SERVER.md`;
- `RUNBOOK.md`;
- `SNAPSHOT.md` or `INIT_CONTEXT_SNAPSHOT.md` when a point-in-time record is useful;
- readiness or health-check scripts;
- deployment notes;
- backup or restore instructions.

Do not write raw secrets to disk. Do not create unrelated project files because this is a server template.

### `CONFIGURE`

- `description`: Configure the server elements required for operation.
- `action`: Set or document runtime paths, service units, container settings, scheduler entries, firewall rules, reverse proxy routes, TLS expectations, secret references, permissions, log locations, backup targets, and deployment commands.
- `condition`: Make active changes only in active or repair mode and only with appropriate access.

### `VALIDATE`

- `description`: Confirm the server can perform its intended role.
- `validation`: Use relevant checks such as configuration parsing, service status, startup commands, port availability, dependency resolution, disk headroom, clock coherence, firewall review, secret reference availability, log writeability, backup path accessibility, and health endpoint response.
- `status`: Use `OPERATIONAL`, `OPERATIONAL_WITH_WARNINGS`, `BLOCKED`, or `DRY_RUN_COMPLETE`.

Do not declare a server operational if required services cannot start, required configuration cannot parse, or required secrets are unavailable.

### `REPORT`

Report:

- target host or environment;
- inspected host, service, network, secret, logging, and backup areas;
- created or updated artifacts;
- configured services or settings;
- validation checks and outcomes;
- warnings, missing access, or blockers;
- final operational state.

## Server-Specific Notes

- Host operating-system checks are server concerns.
- Clock, NTP, CPU, RAM, storage, and load metrics are server concerns.
- Firewall, secret handling, security scanners, backups, cache expiration, centralized logging, and generated environment snapshots are server concerns when they apply.
- These concerns must not be imposed on unrelated targets by the root protocol.