/**
 * Why: Centralize template metadata to keep `App` composable and align with the protocol catalogue in `init.md`.
 * What: Provides strongly-typed template definitions for the gallery and clipboard actions.
 * How: Exports the template array and contract so UI sections can consume it without duplicating state.
 */
import type { ComponentType } from "react"
import { FileText, Desktop, TestTube } from "@phosphor-icons/react"

export interface TemplateDefinition {
  id: string
  title: string
  subtitle: string
  description: string
  icon: ComponentType<{ size?: number; className?: string }>
  features: string[]
  content: string
}

export const templates: TemplateDefinition[] = [
  {
    id: "minimal",
    title: "Minimal Init Protocol",
    subtitle:
      "Perfect for simple projects and development environments where you need basic context without overhead.",
    description:
      "Start small with essential system awareness and foundational documentation. This template performs safe, non-invasive probes to understand your environment and generates core project files. Ideal for personal projects, prototypes, or when working in constrained environments where minimal footprint is crucial.",
    icon: FileText,
    features: ["Essential probes only", "Zero secret exposure", "File generation"],
    content: `# Minimal Init Protocol (Template)

**Intent**
- Lightweight initialization protocol for agents requiring essential system awareness.
- Safe-by-default: essential probes, limited scope, zero secret exposure.
- Generates foundational project files for immediate productivity.

## INIT_SEQUENCE

### HOST_PREFLIGHT
Establish basic system awareness and time coherence.

**Steps:**
- **Description**: Capture OS family and version via safe reads.
  - **Action**: Read /etc/os-release if present; avoid privileged actions.
  - **Source**: OS_INFO

### RESOURCE_BASELINE
Conservative resource awareness for planning.

**Steps:**
- **Description**: Record CPU cores and memory estimate.
  - **Action**: Use safe system APIs or cached metrics.
  - **Source**: SYSTEM_HARDWARE_METRICS

### PROJECT_FOUNDATION
Generate essential project files with current context.

**Steps:**
- **Description**: Create foundational documentation and task files.
  - **Action**: Generate file tree, initialize project structure.
  - **Output Files**: 
    - ./README.md (project overview with auto-detected stack)
    - ./TODO.md (startup tasks and next steps)
    - ./PRD.md (lightweight product requirements summary)
    - ./CONTEXT.md (current file tree and environment summary)

### EXECUTION_START
Create a snapshot and announce READY.

**Steps:**
- **Description**: Generate INIT_CONTEXT_SNAPSHOT.md (summary only).
  - **Action**: Write directory overview + metrics headings.
  - **Output File**: ./INIT_CONTEXT_SNAPSHOT.md`
  },
  {
    id: "server",
    title: "Server Init Protocol",
    subtitle: "Built for production environments requiring comprehensive system validation and operational documentation.",
    description:
      "Deploy with confidence using extensive documentation generation and architectural awareness. This template validates system compatibility, documents service dependencies, and creates a complete operational handbook. Essential for production deployments, team collaboration, and maintaining complex infrastructures.",
    icon: Desktop,
    features: ["Production-ready", "Full documentation suite", "Operational blueprints"],
    content: `# Server Init Protocol (Template)

**Intent**
- Production-oriented initialization with comprehensive system validation.
- Emphasizes precise execution rules, architectural context, and operational policies.
- Generates complete operational documentation suite.

## INIT_SEQUENCE

### HOST_PREFLIGHT
Verify OS/kernel compatibility and time alignment.

**Steps:**
- **Description**: Note OS family and kernel.
  - **Action**: Use safe reads; prefer APIs to shell.
  - **Source**: OS_INFO

### ARCHITECTURE_AND_TOOLS
Ground execution rules in actual system design.

**Steps:**
- **Description**: Document services, runtimes, and schedulers in use.
  - **Action**: Summarize architecture: containers, queues, cron, orchestrators.
  - **Source**: SYSTEM_ARCHITECTURE_DOCS

### OPERATIONAL_DOCUMENTATION
Generate comprehensive operational files for production readiness.

**Steps:**
- **Description**: Create full documentation suite with system context.
  - **Action**: Generate operational files with detected configurations.
  - **Output Files**:
    - ./README.md (comprehensive project documentation)
    - ./PRD.md (product requirements and success criteria)
    - ./SERVER.md (infrastructure, services, deployment notes)
    - ./AGENTS.md (agent configurations, schedules, and policies)
    - ./TODO.md (prioritized operational tasks)
    - ./RUNBOOK.md (incident response and maintenance procedures)
    - ./CONTEXT.md (complete system inventory and file tree)

### EXECUTION_START
**Steps:**
- **Description**: Generate INIT_CONTEXT_SNAPSHOT.md (detailed summary).
  - **Action**: Create directory tree (depth 3), metrics table, key locations.
  - **Output File**: ./INIT_CONTEXT_SNAPSHOT.md`
  },
  {
    id: "dry-run",
    title: "Dry-Run Init Protocol",
    subtitle: "Risk-free rehearsal mode for testing and validation without making any system changes.",
    description:
      "Practice and validate your initialization sequence safely before production deployment. This template creates documentation blueprints and command playbooks without touching your system. Perfect for security-conscious environments, testing scenarios, or when you need to validate approaches before implementation.",
    icon: TestTube,
    features: ["No mutations", "Documentation blueprints", "Pre-production safe"],
    content: `# Dry-Run Init Protocol (Template)

**Intent**
- Rehearsal-only initialization: no mutations, no enforcement.
- Perfect for pre-production validation and command playbooks.
- Creates documentation blueprints without system changes.

## INIT_SEQUENCE

### HOST_PREFLIGHT
Mentally confirm OS/time alignment without probing.

**Steps:**
- **Description**: OS family and kernel fit expectations.
  - **Action**: Reference prior inventories; note discrepancies.
  - **Source**: OS_INFO

### RESOURCE_BASELINE
Notional compute/storage profile.

**Steps:**
- **Description**: CPU/memory/storage expectations.
  - **Action**: Use container defaults or prior notes; set soft limits.
  - **Source**: SYSTEM_HARDWARE_METRICS

### DOCUMENTATION_BLUEPRINT
Plan documentation suite without file creation.

**Steps:**
- **Description**: Design intended documentation structure.
  - **Action**: Map file relationships, define content templates.
  - **Planned Files**:
    - README.md (project overview template)
    - TODO.md (development roadmap template)
    - PRD.md (product requirements outline)
    - CONTEXT.md (environment inventory template)
    - AGENTS.md (agent configuration template)

### EXECUTION_START
Conclude rehearsal with a blueprint.

**Steps:**
- **Description**: Draft the intended INIT_CONTEXT_SNAPSHOT.md.
  - **Action**: Define directory tree, metrics headings, and context catalog.`
  }
]
