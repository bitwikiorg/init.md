# init.md — Agent initialization blueprints

This repository provides minimal, production-friendly initialization protocols for AI agents. It serves both humans (via GitHub Pages) and agents (via machine-readable protocol files).

## Structure

- **`init.md`** — The canonical, minimal initialization protocol
- **`templates/`** — Ready-to-copy template variants for different contexts
- **GitHub Pages Site** — Human-readable documentation and template browser

## Templates

- **`minimal_init_protocol.md`** — Smallest possible initialization
- **`server_init_protocol.md`** — Production server initialization  
- **`dry_run_init_protocol.md`** — Safe rehearsal mode

## Usage

1. **For Agents**: Read and parse `init.md` or template files directly
2. **For Humans**: Visit the GitHub Pages site for documentation and template browser
3. **For Developers**: Copy templates and customize for your specific system architecture

## GitHub Pages Setup

1. Fork this repository
2. Go to Settings → Pages → Source: Deploy from branch
3. Select `main` branch and `/ (root)` folder
4. Your documentation site will be available at `https://yourusername.github.io/init-md/`

## Principles

- **Lean footprint**: Vite + React build that deploys cleanly to GitHub Pages
- **Structured**: Machine-readable protocols that agents can parse systematically  
- **Practical**: Templates are ready to copy into production workflows without extra scaffolding

## Core dependencies

- React 19 and Vite 6 for the static site build
- Tailwind CSS 4 with Radix UI for styling primitives
- `@phosphor-icons/react` and shared UI components for consistent visuals

## License

MIT License. Adapt freely to your environment and policies.

## Credits

Inspired by [openai/agents.md](https://github.com/openai/agents.md), adapted for lightweight GitHub Pages deployment focused on initialization protocols.