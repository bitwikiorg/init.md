/**
 * Why: Isolate the hero copy to highlight the init.md mission without bloating the main `App` component.
 * What: Displays the positioning statement, value badges, and inspiration references for the protocol catalogue.
 * How: Uses the shared UI tokens so future pages can reuse the same introductory treatment.
 */
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">From cold start to ready state</h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
          Define how your AI agents wake up, validate their environment, and generate essential project files.
          Battle-tested initialization protocols eliminate guesswork, establish operational context, and ensure
          consistent agent behavior through comprehensive documentation generation.
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-6">
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-sm sm:text-base">
            Context engineering
          </Badge>
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-sm sm:text-base">
            Memory priming
          </Badge>
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-sm sm:text-base">
            Auto documentation
          </Badge>
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-sm sm:text-base">
            Production ready
          </Badge>
        </div>
        <div className="text-sm sm:text-base text-muted-foreground">
          <p>Inspired by Unix init, Python __init__.py, and modern agent architecture patterns</p>
        </div>
      </div>
    </section>
  )
}
