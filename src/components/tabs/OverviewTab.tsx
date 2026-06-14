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
          <CardTitle className="text-2xl">A procedure, not a scaffold</CardTitle>
          <CardDescription className="text-base leading-7">
            Copy init.md for the general procedure. Copy a template when the target needs specific init instructions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              init.md helps determine what a target needs to become ready. A target might be a repository, an agent
              workspace, a server, a research directory, or a service being restored in a new environment.
            </p>
            <p>
              The target decides the work. A server may need host checks. A project may need build commands. An agent may
              need instructions and tool boundaries. A small target may need one file and one validation step.
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
            Operational means validated
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm leading-6 text-background/80 md:grid-cols-2">
          <div className="flex gap-3">
            <CheckCircle className="mt-0.5 shrink-0" size={18} />
            <p>Success requires a validation step tied to the target.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="mt-0.5 shrink-0" size={18} />
            <p>No output file is universal. README, PRD, snapshot, server report, and AGENTS.md are conditional.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}