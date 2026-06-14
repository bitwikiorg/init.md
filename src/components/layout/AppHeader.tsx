import { Stack } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  onSelectTab: (tab: string) => void
}

export function AppHeader({ onSelectTab }: AppHeaderProps) {
  return (
    <header className="top-0 z-20 border-b border-border bg-background/95 backdrop-blur lg:sticky">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md border-2 border-foreground bg-foreground text-sm font-black text-background">
            init
          </div>
          <div>
            <h1 className="text-xl font-black tracking-normal sm:text-2xl">init.md</h1>
            <p className="text-sm text-muted-foreground">Copy init instructions and templates</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary navigation">
          <Button type="button" variant="ghost" size="sm" onClick={() => onSelectTab("templates")}>
            <Stack size={16} />
            Templates
          </Button>
        </nav>
      </div>
    </header>
  )
}