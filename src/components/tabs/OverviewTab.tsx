import { CheckCircle, Files, ListChecks } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const processStages = [
  {
    title: "Inspect",
    description: "Read the target that exists: files, configuration, instructions, constraints, and reusable work.",
  },
  {
    title: "Determine",
    description: "Decide what the target requires, which template applies, and which outputs would be useful.",
  },
  {
    title: "Create",
    description: "Create only the artifacts that apply to this target, not a universal bundle of files.",
  },
  {
    title: "Configure",
    description: "Connect required paths, settings, dependencies, tools, services, or instructions so they work together.",
  },
  {
    title: "Validate",
    description: "Run or define a relevant check proving the intended operational result is actually reachable.",
  },
  {
    title: "Report",
    description: "State what became operational, what changed, what was validated, and what remains blocked or incomplete.",
  },
]

const targetExamples = [
  "software project",
  "repository",
  "AI agent",
  "server",
  "service",
  "workspace",
  "research environment",
  "data pipeline",
  "application",
  "tool",
]

export function OverviewTab() {
  return (
    <div className="space-y-8">
      <Card className="rounded-md border-2 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">A procedure, not a file dump</CardTitle>
          <CardDescription className="text-base leading-7">
            init.md gives you a process. Templates help you copy target-specific instructions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              This site is for copying init instructions and templates. Start with the target, then copy only what is
              needed.
            </p>
            <p>
              A server, project, or agent workspace will need different steps. The template is a starting point, not
              a strict checklist.
            </p>
          </div>
          <div className="rounded-md border bg-background p-4">
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <Files size={18} />
              Possible targets
            </div>
            <div className="flex flex-wrap gap-2">
              {targetExamples.map((target) => (
                <Badge key={target} variant="secondary" className="rounded-sm text-sm">
                  {target}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {processStages.map((stage, index) => (
          <Card key={stage.title} className="rounded-md shadow-none">
            <CardHeader>
              <div className="mb-3 flex size-9 items-center justify-center rounded-sm bg-foreground font-mono text-sm font-bold text-background">
                {index + 1}
              </div>
              <CardTitle className="text-xl">{stage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">{stage.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-md bg-foreground text-background shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ListChecks size={22} />
            Done means validated
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm leading-6 text-background/80 md:grid-cols-2">
          <div className="flex gap-3">
            <CheckCircle className="mt-0.5 shrink-0" size={18} />
            <p>Do not mark complete without a target-specific validation check.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="mt-0.5 shrink-0" size={18} />
            <p>Output files are conditional. Only create files that this target actually needs.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}