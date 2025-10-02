/**
 * Why: Split the page header out of `App` so it can be reused across protocol views.
 * What: Renders the init.md title block and version badge defined by the canonical protocol docs.
 * How: Composes design system primitives to stay consistent with the guidance in `init.md`.
 */
import { Badge } from "@/components/ui/badge"

export function AppHeader() {
  return (
    <header className="border-b border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">init.md</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Boot AI agents with precision</p>
          </div>
          <Badge variant="secondary" className="text-sm self-start sm:self-center">
            v1.0.0
          </Badge>
        </div>
      </div>
    </header>
  )
}
