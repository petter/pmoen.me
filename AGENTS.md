# Repository Guidelines

## Project Structure & Module Organization

The site uses the Next.js App Router. The homepage lives at `app/page.tsx` with its own self-contained layout. Subpages (blog, talks, products) use the `app/(site)/` route group which provides shared navigation and styling. Shared UI components go in `components/`, static assets in `public/`, and MDX helpers in `mdx-components.tsx`. Root config files (`tsconfig.json`, `.oxlintrc.json`, `.prettierrc`) define build tooling.

## Build, Test, and Development Commands

- `bun run dev` — start the local Next.js dev server with hot reload.
- `bun run build` — produce a production build and surface type and compile errors.
- `bun run start` — serve the output of the last build locally.
- `bun run lint` — run Oxlint with the project's React, Next.js, and TypeScript rules.
- `bun run prettier:fix` — apply Prettier (with the Tailwind plugin) across the repo.

## Design System

### Color Palette

The site uses a dark, minimalist aesthetic built on Tailwind's stone palette:

- **Background**: `stone-950` (near-black)
- **Primary text**: `stone-50` (off-white) for headings and active elements
- **Secondary text**: `stone-200` for body content
- **Muted text**: `stone-400` / `stone-500` for dates, labels, and inactive nav
- **Subtle borders**: `stone-800` for dividers

### Typography

Two font families are configured in `app/layout.tsx` and `app/globals.css`:

- **Geist** (`font-sans`): Clean sans-serif for body text and UI
- **Cormorant Garamond** (`font-serif`): Elegant serif for page titles (h1)

Page titles use `font-serif text-4xl font-light tracking-tight` or larger on the homepage.

### Visual Texture

A subtle grain overlay (`<GrainOverlay />` from `components/grain-overlay.tsx`) adds depth to dark backgrounds. Use it on full-page layouts.

### Layout Patterns

- **Homepage** (`app/page.tsx`): Self-contained, full-viewport, vertically centered content
- **Subpages** (`app/(site)/`): Shared header with "← Home" link and nav, max-width content area
- **Navigation**: Uses `NavLink` component for active state highlighting (bright when active, muted otherwise)

### Component Patterns

- **Lists**: Use subtle top borders (`border-t border-stone-800`) between items, not cards
- **Links**: External links show "↗" indicator and open in new tab
- **Hover states**: Transition text to `stone-50` on hover
- **Animations**: Use `tailwindcss-animated` for entrance animations (fade-up with staggered delays)

## Coding Style & Naming Conventions

TypeScript runs in strict mode; prefer functional React components and Tailwind utility classes. Use PascalCase for components, camelCase for hooks/helpers, kebab-case for route folders, and internal imports with `@/`. Prettier (with the Tailwind plugin) owns formatting—run it instead of hand-tuning spacing, and rely on `tailwind-merge` when composing class lists.

## Testing Guidelines

There is no automated test suite yet; rely on static checks. Run `bun run lint` before pushing and `bun run build` to catch type or bundling errors. Smoke-test changed routes locally and attach before/after visuals when UI shifts. New automated tests should sit beside the feature as `*.test.ts[x]` to ease future Jest or Vitest adoption.

## Commit & Pull Request Guidelines

Commit messages stay short and imperative (for example, `use react compiler`). Keep each commit scoped to one change. Pull requests need a concise summary, reproduction or verification notes, linked issues, and visuals for UI tweaks. List manual checks and any follow-up tasks in checklists when relevant.

## Content & MDX Notes

Blog and talk entries live under `app/(site)/blog` and `app/(site)/talks`. Copy an existing folder when adding content, update frontmatter, and keep package imports inside `mdx-components.tsx` to avoid bundling surprises. Run Prettier after editing MDX so heading anchors stay consistent.
