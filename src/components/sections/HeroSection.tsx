import { ArrowRight, BookOpen } from "@phosphor-icons/react"
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
              init.md protocol
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              Copy init instructions that match your target.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Use init.md to inspect the target, pick the right template, copy what applies, and validate the result.
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
              Start from the root protocol, then copy the template sections that fit the target.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}