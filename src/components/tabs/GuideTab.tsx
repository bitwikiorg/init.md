/**
 * Why: Separate the implementation guide so onboarding flows can embed it without inheriting the full page shell.
 * What: Outlines the step-by-step instructions and selection matrix for protocol adoption.
 * How: Wraps the existing content in a dedicated component for reuse and easier maintenance.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Desktop, FileText, TestTube } from "@phosphor-icons/react"

export function GuideTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
          <CardDescription>How to define your project scope, systems, and execution parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Define Project Scope</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Identify what your agent needs to know about your project and environment
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm sm:text-base">
                  <p>
                    <strong>Ask yourself:</strong> What files matter most? What technologies are in use? What documentation
                    should exist but doesn't?
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Map Your System Architecture</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Document services, dependencies, and infrastructure components
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm sm:text-base">
                  <p>
                    <strong>Consider:</strong> Databases, APIs, scheduled jobs, external services, deployment targets, and
                    monitoring systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Customize Template Parameters</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Adapt the protocol to your specific tools, policies, and constraints
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm sm:text-base">
                  <p>
                    <strong>Modify:</strong> File output locations, probe safety levels, documentation depth, and execution
                    timeouts.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Execute and Validate</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Run the protocol and verify generated documentation accuracy
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm sm:text-base">
                  <p>
                    <strong>Verify:</strong> File trees are complete, configurations are accurate, and documentation reflects
                    current system state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Selection Guide</CardTitle>
          <CardDescription>Choose the right initialization approach for your environment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="text-primary" size={20} />
                  <h4 className="font-medium">Minimal</h4>
                </div>
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Use when:</strong> Personal projects, prototypes, development environments
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Generates:</strong> Essential README, TODO, and CONTEXT files
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Desktop className="text-primary" size={20} />
                  <h4 className="font-medium">Server</h4>
                </div>
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Use when:</strong> Production systems, team projects, complex infrastructure
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Generates:</strong> Complete operational suite including RUNBOOK and AGENTS
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TestTube className="text-primary" size={20} />
                  <h4 className="font-medium">Dry-Run</h4>
                </div>
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Use when:</strong> Testing, validation, security-conscious environments
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Generates:</strong> Documentation blueprints without system changes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Implementation Patterns</CardTitle>
          <CardDescription>Proven approaches for different project types and environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">For Web Applications</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base">
                <div className="bg-muted/50 rounded p-3">
                  <p className="font-medium mb-1">Frontend Projects</p>
                  <p className="text-muted-foreground">
                    Focus on package.json, build tools, component architecture, and deployment pipelines
                  </p>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <p className="font-medium mb-1">Full-Stack Apps</p>
                  <p className="text-muted-foreground">
                    Map both client and server, database schemas, API endpoints, and environment configs
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm">For Infrastructure Projects</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base">
                <div className="bg-muted/50 rounded p-3">
                  <p className="font-medium mb-1">Container Deployments</p>
                  <p className="text-muted-foreground">
                    Document Dockerfiles, compose files, orchestration configs, and service dependencies
                  </p>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <p className="font-medium mb-1">Cloud Infrastructure</p>
                  <p className="text-muted-foreground">
                    Catalog terraform files, cloud resources, networking, and monitoring configurations
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm">For Data Projects</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base">
                <div className="bg-muted/50 rounded p-3">
                  <p className="font-medium mb-1">Analytics Pipelines</p>
                  <p className="text-muted-foreground">
                    Map data sources, transformation scripts, scheduling, and output destinations
                  </p>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <p className="font-medium mb-1">ML/AI Systems</p>
                  <p className="text-muted-foreground">
                    Document models, training data, inference endpoints, and monitoring systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
