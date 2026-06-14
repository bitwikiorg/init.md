import { createElement, useCallback, useMemo, useState } from "react"
import { marked } from "marked"
import { toast } from "sonner"
import { ArrowRight, CaretLeft, CaretRight, CheckCircle, Copy, GithubLogo } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { templates } from "@/data/templates"

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
  const [activeTemplate, setActiveTemplate] = useState(0)
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const template = templates[activeTemplate]
  const renderedTemplate = useMemo(
    () => marked.parse(stripFrontmatter(template.content), { async: false }) as string,
    [template.content],
  )

  const copyToClipboard = useCallback(async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedStates((prev) => ({ ...prev, [id]: true }))
      toast.success("Canonical Markdown copied")
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }))
      }, 2000)
    } catch {
      toast.error("Failed to copy Markdown")
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
          <h3 className="text-2xl font-bold">Canonical Templates</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            These cards render the Markdown files in `templates/`. The copy action copies the exact canonical file
            content, including metadata.
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
                onClick={() => copyToClipboard(template.content, template.id)}
                className="shrink-0"
              >
                {copiedStates[template.id] ? <CheckCircle size={16} /> : <Copy size={16} />}
                Copy Markdown
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={template.sourceUrl} target="_blank" rel="noreferrer">
                  <GithubLogo size={16} />
                  Source
                </a>
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
          <div className="grid gap-4 lg:grid-cols-3">
            <MetadataList title="Creates" items={template.metadata.creates} />
            <MetadataList title="Configures" items={template.metadata.configures} />
            <MetadataList title="Validates" items={template.metadata.validates} />
          </div>

          <div className="rounded-md border bg-background p-4">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Optional outputs
            </h5>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {template.metadata.optional_outputs.map((output) => (
                <div key={output} className="rounded-sm bg-muted px-3 py-2 text-sm leading-5 break-words">
                  {output}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border bg-card p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-lg font-semibold">Rendered Markdown</h4>
              <a
                href={template.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
              >
                Open source file
                <ArrowRight size={14} />
              </a>
            </div>
            <div className="markdown-surface" dangerouslySetInnerHTML={{ __html: renderedTemplate }} />
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