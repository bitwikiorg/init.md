import { ArrowRight, CheckCircle, Copy } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const workflow = [
  {
    title: "Identify the target",
    body: "Name what is being initialized, where it lives, who operates it, and what operational result is expected.",
  },
  {
    title: "Choose the closest template",
    body: "Start from minimal, dry run, development project, agent, or server. Combine compatible sections when the target requires it.",
  },
  {
    title: "Copy or adapt the template",
    body: "Use the template as a concrete pattern, then remove anything that does not apply to the target.",
  },
  {
    title: "Run the initialization procedure",
    body: "Inspect what exists, determine requirements, create what applies, and configure what is required.",
  },
  {
    title: "Review the validation result",
    body: "Operational status comes from relevant checks, such as commands, parseable configuration, service health, or instruction consistency.",
  },
  {
    title: "Keep the target-specific init.md",
    body: "The result should describe this target's initialization path, not a generic checklist copied forward forever.",
  },
]

const examples = [
  "Initialize this repository using the development-project template.",
  "Inspect this server using the server template in dry-run mode.",
  "Determine what this agent workspace needs to become operational.",
  "Create an AGENTS.md file only if this project would benefit from one.",
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
            Start with the target, not the file list. The template is a pattern for deciding what applies.
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
            <CardDescription>Choose the pattern that matches the target's real operational needs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground sm:text-base">
            <p>
              Use minimal for narrow gaps, dry run for no-change planning, development project for codebases, agent for
              agent instructions and tool setup, and server for host or deployment readiness.
            </p>
            <p>
              If no template fits cleanly, use the root protocol to create a target-specific plan and record the
              validation criteria before making changes.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Example instructions</CardTitle>
            <CardDescription>Copy one into an agent or adapt it for a human handoff.</CardDescription>
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

      <div className="rounded-md border-2 border-foreground bg-foreground p-5 text-background">
        <a
          href="https://hub.bitwiki.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
        >
          Discuss the protocol, ask questions, share templates, propose improvements, or report implementation
          experiences on BIThub
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}