import { Heading } from '@/components/typography/heading';
import { ProductItem } from './product-item';

export default function ProductsPage() {
  return (
    <div>
      <Heading level={1}>Products</Heading>
      <ul className="mt-12 flex flex-col">
        <li>
          <ProductItem
            href="https://lett.vet"
            name="lett.vet"
            description="A simple journaling system for veterinaries. Provides a streamlined alternative to complex journaling systems on the market."
            techStack={[
              'Next.js',
              'Turso',
              'Drizzle',
              'TailwindCSS',
              'Resend',
              'Clerk',
              'Twilio',
              'Recharts',
              'Shadcn',
            ]}
          />
        </li>
        <li className="border-t border-stone-800">
          <ProductItem
            href="https://updated.email"
            name="updated.email"
            description="A weekly npm newsletter service. Choose the packages you care about and receive updates about recently published versions. Great for staying up-to-date with the ever changeing frontend ecosystem."
            techStack={['Next.js', 'TailwindCSS', 'Shadcn', 'Convex', 'Resend']}
          />
        </li>
      </ul>
    </div>
  );
}
