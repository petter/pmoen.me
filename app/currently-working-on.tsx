import { formatDistanceToNow } from 'date-fns';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { getLatestCommit } from './github';

function ContentSkeleton() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-block h-4 w-32 animate-pulse rounded bg-stone-800" />
      <span className="text-stone-400">in</span>
      <span className="inline-block h-4 w-28 animate-pulse rounded bg-stone-800" />
    </span>
  );
}

async function CurrentlyWorkingOnContent() {
  await connection(); // Opt into dynamic rendering for relative time
  const commit = await getLatestCommit();

  if (!commit) {
    return null;
  }

  const timeAgo = formatDistanceToNow(commit.timestamp, { addSuffix: true });

  if (!commit.isPublic) {
    return (
      <>
        <span className="font-medium italic text-stone-300">
          something secret
        </span>{' '}
        in a private repository
        <span className="ml-2 text-stone-600">{timeAgo}</span>
      </>
    );
  }

  return (
    <>
      <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-xs font-medium text-stone-200">
        {commit.message}
      </code>{' '}
      in{' '}
      <a
        href={commit.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-stone-200 transition-colors hover:text-stone-50"
      >
        {commit.repoName}
        <span className="ml-0.5 text-stone-500">↗</span>
      </a>
      <span className="ml-2 text-stone-600">{timeAgo}</span>
    </>
  );
}

export function CurrentlyWorkingOn() {
  return (
    <div className="animate-fade-up animate-delay-200 mt-8 rounded-lg border border-stone-800 bg-stone-900/50 px-4 py-3">
      <p className="text-sm text-stone-400">
        Currently working on{' '}
        <Suspense fallback={<ContentSkeleton />}>
          <CurrentlyWorkingOnContent />
        </Suspense>
      </p>
    </div>
  );
}

