import { createElement, useCallback, useMemo, useState } from "react"
import { marked } from "marked"
import { toast } from "sonner"
import { CaretLeft, CaretRight, CheckCircle, Copy, FileText } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { templates } from "@/data/templates"
import rootProtocolContent from "../../../init.md?raw"

function stripFrontmatter(content: string) {
  return content.replace(/^---\n[\s\S]*?\n---\n?/, "")
}

function MetadataList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border bg-background p-4">
      <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{title}</h5>
      <ul className="space-y-2 text-sm leading-5">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TemplatesTab() {
  const [activeTargetId, setActiveTargetId] = useState("development-project")
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const copiedRootContent = rootProtocolContent.trim()
  const copyTargets = useMemo(
    () => [
      {
        id: "root-protocol",
        title: "init.md",
        heading: "init.md",
        eyebrow: "Root",
        summary: "General initialization method.",
        description:
          "Copy the complete root procedure when no specific template is the better fit. It covers inspect, determine, create, configure, validate, and report.",
        content: copiedRootContent,
        icon: FileText,
        badges: ["Root"],
        copyLabel: "init.md",
        copyButtonLabel: "Copy init.md",
        template: null,
      },
      ...templates.map((item) => ({
        id: item.id,
        title: item.title,
        heading: item.metadata.name,
        eyebrow: item.category,
        summary: item.summary,
        description: `${item.description} Copying gives the complete usable template body without page label data.`,
        content: stripFrontmatter(item.content).trim(),
        icon: item.icon,
        badges: [item.category, ...item.metadata.mode],
        copyLabel: item.metadata.name,
        copyButtonLabel: "Copy complete template",
        template: item,
      })),
    ],
    [copiedRootContent],
  )

  const activeTargetIndex = Math.max(
    copyTargets.findIndex((target) => target.id === activeTargetId),
    0,
  )
  const activeTarget = copyTargets[activeTargetIndex]
  const activeTemplate = activeTarget.template
  const renderedActiveContent = useMemo(
    () => marked.parse(activeTarget.content, { async: false }) as string,
    [activeTarget.content],
  )

  const copyToClipboard = useCallback(async (content: string, id: string, label: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedStates((prev) => ({ ...prev, [id]: true }))
      toast.success(`${label} copied`)
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }))
      }, 2000)
    } catch {
      toast.error(`Failed to copy ${label}`)
    }
  }, [])

  const nextTarget = () => {
    setActiveTargetId(copyTargets[(activeTargetIndex + 1) % copyTargets.length].id)
  }

  const prevTarget = () => {
    setActiveTargetId(copyTargets[(activeTargetIndex - 1 + copyTargets.length) % copyTargets.length].id)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold">Choose what to copy</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pick the root procedure or a complete target-specific template. The detail pane shows exactly what the copy
            button will place on the clipboard.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevTarget} disabled={copyTargets.length <= 1} aria-label="Previous copy target">
            <CaretLeft size={16} />
          </Button>
          <span className="min-w-[4.5rem] text-center text-sm text-muted-foreground">
            {activeTargetIndex + 1} of {copyTargets.length}
          </span>
          <Button variant="outline" size="icon" onClick={nextTarget} disabled={copyTargets.length <= 1} aria-label="Next copy target">
            <CaretRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {copyTargets.map((target) => (
          <button
            key={target.id}
            type="button"
            className={`rounded-md border bg-card p-4 text-left transition hover:border-foreground ${target.id === activeTarget.id ? "border-foreground shadow-[4px_4px_0_var(--foreground)]" : ""}`}
            onClick={() => setActiveTargetId(target.id)}
          >
            <div className="mb-3 flex items-center gap-2">
              {createElement(target.icon, { size: 18, className: "shrink-0 text-primary" })}
              <div>
                <p className="truncate text-sm font-semibold">{target.title}</p>
                <p className="text-xs text-muted-foreground">{target.eyebrow}</p>
              </div>
            </div>
            <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">{target.summary}</p>
          </button>
        ))}
      </div>

      <Card className="overflow-hidden rounded-md border-2 shadow-none">
        <CardHeader>
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="flex items-start gap-3">
              {createElement(activeTarget.icon, {
                size: 28,
                className: "mt-1 shrink-0 text-primary",
              })}
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {activeTarget.badges.map((badge, index) => (
                    <Badge key={`${activeTarget.id}-${badge}`} variant={index === 0 ? "secondary" : "outline"} className="rounded-sm">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl">{activeTarget.heading}</CardTitle>
                {activeTemplate ? (
                  <p className="mt-2 text-sm font-medium text-foreground">Target: {activeTemplate.metadata.target}</p>
                ) : null}
                <CardDescription className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
                  {activeTarget.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button
                variant="default"
                size="sm"
                onClick={() => copyToClipboard(activeTarget.content, activeTarget.id, activeTarget.copyLabel)}
                className="shrink-0"
              >
                {copiedStates[activeTarget.id] ? <CheckCircle size={16} /> : <Copy size={16} />}
                {activeTarget.copyButtonLabel}
              </Button>
            </div>
          </div>
          {activeTemplate ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeTemplate.features.map((feature) => (
                <Badge key={feature} variant="outline" className="rounded-sm text-sm">
                  {feature}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-6">
          {activeTemplate ? (
            <>
              <div className="grid gap-4 lg:grid-cols-3">
                <MetadataList title="Creates" items={activeTemplate.metadata.creates} />
                <MetadataList title="Configures" items={activeTemplate.metadata.configures} />
                <MetadataList title="Validates" items={activeTemplate.metadata.validates} />
              </div>

              <div className="rounded-md border bg-background p-4">
                <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Optional outputs
                </h5>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {activeTemplate.metadata.optional_outputs.map((output) => (
                    <div key={output} className="rounded-sm bg-muted px-3 py-2 text-sm leading-5 break-words">
                      {output}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {!activeTemplate ? (
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Use when the target needs the general init method.",
                "Switch to a template when the target clearly matches one.",
              ].map((item) => (
                <div key={item} className="rounded-md border bg-background p-4 text-sm leading-6 text-muted-foreground sm:text-base">
                  {item}
                </div>
              ))}
            </div>
          ) : null}

          <div className="rounded-md border bg-card p-4">
            <h4 className="mb-2 text-lg font-semibold">Copied content preview</h4>
            <p className="mb-4 text-sm leading-6 text-muted-foreground">
              This is the complete Markdown copied by the button above.
            </p>
            <div className="max-h-[32rem] overflow-auto pr-2">
              <div className="markdown-surface" dangerouslySetInnerHTML={{ __html: renderedActiveContent }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
