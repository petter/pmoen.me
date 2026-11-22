import { formatDistanceToNow } from 'date-fns';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { ExternalLink } from '@/components/typography/external-link';
import { getLatestCommit } from './github';

function StatusDot({ live }: { live: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative mt-1.5 flex h-2 w-2 shrink-0 sm:mt-0"
    >
      {live ? (
        <>
          <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </>
      ) : (
        <span className="relative inline-flex h-2 w-2 rounded-full bg-stone-600" />
      )}
    </span>
  );
}

function ContentSkeleton() {
  return (
    <div className="flex min-w-0 items-start gap-3 text-sm text-stone-300 sm:items-center">
      <StatusDot live={false} />
      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span>Currently working on</span>
        <span className="sr-only">Loading latest GitHub activity</span>
        <span
          aria-hidden="true"
          className="inline-block h-4 w-28 rounded bg-stone-800 motion-safe:animate-pulse"
        />
        <span
          aria-hidden="true"
          className="inline-block h-4 w-24 rounded bg-stone-800 motion-safe:animate-pulse"
        />
      </span>
    </div>
  );
}

async function CurrentlyWorkingOnContent() {
  await connection(); // Opt into dynamic rendering for relative time
  const commit = await getLatestCommit();

  if (!commit) {
    return (
      <div className="flex min-w-0 items-start gap-3 text-sm text-stone-300 sm:items-center">
        <StatusDot live={false} />
        <p className="min-w-0 flex-1 leading-relaxed">
          Currently working on product ideas, frontend craft, and AI tooling.
        </p>
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(commit.timestamp, { addSuffix: true });

  if (!commit.isPublic) {
    return (
      <div className="flex min-w-0 items-start gap-3 text-sm text-stone-300 sm:items-center">
        <StatusDot live />
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <p className="min-w-0">
            Currently working on{' '}
            <span className="font-medium text-stone-100 italic">
              something secret
            </span>{' '}
            in a private repository
          </p>
          <span className="shrink-0 font-mono text-xs text-stone-400 tabular-nums">
            {timeAgo}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-start gap-3 text-sm text-stone-300 sm:items-center">
      <StatusDot live />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <p className="min-w-0 leading-relaxed wrap-anywhere">
          Currently working on{' '}
          <a
            href={commit.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline max-w-full rounded border border-stone-800 bg-stone-950/80 px-1.5 py-0.5 font-mono text-xs font-medium wrap-anywhere text-stone-200 transition-colors hover:border-amber-300/40 hover:text-stone-50"
          >
            <span className="mr-1.5 text-amber-300/90">{commit.shortSha}</span>
            <span>{commit.message}</span>
          </a>{' '}
          in{' '}
          <ExternalLink href={commit.repoUrl}>{commit.repoName}</ExternalLink>
        </p>
        <span className="shrink-0 font-mono text-xs text-stone-400 tabular-nums">
          {timeAgo}
        </span>
      </div>
    </div>
  );
}

export function CurrentlyWorkingOn() {
  return (
    <div
      className="enter-up mt-8 rounded-lg border border-stone-800/80 bg-stone-900/35 px-4 py-3"
      style={{ animationDelay: '140ms' }}
    >
      <Suspense fallback={<ContentSkeleton />}>
        <CurrentlyWorkingOnContent />
      </Suspense>
    </div>
  );
}
