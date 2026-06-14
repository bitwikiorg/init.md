import { CheckCircle, Copy } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const workflow = [
  {
    title: "Identify the target",
    body: "State what you are initializing and what outcome should be operational.",
  },
  {
    title: "Choose the closest template",
    body: "Pick minimal, dry run, development project, agent, or server based on the target.",
  },
  {
    title: "Copy or adapt the template",
    body: "Copy the template, then remove steps that do not apply.",
  },
  {
    title: "Run the initialization procedure",
    body: "Inspect, determine, create, and configure only what is required.",
  },
  {
    title: "Review the validation result",
    body: "Use relevant checks to confirm the target is operational.",
  },
  {
    title: "Keep the target-specific init.md",
    body: "Keep instructions specific to this target, not a generic checklist.",
  },
]

const examples = [
  "Use init.md to initialize this repository. Copy templates/development_project_init_protocol.md and remove steps that do not apply.",
  "Use init.md in dry-run mode for this server. Copy templates/server_init_protocol.md and return only a plan and validation checks.",
  "Use init.md to set up this agent workspace. Copy templates/agent_init_protocol.md and create only target-specific instructions.",
  "Use init.md minimal mode. Copy templates/minimal_init_protocol.md and make the smallest change needed to pass validation.",
]

export function GuideTab() {
  const copyExample = async (example: string) => {
    try {
      await navigator.clipboard.writeText(example)
      toast.success("Init instruction copied")
    } catch {
      toast.error("Failed to copy example")
    }
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-md border-2 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Use this page to copy init instructions</CardTitle>
          <CardDescription className="text-base leading-7">
            Start with the target. Copy the matching template and adapt it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            {workflow.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[2.75rem_1fr] gap-4 rounded-md border bg-background p-4">
                <div className="grid size-10 place-items-center rounded-sm bg-foreground font-mono text-sm font-bold text-background">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Template selection</CardTitle>
            <CardDescription>Choose the template that best matches the target.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              Use minimal for small gaps, dry run for planning, development project for codebases, agent for
              agent setup, and server for host readiness.
            </p>
            <p>
              If no template fits, use the root protocol and write a target-specific plan with validation criteria.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Example instructions</CardTitle>
            <CardDescription>Copy one and paste it into your workflow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {examples.map((example) => (
              <div key={example} className="flex flex-col gap-3 rounded-md border bg-background p-3 sm:flex-row sm:items-center sm:justify-between">
                <code className="text-sm leading-6 text-foreground">{example}</code>
                <Button type="button" variant="outline" size="sm" onClick={() => copyExample(example)}>
                  <Copy size={16} />
                  Copy
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-md bg-card shadow-none">
        <CardHeader>
          <CardTitle>Completion review</CardTitle>
          <CardDescription>Before marking complete, make sure your report answers these questions.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {[
            "What target was initialized?",
            "What was inspected?",
            "What was created or configured?",
            "What validation was run?",
            "What remains incomplete or blocked?",
            "Where are the important outputs?",
          ].map((question) => (
            <div key={question} className="flex gap-3 text-sm leading-6 sm:text-base">
              <CheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
              <span>{question}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}