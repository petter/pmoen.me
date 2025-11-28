import Link from 'next/link';
import { FaGithub, FaLinkedin, FaBluesky, FaXTwitter } from 'react-icons/fa6';
import { GrainOverlay } from '@/components/grain-overlay';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-stone-950 text-stone-100">
      <GrainOverlay />

      <main className="relative flex flex-1 flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          {/* Name */}
          <h1 className="animate-fade-up font-serif text-4xl font-light tracking-tight text-stone-50 sm:text-5xl md:text-6xl">
            Petter Sæther Moen
          </h1>

          {/* Tagline */}
          <p className="animate-fade-up animate-delay-100 mt-6 text-lg text-stone-400 md:text-xl">
            Software Engineer
          </p>

          {/* Bio */}
          <div className="animate-fade-up animate-delay-200 mt-8 max-w-xl space-y-4 text-stone-400">
            <p>M.Sc. from University of Oslo. Based in Toronto, Canada.</p>
            <p>
              Passionate about product development, frontend technology, and AI.
            </p>
          </div>

          {/* Navigation */}
          <nav className="animate-fade-up animate-delay-300 mt-16">
            <ul className="flex flex-wrap gap-x-8 gap-y-4 text-sm tracking-wide uppercase">
              <li>
                <Link
                  href="/blog"
                  className="text-stone-400 transition-colors duration-200 hover:text-stone-50"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/talks"
                  className="text-stone-400 transition-colors duration-200 hover:text-stone-50"
                >
                  Talks
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-stone-400 transition-colors duration-200 hover:text-stone-50"
                >
                  Products
                </Link>
              </li>
              <li>
                <a
                  href="https://cv.pmoen.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 transition-colors duration-200 hover:text-stone-50"
                >
                  CV
                </a>
              </li>
            </ul>
          </nav>

          {/* Social links */}
          <div className="animate-fade-up animate-delay-500 mt-16 flex gap-6">
            <a
              href="https://github.com/petter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-200 hover:text-stone-50"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://bsky.app/profile/pmoen.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-200 hover:text-stone-50"
              aria-label="Bluesky"
            >
              <FaBluesky size={20} />
            </a>
            <a
              href="https://x.com/pettersmoen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-200 hover:text-stone-50"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com/in/pettersmoen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors duration-200 hover:text-stone-50"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
