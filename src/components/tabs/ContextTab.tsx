/**
 * Why: Keep context architecture guidance cohesive while letting `App` focus on layout.
 * What: Details how agents combine tools, memory, and orchestration layers alongside complementary artefacts.
 * How: Reuses card primitives so future pages or CLIs can surface the same educational content consistently.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Code } from "@phosphor-icons/react"

export function ContextTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Agent Architecture &amp; Memory Systems</CardTitle>
          <CardDescription>How modern AI agents handle context, memory, and orchestration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Modern AI agents operate in layered architectures with three critical components: Tools (capabilities),
            Memory (persistent context), and Orchestration (workflow management). The init.md protocol addresses the
            foundational layer that enables all three.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <h4 className="font-semibold">Tools Layer</h4>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                Code execution, API calls, file operations, and external integrations. Requires environment context to
                function safely.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <h4 className="font-semibold">Memory Layer</h4>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                Retains context from past interactions, user instructions, and task state. Enables agents to resume work
                across sessions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full" />
                <h4 className="font-semibold">Orchestration Layer</h4>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                Manages complex workflows, tracks task state, and ensures continuity even after system restarts.
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Where init.md Fits</h4>
            <p className="text-sm text-muted-foreground sm:text-base">
              The initialization protocol primes all three layers: it establishes tool safety through environment
              validation, populates memory with project context and history, and sets up orchestration through clear
              state management and rollback procedures.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Complementary systems &amp; briefings</CardTitle>
          <CardDescription>How init.md works alongside other agent-facing artefacts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <div>
            <h4 className="font-medium text-foreground mb-1">AGENTS.md (project briefing)</h4>
            <p>
              Once initialization is complete, contributors and coding agents turn to{" "}
              <a
                href="https://agents.md/?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted"
              >
                AGENTS.md
              </a>
              {" "}
              for build, run, and test instructions. It assumes the baseline artefacts and context snapshot already
              exist.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Config-driven kits (e.g., Google ADK)</h4>
            <p>
              Static YAML like{" "}
              <a
                href="https://google.github.io/adk-docs/agents/config/?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted"
              >
                root_agent.yaml
              </a>
              {" "}
              defines agent identity and available tools, but it does not inspect the live repository. init.md bridges
              that gap with runtime observations and artefact generation.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Orchestration platforms</h4>
            <p>
              Systems like{" "}
              <a
                href="https://aws.amazon.com/blogs/machine-learning/running-deep-research-ai-agents-on-amazon-bedrock-agentcore/?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted"
              >
                AWS Bedrock AgentCore
              </a>
              {" "}
              coordinate multi-agent lifecycles after launch. They expect each agent to enter with a primed memory and
              clearly logged READY/ROLLBACK signals—exactly what init.md supplies.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Framework Comparison</CardTitle>
          <CardDescription>How init.md compares to other agent initialization approaches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold">Config-Driven Agents</h4>
                <div className="bg-muted/30 rounded p-3 text-sm sm:text-base overflow-x-auto">
                  <p className="font-mono mb-2">root_agent.yaml</p>
                  <pre className="text-muted-foreground whitespace-pre-wrap break-words">
name: assistant_agent
model: gemini-2.5-flash
description: Helper agent
instruction: Answer questions
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Static YAML configs define agent identity and tools but don't probe the environment or generate
                  dynamic documentation.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Multi-Agent Orchestration</h4>
                <div className="bg-muted/30 rounded p-3 text-sm sm:text-base">
                  <p className="font-mono mb-2">AWS Deep Agents</p>
                  <p className="text-muted-foreground">Research Agent → Critique Agent → Orchestrator</p>
                  <p className="text-muted-foreground mt-2">Uses LangGraph state management and virtual file systems</p>
                </div>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Powerful coordination between running agents but assumes all agents are already initialized and
                  operational.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-accent pl-4 bg-accent/5 p-4 rounded-r">
              <h4 className="font-medium text-sm mb-2">The init.md Difference</h4>
              <p className="text-sm text-muted-foreground sm:text-base">
                While other frameworks focus on agent coordination or static configuration, init.md addresses the
                bootstrapping phase itself: <strong>probing the host, populating context, checking resources, and
                generating documentation</strong> before the agent begins any tasks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">CLI-first agent adoption</CardTitle>
          <CardDescription>Terminal agents that benefit directly from a deterministic init sequence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Code size={16} className="text-primary" />
                Claude Code
              </div>
              <p>
                Terminal coder with MCP support. Deterministic preflights and READY/ROLLBACK signals plug straight into
                its plan → act → react loop.
              </p>
              <a
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base underline decoration-dotted"
              >
                github.com/anthropics/claude-code
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Code size={16} className="text-primary" />
                Gemini CLI &amp; Qwen Code
              </div>
              <p>
                ReAct-style terminal agents with MCP servers. Tool-routing policies in init.md keep adapter usage
                consistent across environments.
              </p>
              <div className="flex flex-col text-sm sm:text-base">
                <a
                  href="https://cloud.google.com/vertex-ai/generative-ai/docs/gemini-cli"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  Google Cloud docs
                </a>
                <a
                  href="https://github.com/QwenLM/QwenCode"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  github.com/QwenLM/QwenCode
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Code size={16} className="text-primary" />
                GitHub Copilot CLI &amp; Continue
              </div>
              <p>
                Both lean on repeatable workspace scaffolds. Pre-declared artefact locations (README, TODO, snapshots)
                keep IDE and headless usage aligned.
              </p>
              <div className="flex flex-col text-sm sm:text-base">
                <a
                  href="https://docs.github.com/en/copilot/github-copilot-cli/github-copilot-cli"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  GitHub Copilot CLI docs
                </a>
                <a
                  href="https://docs.continue.dev/docs/category/continue-cli"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  Continue CLI documentation
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Code size={16} className="text-primary" />
                Aider, Open Interpreter, OpenHands, Cline
              </div>
              <p>
                Local-first or open-source agents that execute shell commands benefit from the context map and
                READY/ROLLBACK cues when resuming sessions.
              </p>
              <div className="flex flex-col text-sm sm:text-base">
                <a
                  href="https://github.com/paul-gauthier/aider"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  Aider on GitHub
                </a>
                <a
                  href="https://github.com/KillianLucas/open-interpreter"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  Open Interpreter repository
                </a>
                <a
                  href="https://github.com/All-Hands-AI/OpenHands"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  OpenHands on GitHub
                </a>
                <a href="https://cline.bot/" target="_blank" rel="noreferrer" className="underline decoration-dotted">
                  cline.bot
                </a>
              </div>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm sm:text-base">
            <p className="font-medium text-foreground mb-1">Why it lands</p>
            <p>
              CLI agents parse init.md once, load the context snapshot, honour the encoded tool-routing policies, and
              then loop through actions with reliable READY/ROLLBACK semantics.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Startup Sequence &amp; Context Loading</CardTitle>
          <CardDescription>The critical steps that transform a cold agent into an operational system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                  1
                </div>
                <h4 className="font-medium text-sm">System Probe</h4>
                <p className="text-sm text-muted-foreground sm:text-base">OS detection, resource baseline, time coherence</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                  2
                </div>
                <h4 className="font-medium text-sm">Context Load</h4>
                <p className="text-sm text-muted-foreground sm:text-base">File tree scan, dependency mapping, configuration discovery</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                  3
                </div>
                <h4 className="font-medium text-sm">Memory Prime</h4>
                <p className="text-sm text-muted-foreground sm:text-base">Recent logs, core directives, historical context</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                  4
                </div>
                <h4 className="font-medium text-sm">Generate Docs</h4>
                <p className="text-sm text-muted-foreground sm:text-base">README, TODO, CONTEXT, operational files</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Result: Full Environment Awareness</p>
              <p className="text-sm text-muted-foreground sm:text-base">
                By indexing key docs and configs into memory at startup, the agent obtains comprehensive knowledge of its
                operating environment. This eliminates the need for repeated discovery and ensures consistent behavior
                across sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Production Readiness</CardTitle>
          <CardDescription>From prototype to production: ensuring agents are deployment-ready</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold">Validation &amp; Rollback</h4>
              <p className="text-sm text-muted-foreground sm:text-base mb-3">
                Production agents need clear success/failure signals and recovery procedures.
              </p>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={14} />
                  <span>READY signal after successful initialization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={14} />
                  <span>ROLLBACK procedures for failed validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={14} />
                  <span>State snapshots for resumption</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Operational Documentation</h4>
              <p className="text-sm text-muted-foreground sm:text-base mb-3">
                Comprehensive docs enable team collaboration and incident response.
              </p>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={14} />
                  <span>Auto-generated runbooks and procedures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={14} />
                  <span>Architecture and dependency mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={14} />
                  <span>Machine-readable status reports</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-muted/50 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Enterprise Example: Kimera Protocol</p>
            <p className="text-sm text-muted-foreground sm:text-base">
              The Kimera project demonstrated real-world value by implementing a formal initialization sequence that
              generated comprehensive system documentation and explicit readiness signals. Teams could immediately
              identify missing docs, test gaps, and optimization opportunities—see the
              {" "}
              <a
                href="https://github.com/IdirBenSlama/Kimera-SWM/blob/afcf8340334440779843fbee1521636bdcae85c6/docs/PROTOCOL_INITIALIZATION_REPORT.md#L156-L161"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted"
              >
                readiness summary
              </a>
              {" "}
              and
              {" "}
              <a
                href="https://github.com/IdirBenSlama/Kimera-SWM/blob/afcf8340334440779843fbee1521636bdcae85c6/docs/PROTOCOL_INITIALIZATION_REPORT.md#L164-L165"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted"
              >
                follow-up checklist
              </a>
              {" "}
              for concrete outputs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
