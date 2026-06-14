import { CheckCircle, GitBranch, Stack } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const relationships = [
  {
    title: "Root protocol",
    body: "Defines the general process: inspect, determine, create, configure, validate, and report.",
  },
  {
    title: "Template",
    body: "Specializes the process for a target category such as server, development project, agent, dry run, or minimal initialization.",
  },
  {
    title: "Generated output",
    body: "Exists only when the target or selected template requires it. No output file is universal.",
  },
  {
    title: "Validation result",
    body: "States whether the target is operational, operational with warnings, blocked, or complete as a dry run.",
  },
]

const conditionalOutputs = [
  "README.md when project documentation is missing or inadequate",
  "PRD.md when product requirements need to be established",
  "AGENTS.md when agent operation applies",
  "SNAPSHOT.md when a point-in-time record is useful",
  "Server report only for server or infrastructure targets",
  "Task files only when actionable work remains",
]

export function ContextTab() {
  return (
    <div className="space-y-8">
      <Card className="rounded-md border-2 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">The target determines the implementation</CardTitle>
          <CardDescription className="text-base leading-7">
            What helps one target can be noise for another. Use the root process and copy only matching template steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {relationships.map((item) => (
            <div key={item.title} className="rounded-md border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Stack size={18} />
                {item.title}
              </div>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">{item.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Adapt before creating</CardTitle>
            <CardDescription>Existing systems are inspected before anything is generated.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              Keep valid existing files, update incomplete files when needed, and avoid duplicates.
            </p>
            <p>
              Do not overwrite good docs with template text. Preserve useful existing instructions.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Validation defines completion</CardTitle>
            <CardDescription>Operational status comes from target-relevant evidence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              Validate with evidence that matches the target: build/test, service status, or instruction/tool checks.
            </p>
            <p>Do not declare success without a validation step connected to the target's intended result.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle>Conditional outputs</CardTitle>
          <CardDescription>No output file is universally required except where the selected target or template requires it.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {conditionalOutputs.map((output) => (
              <div key={output} className="flex gap-3 rounded-md border bg-card p-3 text-sm leading-6 sm:text-base">
                <CheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                <span>{output}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch size={20} />
            Agent instructions are conditional
          </CardTitle>
          <CardDescription>AGENTS.md is important when agents operate in a target, but it is not installed everywhere.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground sm:text-base">
          <p>
            During inspection, check whether AI agents will operate on the target. Create AGENTS.md only when it helps
            this specific target.
          </p>
          <div className="flex flex-wrap gap-2">
            {['OPERATIONAL', 'OPERATIONAL_WITH_WARNINGS', 'BLOCKED', 'DRY_RUN_COMPLETE'].map((state) => (
              <Badge key={state} variant="outline" className="rounded-sm font-mono">
                {state}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}