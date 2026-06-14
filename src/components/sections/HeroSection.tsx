import { ArrowRight, BookOpen, ChatsCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

const stages = ["Inspect", "Determine", "Create", "Configure", "Validate", "Report"]

interface HeroSectionProps {
  onSelectTab: (tab: string) => void
}

export function HeroSection({ onSelectTab }: HeroSectionProps) {
  return (
    <section className="border-b border-border bg-card">
      <div className="protocol-grid">
        <div className="container mx-auto grid gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              BITwiki open protocol
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              Initialize what the target actually needs.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              init.md is a general procedure for inspecting a target, determining its operational requirements,
              creating and configuring what applies, validating the result, and reporting what became operational.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" type="button" onClick={() => onSelectTab("templates")}>
                Explore templates
                <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/bitwikiorg/init.md/blob/main/init.md" target="_blank" rel="noreferrer">
                  <BookOpen size={18} />
                  Read the protocol
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="https://hub.bitwiki.org/" target="_blank" rel="noreferrer">
                  <ChatsCircle size={18} />
                  Discuss on BIThub
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-md border-2 border-foreground bg-background p-4 shadow-[8px_8px_0_var(--foreground)]">
            <div className="grid gap-2">
              {stages.map((stage, index) => (
                <div key={stage} className="grid grid-cols-[2.75rem_1fr] items-center border border-border bg-card">
                  <div className="grid h-12 place-items-center border-r border-border font-mono text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="px-4 py-3">
                    <p className="font-semibold">{stage}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
              The root protocol determines the process. Templates define target-specific implementation patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}