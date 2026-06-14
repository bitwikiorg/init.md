import { CheckCircle, GitBranch, Stack } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const relationships = [
  {
    title: "Root protocol",
    body: "Copy init.md when you need the complete general method: inspect, determine, create, configure, validate, report.",
  },
  {
    title: "Template",
    body: "Copy a complete template when the target is a project, agent, server, dry run, or small scoped gap.",
  },
  {
    title: "Generated output",
    body: "Create output only when the selected init path requires it. No output file is universal.",
  },
  {
    title: "Validation result",
    body: "Report whether the target is ready, ready with warnings, blocked, or complete as a dry run.",
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
          <CardTitle className="text-2xl">The target determines the work</CardTitle>
          <CardDescription className="text-base leading-7">
            init.md is the method. Templates are complete target-specific procedures. Neither one forces universal files.
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
              Keep valid existing files. Update incomplete files when useful. Avoid duplicates and identify conflicts
              before changing them.
            </p>
            <p>
              Do not replace a useful README with a template. Preserve valid agent instructions. Let local conventions
              shape any new init output.
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
              A project might validate with a build, lint, test, or command review. A server may validate service status
              and network readiness. An agent may validate instructions, tools, and startup expectations.
            </p>
            <p>Do not declare success without a validation step connected to the target.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle>Conditional outputs</CardTitle>
          <CardDescription>Create these only when the selected init path calls for them.</CardDescription>
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
          <CardDescription>AGENTS.md matters for agent-operated targets, but it is not installed everywhere.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground sm:text-base">
          <p>
            During inspection, decide whether agents will operate on the target. If agent guidance is useful and absent,
            derive `AGENTS.md` from the target. Different projects may need different instructions.
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