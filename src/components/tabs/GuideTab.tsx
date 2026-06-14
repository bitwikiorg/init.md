import { CheckCircle, Copy } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const workflow = [
  {
    title: "Identify the target",
    body: "Name what init.md is being used on, where it lives, and what ready means for that target.",
  },
  {
    title: "Choose init.md or a template",
    body: "Use init.md for the general method. Use a complete template when the target has a clear type.",
  },
  {
    title: "Copy the usable body",
    body: "Copy buttons paste the complete Markdown instructions, not the label data used by this page.",
  },
  {
    title: "Run the init procedure",
    body: "Inspect what exists, decide what is missing, create or configure only what applies, then validate it.",
  },
  {
    title: "Review validation",
    body: "Use checks that match the target: commands, configuration, service health, or instruction consistency.",
  },
  {
    title: "Keep the init result specific",
    body: "The final instructions should explain this target, not a generic checklist copied forward forever.",
  },
]

const examples = [
  "Use the complete init.md procedure to inspect this target, initialize what applies, validate it, and report status.",
  "Use the complete development project init template to initialize this repository and validate the developer workflow.",
  "Use the complete dry-run init template to inspect this target and report proposed init work without changing files.",
  "Use the complete agent init template only if this target needs agent instructions, tools, prompts, or state.",
]

export function GuideTab() {
  const copyExample = async (example: string) => {
    try {
      await navigator.clipboard.writeText(example)
      toast.success("Example copied")
    } catch {
      toast.error("Failed to copy example")
    }
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-md border-2 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Use init.md directly</CardTitle>
          <CardDescription className="text-base leading-7">
            Start with the target. Copy init.md or a complete template, then run the procedure against that target.
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
            <CardDescription>Choose the init pattern that matches the target.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              Use minimal for one clear gap, dry run for no-change planning, development project for codebases, agent
              for agent instructions, and server for host or deployment readiness.
            </p>
            <p>
              If no template fits, copy init.md and write a short target-specific init plan before making changes.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Example instructions</CardTitle>
            <CardDescription>Copy one when asking someone or an agent to run init.md.</CardDescription>
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
          <CardDescription>Before calling the target operational, check that the report answers these questions.</CardDescription>
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