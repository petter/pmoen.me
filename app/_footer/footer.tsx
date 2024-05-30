import { Socials } from './socials';

export async function Footer() {
  return (
    <footer className="min-h-[var(--min-footer-height)] w-full bg-stone-950 p-8 text-stone-100">
      <Socials />
    </footer>
  );
}
