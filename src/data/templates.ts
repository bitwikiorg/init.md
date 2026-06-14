import type { ComponentType } from "react"
import { Code, Desktop, FileText, Robot, TestTube } from "@phosphor-icons/react"

import agentContent from "../../templates/agent_init_protocol.md?raw"
import developmentProjectContent from "../../templates/development_project_init_protocol.md?raw"
import dryRunContent from "../../templates/dry_run_init_protocol.md?raw"
import minimalContent from "../../templates/minimal_init_protocol.md?raw"
import serverContent from "../../templates/server_init_protocol.md?raw"

type TemplateMetadataValue = string | string[]

export interface TemplateMetadata {
  name: string
  target: string
  purpose: string
  mode: string[]
  creates: string[]
  configures: string[]
  validates: string[]
  optional_outputs: string[]
}

export interface TemplateDefinition {
  id: string
  title: string
  summary: string
  description: string
  category: "General" | "Target-specific"
  sourcePath: string
  sourceUrl: string
  icon: ComponentType<{ size?: number; className?: string }>
  features: string[]
  content: string
  metadata: TemplateMetadata
}

const repositoryUrl = "https://github.com/bitwikiorg/init.md"

function parseTemplateMetadata(content: string): TemplateMetadata {
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)

  if (!frontmatter) {
    throw new Error("Template is missing frontmatter metadata")
  }

  const parsed: Record<string, TemplateMetadataValue> = {}
  let activeKey = ""

  for (const line of frontmatter[1].split("\n")) {
    const listItem = line.match(/^\s+-\s+(.*)$/)

    if (listItem && activeKey) {
      const current = parsed[activeKey]
      parsed[activeKey] = Array.isArray(current) ? [...current, listItem[1]] : [listItem[1]]
      continue
    }

    const keyValue = line.match(/^([A-Za-z_]+):\s*(.*)$/)

    if (keyValue) {
      activeKey = keyValue[1]
      parsed[activeKey] = keyValue[2] ? keyValue[2] : []
    }
  }

  return {
    name: asString(parsed.name),
    target: asString(parsed.target),
    purpose: asString(parsed.purpose),
    mode: asList(parsed.mode),
    creates: asList(parsed.creates),
    configures: asList(parsed.configures),
    validates: asList(parsed.validates),
    optional_outputs: asList(parsed.optional_outputs),
  }
}

function asString(value: TemplateMetadataValue | undefined) {
  return typeof value === "string" ? value : ""
}

function asList(value: TemplateMetadataValue | undefined) {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

function sourceUrl(sourcePath: string) {
  return `${repositoryUrl}/blob/main/${sourcePath}`
}

export const templates: TemplateDefinition[] = [
  {
    id: "minimal",
    title: "Minimal",
    summary: "Smallest reasonable initialization pass for a narrow operational gap.",
    description:
      "Inspect a small target, identify the least missing requirement, create or configure only that requirement, validate it, and report the result.",
    category: "General",
    sourcePath: "templates/minimal_init_protocol.md",
    sourceUrl: sourceUrl("templates/minimal_init_protocol.md"),
    icon: FileText,
    features: ["Small scope", "Conditional output", "Minimum validation"],
    content: minimalContent,
    metadata: parseTemplateMetadata(minimalContent),
  },
  {
    id: "dry-run",
    title: "Dry Run",
    summary: "Plan initialization work across target types without mutating the target.",
    description:
      "Inspect the target, determine requirements, propose the active work, and report what would become operational without creating files or changing state.",
    category: "General",
    sourcePath: "templates/dry_run_init_protocol.md",
    sourceUrl: sourceUrl("templates/dry_run_init_protocol.md"),
    icon: TestTube,
    features: ["No mutation", "Any target", "Proposed validation"],
    content: dryRunContent,
    metadata: parseTemplateMetadata(dryRunContent),
  },
  {
    id: "development-project",
    title: "Development Project",
    summary: "Initialize repositories, apps, packages, CLIs, websites, and monorepos.",
    description:
      "Inspect the actual project shape, decide which developer artifacts and commands apply, configure the workflow, and validate development readiness.",
    category: "Target-specific",
    sourcePath: "templates/development_project_init_protocol.md",
    sourceUrl: sourceUrl("templates/development_project_init_protocol.md"),
    icon: Code,
    features: ["Project workflow", "Optional AGENTS.md", "Build/test validation"],
    content: developmentProjectContent,
    metadata: parseTemplateMetadata(developmentProjectContent),
  },
  {
    id: "agent",
    title: "Agent",
    summary: "Initialize agent instructions, tools, prompts, state, and startup checks.",
    description:
      "Determine what a specific agent target needs, preserve valid instructions, create only useful agent artifacts, and validate readiness.",
    category: "Target-specific",
    sourcePath: "templates/agent_init_protocol.md",
    sourceUrl: sourceUrl("templates/agent_init_protocol.md"),
    icon: Robot,
    features: ["Target-specific guidance", "Tool boundaries", "Startup validation"],
    content: agentContent,
    metadata: parseTemplateMetadata(agentContent),
  },
  {
    id: "server",
    title: "Server",
    summary: "Server, service-host, infrastructure, and deployment readiness pattern.",
    description:
      "Move host diagnostics, services, networking, secrets, logging, backups, and deployment checks into the server-specific layer where they belong.",
    category: "Target-specific",
    sourcePath: "templates/server_init_protocol.md",
    sourceUrl: sourceUrl("templates/server_init_protocol.md"),
    icon: Desktop,
    features: ["Host inspection", "Service configuration", "Readiness checks"],
    content: serverContent,
    metadata: parseTemplateMetadata(serverContent),
  },
]