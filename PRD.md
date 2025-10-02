# init.md — Minimal initialization blueprints for agents

A lightweight, GitHub Pages–friendly repository providing initialization protocols for AI agents to transition from cold start to ready state.

**Experience Qualities:**
1. **Minimal** — Smallest viable footprint with zero dependencies beyond GitHub Pages
2. **Structured** — Machine-readable protocols that agents can parse and execute systematically  
3. **Practical** — Real-world templates that users can immediately clone and adapt

**Complexity Level**: Content Showcase (information-focused)
This is primarily a documentation site showcasing initialization protocols and templates, with light interactive features for template browsing.

## Essential Features

**Template Gallery with Interactive Preview**
- Functionality: Carousel showcasing multiple init protocol templates for different contexts
- Purpose: Allow users to quickly compare and select appropriate templates for their systems
- Trigger: User visits landing page or clicks template navigation
- Progression: Browse templates → preview content → copy template → customize for system
- Success criteria: Users can easily identify and copy relevant templates

**GitHub Pages Integration**
- Functionality: Automatically deploy documentation site from repository content
- Purpose: Provide human-readable access to init protocols alongside machine-readable files
- Trigger: Repository updates trigger automatic GitHub Pages deployment
- Progression: Code commit → GitHub Actions → Pages deployment → live site update
- Success criteria: Site updates automatically when repository content changes

**Machine-Readable Protocol Structure**
- Functionality: Consistent YAML-like structure that agents can parse and execute
- Purpose: Enable agents to systematically execute initialization sequences
- Trigger: Agent reads init.md file during startup sequence
- Progression: Agent parses structure → validates steps → executes initialization → reports ready state
- Success criteria: Agents can reliably parse and execute protocols without human intervention

## Edge Case Handling

- **Missing templates**: Fallback to minimal protocol if specific template unavailable
- **GitHub Pages failures**: Static files remain accessible even if dynamic features break  
- **Large repositories**: Templates remain lightweight regardless of hosting repository size
- **Version conflicts**: Templates include version compatibility notes and migration guides

## Design Direction

The design should feel professional and trustworthy while maintaining extreme simplicity — think technical documentation that feels approachable rather than intimidating, with clean typography and generous whitespace that helps users quickly scan and understand complex initialization procedures.

## Color Selection

Analogous color scheme using cool blues and grays to convey technical reliability and trust, with subtle green accents for success states and completion indicators.

- **Primary Color**: Deep blue (`oklch(0.3 0.15 240)`) — conveys technical authority and reliability
- **Secondary Colors**: Light gray (`oklch(0.95 0.02 240)`) for backgrounds and subtle blue-gray (`oklch(0.7 0.05 240)`) for secondary text
- **Accent Color**: Success green (`oklch(0.65 0.15 140)`) for completion states and positive actions
- **Foreground/Background Pairings**: 
  - Primary (Deep Blue): White text (`oklch(1 0 0)`) - Ratio 8.2:1 ✓
  - Secondary Gray: Dark gray text (`oklch(0.2 0 0)`) - Ratio 15.1:1 ✓  
  - Accent (Success Green): White text (`oklch(1 0 0)`) - Ratio 5.8:1 ✓
  - Background White: Primary blue text - Ratio 8.2:1 ✓

## Font Selection

Typography should emphasize clarity and scannability for technical documentation — Inter for its excellent readability at all sizes and Fira Code for code blocks to ensure perfect monospace alignment.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing  
  - H3 (Subsections): Inter Medium/18px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Code Blocks: Fira Code Regular/14px/1.4 line height
  - Navigation: Inter Medium/14px/normal spacing

## Animations

Subtle functional animations that guide attention without being distracting — think gentle fades for template switching and smooth scrolling for navigation, maintaining a professional tone that doesn't call attention to itself.

- **Purposeful Meaning**: Smooth transitions between templates communicate progression and system responsiveness
- **Hierarchy of Movement**: Template carousel gets priority for animation, while navigation and page transitions use minimal motion

## Component Selection

- **Components**: Cards for template previews, Tabs for template navigation, Code blocks with syntax highlighting, Breadcrumbs for section navigation
- **Customizations**: Custom template carousel component with next/previous navigation, enhanced code blocks with copy-to-clipboard functionality
- **States**: Hover states for templates, active states for navigation, loading states for template content
- **Icon Selection**: Phosphor icons for navigation (CaretLeft/Right for carousel, Copy for clipboard, CheckCircle for completion)
- **Spacing**: Consistent 1rem base spacing with 2rem section gaps and 0.5rem component internal padding
- **Mobile**: Stacked template cards on mobile with swipe navigation, collapsible navigation menu, single-column layout with full-width code blocks