import { createElement, useCallback, useMemo, useState } from "react"
import { toast } from "sonner"
import { CaretLeft, CaretRight, CheckCircle, Copy, FileText } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { templates, type TemplateDefinition } from "@/data/templates"

const rootInstruction = `Use init.md to initialize this target.

Target: [describe the target]
Mode: active
Goal: make the target ready for its intended use.

Do this:
1. Inspect only the target and directly relevant files, settings, or services.
2. Determine what the target actually needs.
3. Create or configure only the missing init work that applies.
4. Preserve valid existing work. Do not create universal files by default.
5. Validate with a check tied to the target's real use.
6. Report what was inspected, changed, validated, warnings or blockers, and final status.`

function buildTemplateInstruction(template: TemplateDefinition) {
  return `Use ${template.metadata.name} to initialize this target.

Target: [describe the target]
Best fit: ${template.metadata.target}
Mode: ${template.metadata.mode.join(" or ")}
Goal: ${template.metadata.purpose}

Do this:
1. Inspect the target and existing work before changing anything.
2. Apply this template only where it fits the target.
3. Create or configure only what is required for this target.
4. Skip optional outputs unless they clearly help operation.
5. Validate with checks that prove this target is ready.
6. Report inspected evidence, changes made, validation result, remaining blockers, and final status.`
}

function ReferenceList({ title, items }: { title: string; items: string[] }) {
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

function CopyPreview({ content }: { content: string }) {
  return (
    <div className="rounded-md border bg-background p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h5 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Copied text</h5>
        <Badge variant="outline" className="rounded-sm">
          no metadata
        </Badge>
      </div>
      <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-sm bg-muted p-3 text-sm leading-6 text-foreground">
        {content}
      </pre>
    </div>
  )
}

export function TemplatesTab() {
  const [activeTemplate, setActiveTemplate] = useState(0)
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const template = templates[activeTemplate]
  const templateInstruction = useMemo(() => buildTemplateInstruction(template), [template])

  const copyToClipboard = useCallback(async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedStates((prev) => ({ ...prev, [id]: true }))
      toast.success("Instruction copied")
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }))
      }, 2000)
    } catch {
      toast.error("Failed to copy instruction")
    }
  }, [])

  const nextTemplate = () => {
    setActiveTemplate((prev) => (prev + 1) % templates.length)
  }

  const prevTemplate = () => {
    setActiveTemplate((prev) => (prev - 1 + templates.length) % templates.length)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold">Copy init instructions</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Buttons copy the plain instruction shown on the card. They do not copy YAML metadata or the full source file.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevTemplate} disabled={templates.length <= 1} aria-label="Previous template">
            <CaretLeft size={16} />
          </Button>
          <span className="min-w-[4.5rem] text-center text-sm text-muted-foreground">
            {activeTemplate + 1} of {templates.length}
          </span>
          <Button variant="outline" size="icon" onClick={nextTemplate} disabled={templates.length <= 1} aria-label="Next template">
            <CaretRight size={16} />
          </Button>
        </div>
      </div>

      <Card className="rounded-md border-2 shadow-none">
        <CardHeader>
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="flex items-start gap-3">
              <FileText size={28} className="mt-1 shrink-0 text-primary" />
              <div>
                <Badge variant="secondary" className="mb-2 rounded-sm">
                  Root
                </Badge>
                <CardTitle className="text-2xl">init.md</CardTitle>
                <CardDescription className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
                  Copy this when the target needs the general init flow and no specific template fits yet.
                </CardDescription>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => copyToClipboard(rootInstruction, "root-protocol")}
              className="shrink-0 lg:justify-self-end"
            >
              {copiedStates["root-protocol"] ? <CheckCircle size={16} /> : <Copy size={16} />}
              Copy instruction
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CopyPreview content={rootInstruction} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-md border-2 shadow-none">
        <CardHeader>
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="flex items-start gap-3">
              {createElement(template.icon, {
                size: 28,
                className: "mt-1 shrink-0 text-primary",
              })}
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-sm">
                    {template.category}
                  </Badge>
                  {template.metadata.mode.map((mode) => (
                    <Badge key={mode} variant="outline" className="rounded-sm">
                      {mode}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl">{template.metadata.name}</CardTitle>
                <p className="mt-2 text-sm font-medium text-foreground">Target: {template.metadata.target}</p>
                <CardDescription className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">
                  {template.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button
                variant="default"
                size="sm"
                onClick={() => copyToClipboard(templateInstruction, template.id)}
                className="shrink-0"
              >
                {copiedStates[template.id] ? <CheckCircle size={16} /> : <Copy size={16} />}
                Copy instruction
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {template.features.map((feature) => (
              <Badge key={feature} variant="outline" className="rounded-sm text-sm">
                {feature}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <CopyPreview content={templateInstruction} />

          <div className="grid gap-4 lg:grid-cols-3">
            <ReferenceList title="May create" items={template.metadata.creates} />
            <ReferenceList title="May configure" items={template.metadata.configures} />
            <ReferenceList title="Validates with" items={template.metadata.validates} />
          </div>

          <div className="rounded-md border bg-background p-4">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Optional outputs, reference only
            </h5>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {template.metadata.optional_outputs.map((output) => (
                <div key={output} className="rounded-sm bg-muted px-3 py-2 text-sm leading-5 break-words">
                  {output}
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {templates.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`rounded-md border bg-card p-4 text-left transition hover:border-foreground ${index === activeTemplate ? "border-foreground shadow-[4px_4px_0_var(--foreground)]" : ""}`}
            onClick={() => setActiveTemplate(index)}
          >
            <div className="mb-3 flex items-center gap-2">
              {createElement(item.icon, { size: 18, className: "shrink-0 text-primary" })}
              <h4 className="truncate text-sm font-semibold">{item.title}</h4>
            </div>
            <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">{item.summary}</p>
          </button>
        ))}
      </div>
    </div>
  )
}