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
    summary: "Complete init procedure for one clear gap.",
    description:
      "A complete procedure for inspecting a small target, adding only the missing requirement, validating it, and reporting status.",
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
    summary: "Complete no-change init planning procedure.",
    description:
      "A complete procedure for inspecting the target, listing required work, and reporting what would become operational without changes.",
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
    summary: "Complete init procedure for software projects.",
    description:
      "A complete procedure for inspecting project shape, choosing artifacts and commands, and validating development readiness.",
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
    summary: "Complete init procedure for agent targets.",
    description:
      "A complete procedure for defining what the agent target needs, preserving valid instructions, adding missing parts, and validating readiness.",
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
    summary: "Complete init procedure for server readiness.",
    description:
      "A complete procedure for host checks, services, networking, and deployment validation in a server-specific flow.",
    category: "Target-specific",
    sourcePath: "templates/server_init_protocol.md",
    sourceUrl: sourceUrl("templates/server_init_protocol.md"),
    icon: Desktop,
    features: ["Host inspection", "Service configuration", "Readiness checks"],
    content: serverContent,
    metadata: parseTemplateMetadata(serverContent),
  },
]