/**
 * Why: Own the template carousel logic separately so future pages or CLIs can reuse the same data contract.
 * What: Presents gallery controls, active template content, and clipboard helpers for protocol snippets.
 * How: Consumes the shared template definitions and keeps clipboard state locally for clarity.
 */
import { createElement, useCallback, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CaretLeft, CaretRight, CheckCircle, Copy } from "@phosphor-icons/react"
import { toast } from "sonner"
import { templates } from "@/data/templates"

export function TemplatesTab() {
  const [activeTemplate, setActiveTemplate] = useState(0)
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const copyToClipboard = useCallback(async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedStates((prev) => ({ ...prev, [id]: true }))
      toast.success("Template copied to clipboard!")
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }))
      }, 2000)
    } catch (error) {
      toast.error("Failed to copy to clipboard")
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold">Template Gallery</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevTemplate} disabled={templates.length <= 1}>
            <CaretLeft size={16} />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[60px] text-center">
            {activeTemplate + 1} of {templates.length}
          </span>
          <Button variant="outline" size="sm" onClick={nextTemplate} disabled={templates.length <= 1}>
            <CaretRight size={16} />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              {createElement(templates[activeTemplate].icon, {
                size: 24,
                className: "text-primary flex-shrink-0 mt-0.5",
              })}
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl">{templates[activeTemplate].title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {templates[activeTemplate].subtitle}
                </p>
                <CardDescription className="mt-3 text-sm leading-relaxed">
                  {templates[activeTemplate].description}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(templates[activeTemplate].content, templates[activeTemplate].id)}
              className="flex-shrink-0"
            >
              {copiedStates[templates[activeTemplate].id] ? (
                <CheckCircle size={16} className="text-accent" />
              ) : (
                <Copy size={16} />
              )}
              <span className="ml-2">Copy</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {templates[activeTemplate].features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-sm sm:text-base">
                {feature}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              <code>{templates[activeTemplate].content}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {templates.map((template, index) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${index === activeTemplate ? "ring-2 ring-primary" : ""}`}
            onClick={() => setActiveTemplate(index)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                {createElement(template.icon, { size: 18, className: "text-primary flex-shrink-0" })}
                <h4 className="font-medium text-sm truncate">{template.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base line-clamp-2 leading-relaxed">{template.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
