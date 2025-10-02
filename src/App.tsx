/**
 * Why: Compose the page shell while delegating heavy content blocks to modular components.
 * What: Orchestrates the init.md landing experience and coordinates tab routing across sections.
 * How: Uses feature components for each section and tab to stay maintainable, testable, and reusable.
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppHeader } from "@/components/layout/AppHeader"
import { HeroSection } from "@/components/sections/HeroSection"
import { OverviewTab } from "@/components/tabs/OverviewTab"
import { ContextTab } from "@/components/tabs/ContextTab"
import { TemplatesTab } from "@/components/tabs/TemplatesTab"
import { GuideTab } from "@/components/tabs/GuideTab"

function App() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <AppHeader />
      <HeroSection />

      <main className="container mx-auto px-4 pb-12 sm:pb-16">
        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-6 sm:mb-8">
            <TabsTrigger value="overview" className="text-sm sm:text-base">
              Overview
            </TabsTrigger>
            <TabsTrigger value="context" className="text-sm sm:text-base">
              Context
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

      <footer className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">Licensed under MIT. Adapt to your environment and policies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App