import type { Metadata } from 'next';
import { Heading } from '@/components/typography/heading';
import { ProductItem } from './product-item';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products and tools designed and built by Petter Sæther Moen.',
};

const PRODUCTS = [
  {
    href: 'https://lett.vet',
    name: 'lett.vet',
    description:
      'A simple journaling system for veterinarians. Provides a streamlined alternative to complex journaling systems on the market.',
    techStack: [
      'Next.js',
      'Turso',
      'Drizzle',
      'TailwindCSS',
      'Resend',
      'Clerk',
      'Twilio',
      'Recharts',
      'Shadcn',
    ],
  },
  {
    href: 'https://updated.email',
    name: 'updated.email',
    description:
      'A weekly npm newsletter service. Choose the packages you care about and receive updates about recently published versions. Great for staying up-to-date with the ever-changing frontend ecosystem.',
    techStack: ['Next.js', 'TailwindCSS', 'Shadcn', 'Convex', 'Resend'],
  },
  {
    href: 'https://kanban-agent-interface-web.vercel.app',
    name: 'Kanban Agent Interface',
    description:
      'A macOS desktop app that runs coding agents on a kanban board. Each card gets its own git worktree and branch, letting agents work in parallel. Supports any ACP agent — Claude, Gemini, Codex, Cursor, Copilot.',
    techStack: ['Electron', 'React', 'TypeScript', 'Vite', 'ACP'],
  },
] as const;

export default function ProductsPage() {
  return (
    <div>
      <header className="enter-up">
        <Heading level={1}>Products</Heading>
        <p className="mt-4 max-w-[56ch] text-base text-stone-400">
          Side projects and tools I&apos;ve designed, built, and shipped.
        </p>
      </header>

      <ul className="mt-9 flex flex-col">
        {PRODUCTS.map((product, index) => (
          <li
            key={product.name}
            className={`enter-up ${index > 0 ? 'border-t border-stone-800/80' : ''}`}
            style={{ animationDelay: `${(index + 1) * 75}ms` }}
          >
            <ProductItem
              index={index + 1}
              href={product.href}
              name={product.name}
              description={product.description}
              techStack={[...product.techStack]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
