# Repository Guidelines

## Project Structure & Module Organization
The site uses the Next.js App Router. Core routes, layouts, and MDX-driven content live under `app/` (for example, `app/blog/*/page.mdx`). Shared UI is in `components/`, static assets in `public/`, and MDX helpers in `mdx-components.tsx`; root config files (`tsconfig.json`, `.oxlintrc.json`, `.prettierrc`) define build tooling.

## Build, Test, and Development Commands
- `bun run dev` — start the local Next.js dev server with hot reload.
- `bun run build` — produce a production build and surface type and compile errors.
- `bun run start` — serve the output of the last build locally.
- `bun run lint` — run Oxlint with the project’s React, Next.js, and TypeScript rules.
- `bun run prettier:fix` — apply Prettier (with the Tailwind plugin) across the repo.

## Coding Style & Naming Conventions
TypeScript runs in strict mode; prefer functional React components and Tailwind utility classes. Use PascalCase for components, camelCase for hooks/helpers, kebab-case for route folders, and internal imports with `@/`. Prettier (with the Tailwind plugin) owns formatting—run it instead of hand-tuning spacing, and rely on `tailwind-merge` when composing class lists.

## Testing Guidelines
There is no automated test suite yet; rely on static checks. Run `bun run lint` before pushing and `bun run build` to catch type or bundling errors. Smoke-test changed routes locally and attach before/after visuals when UI shifts. New automated tests should sit beside the feature as `*.test.ts[x]` to ease future Jest or Vitest adoption.

## Commit & Pull Request Guidelines
Commit messages stay short and imperative (for example, `use react compiler`). Keep each commit scoped to one change. Pull requests need a concise summary, reproduction or verification notes, linked issues, and visuals for UI tweaks. List manual checks and any follow-up tasks in checklists when relevant.

## Content & MDX Notes
Blog and talk entries live under `app/blog` and `app/talks`. Copy an existing folder when adding content, update frontmatter, and keep package imports inside `mdx-components.tsx` to avoid bundling surprises. Run Prettier after editing MDX so heading anchors stay consistent.
