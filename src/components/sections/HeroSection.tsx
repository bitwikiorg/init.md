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
              BITwiki open protocol
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              Initialize what the target actually needs.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Copy a plain init instruction for the target. Use the root instruction for general init, or a template
              instruction when the target is more specific.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" type="button" onClick={() => onSelectTab("templates")}>
                Copy instructions
                <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" type="button" onClick={() => onSelectTab("quickstart")}>
                <BookOpen size={18} />
                Read guide
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
              Use this sequence to decide what init instructions, files, or checks actually apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}