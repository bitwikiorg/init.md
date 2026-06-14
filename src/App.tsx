/**
 * Why: Compose the page shell while delegating heavy content blocks to modular components.
 * What: Orchestrates the init.md landing experience and coordinates tab routing across sections.
 * How: Uses feature components for each section and tab to stay maintainable, testable, and reusable.
 */
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppHeader } from "@/components/layout/AppHeader"
import { HeroSection } from "@/components/sections/HeroSection"
import { OverviewTab } from "@/components/tabs/OverviewTab"
import { ContextTab } from "@/components/tabs/ContextTab"
import { TemplatesTab } from "@/components/tabs/TemplatesTab"
import { GuideTab } from "@/components/tabs/GuideTab"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <AppHeader onSelectTab={setActiveTab} />
      <HeroSection onSelectTab={setActiveTab} />

      <main className="container mx-auto px-4 pb-12 sm:pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-6xl">
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 rounded-md border bg-card p-1 sm:mb-8 sm:grid-cols-4">
            <TabsTrigger value="overview" className="text-sm sm:text-base">
              Overview
            </TabsTrigger>
            <TabsTrigger value="context" className="text-sm sm:text-base">
              Protocol
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-sm sm:text-base">
              Templates
            </TabsTrigger>
            <TabsTrigger value="quickstart" className="text-sm sm:text-base">
              Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="context" className="mt-8">
            <ContextTab />
          </TabsContent>

          <TabsContent value="templates" className="mt-8">
            <TemplatesTab />
          </TabsContent>

          <TabsContent value="quickstart" className="mt-8">
            <GuideTab />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border bg-foreground text-background">
        <div className="container mx-auto grid gap-6 px-4 py-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="font-semibold">init.md</p>
            <p className="mt-2 max-w-2xl text-sm text-background/75">
              Copy init instructions and templates for your target. Keep only what applies.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm md:justify-end" aria-label="Footer links">
            <a className="underline-offset-4 hover:underline" href="https://github.com/bitwikiorg/init.md" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          </div>
      </footer>
      <Toaster />
    </div>
  )
}

export default App