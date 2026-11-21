import type { Metadata } from 'next';
import { Heading } from '@/components/typography/heading';
import { TalkItem } from './talk-item';

export const metadata: Metadata = {
  title: 'Talks',
  description: 'Conference talks and presentations by Petter Sæther Moen.',
};

export default function TalksPage() {
  return (
    <div>
      <header className="enter-up">
        <Heading level={1}>Talks</Heading>
        <p className="mt-4 max-w-[56ch] text-base text-stone-400">
          Conference talks and technical presentations.
        </p>
      </header>

      <ul className="mt-9 flex flex-col">
        <li className="enter-up" style={{ animationDelay: '80ms' }}>
          <TalkItem
            href="https://www.youtube.com/live/-H7OdGaxgmM?t=12985"
            title="Demystifying React's Server Functions"
            conference="React Norway"
            location="Oslo"
            date="June 2025"
            summary="A look under the hood at how React Server Functions bridge client interactivity and server execution."
          />
        </li>
      </ul>

      <div
        className="enter-up mt-6 border-t border-stone-800/80 pt-6"
        style={{ animationDelay: '160ms' }}
      >
        <p className="max-w-[56ch] text-sm leading-relaxed text-pretty text-stone-400">
          Always happy to speak about React, frontend architecture, and AI
          tooling at meetups or conferences — feel free to reach out on{' '}
          <a
            href="https://bsky.app/profile/pmoen.me"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-amber-300/65 text-stone-200 transition-colors hover:border-amber-300 hover:text-amber-200"
          >
            Bluesky
          </a>{' '}
          or{' '}
          <a
            href="https://linkedin.com/in/pettersmoen"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-amber-300/65 text-stone-200 transition-colors hover:border-amber-300 hover:text-amber-200"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  );
}
