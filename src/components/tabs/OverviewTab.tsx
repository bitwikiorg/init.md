/**
 * Why: Encapsulate the overview storytelling for reuse across surfaces that need the init.md primer.
 * What: Renders contextual cards explaining definitions, evolution, and guardrails for initialization protocols.
 * How: Leverages shared UI components to keep the narrative consistent with the canonical `init.md` guidance.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "@phosphor-icons/react"

export function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">What is "init"?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <p className="text-muted-foreground text-sm sm:text-base">
              Traditionally, "init" is the Unix process that initializes the system during boot.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              For agents, "init" defines the procedural scope and instruction sets to transition from cold start to
              ready state. It establishes context, validates systems, and generates essential project documentation
              automatically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Implementation Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Safe system probes with minimal side effects</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Structured execution steps and clear policies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Automated file tree and context generation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Project documentation suite generation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Definition &amp; scope</CardTitle>
            <CardDescription>The runbook that carries an agent from cold start to READY</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              init.md captures the safe preflights, context loads, and artefact generation an agent needs before doing
              work. It embraces the idea of "context engineering"—preparing prompts, memory, tools, and data ahead of
              time so behaviour is predictable.
            </p>
            <p className="text-sm sm:text-base">
              Learn more from{" "}
              <a
                href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted"
              >
                Anthropic’s context engineering guidance
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Why it matters</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Runbooks stay fixed while prompts can vary, enabling repeatable results across sessions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Early environment validation mirrors real production boot sequences and avoids surprises.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span>Documented outputs make it easy for humans to audit, resume, or hand off work.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">The Evolution of Initialization</CardTitle>
          <CardDescription>How initialization patterns have shaped software development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Unix systemd</h4>
              <p className="text-sm text-muted-foreground sm:text-base">
                Process ID 1 brings up userspace services in a deterministic order, ensuring the operating system is
                stable before workloads launch.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Kubernetes init containers</h4>
              <p className="text-sm text-muted-foreground sm:text-base">
                One-shot containers finish migrations or checks before the main pod runs, guaranteeing a predictable
                environment for application code.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Python __init__.py</h4>
              <p className="text-sm text-muted-foreground sm:text-base">
                Marks a directory as a package and primes imports so modules expose the right interfaces and
                dependencies.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">JavaScript init helpers</h4>
              <p className="text-sm text-muted-foreground sm:text-base">
                Setup functions consolidate configuration, dependency wiring, and boot logic before a runtime executes
                business code.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-4 bg-muted/30 p-4 rounded-r">
            <p className="text-sm font-medium mb-2">The Pattern</p>
            <p className="text-sm text-muted-foreground sm:text-base">
              Every successful initialization system follows the same principle: <strong>establish context, validate
              environment, and prepare for operation</strong>. The init.md protocol applies this battle-tested pattern to
              AI agent bootstrapping.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Context Engineering in AI Agents</CardTitle>
          <CardDescription>Why proper initialization is critical for autonomous systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Context engineering emphasizes providing an AI agent with all relevant information and structure up front,
            not just one-off prompts. Instead of improvising each interaction, we prepare the agent's environment and
            instructions in advance through a stable "runbook" of steps and policies.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">Without Proper Init</h4>
              <ul className="space-y-1 text-sm text-muted-foreground sm:text-base">
                <li>• Agent starts with minimal context</li>
                <li>• Repeated environment discovery</li>
                <li>• Inconsistent behavior across sessions</li>
                <li>• Missing documentation and structure</li>
              </ul>
            </div>

            <div className="bg-accent/10 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">With init.md Protocol</h4>
              <ul className="space-y-1 text-sm text-muted-foreground sm:text-base">
                <li>• Comprehensive environment awareness</li>
                <li>• Consistent baseline across sessions</li>
                <li>• Automated documentation generation</li>
                <li>• Clear operational procedures</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Key Insight</p>
            <p className="text-sm text-muted-foreground sm:text-base">
              A good runbook "is the key to a well-functioning AI agent" — it contains clear, step-by-step
              instructions that remain constant across sessions, ensuring the agent always begins with the same
              baseline knowledge and capabilities.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Generated Documentation Suite</CardTitle>
          <CardDescription>Recommended starter artefacts teams often emit during initialization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-mono text-sm">README.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                Suggested overview covering detected stack, dependencies, and architecture notes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-mono text-sm">TODO.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                Recommended backlog capturing gaps, doc debt, and optimization opportunities surfaced during init
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-mono text-sm">PRD.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                Product requirements outline capturing goals, stakeholders, and success metrics for the project
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-mono text-sm">CONTEXT.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                Baseline context index (file tree, env metadata, inventory) to accelerate later tasks
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="font-mono text-sm">AGENTS.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                Optional agent briefing summarizing build/run/test expectations once init is complete
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="font-mono text-sm">RUNBOOK.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                When production-ready, a lightweight runbook outlining incident, maintenance, and on-call paths
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span className="font-mono text-sm">INIT_CONTEXT_SNAPSHOT.md</span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base pl-4">
                Machine-readable snapshot (directory tree, host metrics, quick links) useful for auditing runs
              </p>
            </div>
          </div>

          <div className="mt-6 bg-muted/40 rounded-lg p-4 text-sm text-muted-foreground sm:text-base space-y-2">
            <p className="font-medium text-sm text-foreground">Blueprinted scripts (operator-triggered)</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <span className="font-mono">scripts/init-checks.sh</span> — lint and static analysis preflight
              </li>
              <li>
                <span className="font-mono">scripts/prepare-context.sh</span> — rebuild context snapshots on demand
              </li>
              <li>
                <span className="font-mono">scripts/ready.sh</span> — emit READY banner with artefact paths
              </li>
            </ul>
            <p>Documented for teams to run intentionally; never executed automatically during bootstrap.</p>
            <p className="text-foreground/80">
              Treat this suite as a starter kit—swap in project-specific artefacts where they deliver more value.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Execution flow</CardTitle>
          <CardDescription>The sequence that turns a cold agent into a READY signal</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm sm:text-base text-muted-foreground list-decimal list-inside">
            <li>
              Parse <span className="font-mono">init.md</span> into structured steps with descriptions, actions, and guardrails.
            </li>
            <li>Perform host preflights and resource baselines without privileged mutations.</li>
            <li>Build a context index covering key docs, configs, scripts, and version control state.</li>
            <li>Emit documentation, snapshots, and policy logs so humans can audit the start state.</li>
            <li>Publish READY or ROLLBACK signals and await operator guidance.</li>
          </ol>
        </CardContent>
      </Card>

    </div>
  )
}
