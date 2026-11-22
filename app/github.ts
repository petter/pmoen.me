import { cacheLife } from 'next/cache';
import { z } from 'zod';
import { latestShippedRef } from '@/lib/github-events';

const GitHubCommitSchema = z.object({
  commit: z.object({ message: z.string() }),
});

export interface LatestCommit {
  message: string;
  repoName: string;
  repoUrl: string;
  commitUrl: string;
  isPublic: boolean;
  timestamp: Date;
}

const githubHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
});

/** First line of the commit message, or null if it can't be fetched. */
async function fetchCommitTitle(
  repoName: string,
  sha: string,
  token: string,
): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/${repoName}/commits/${sha}`,
    { headers: githubHeaders(token) },
  );
  if (!response.ok) return null;

  const parsed = GitHubCommitSchema.safeParse(await response.json());
  if (!parsed.success) return null;
  return parsed.data.commit.message.split('\n')[0].trim() || null;
}

export async function getLatestCommit(): Promise<LatestCommit | null> {
  'use cache';
  cacheLife('minutes');

  const token = process.env.GITHUB_PAT;
  const username = process.env.GITHUB_USERNAME ?? 'petter';

  if (!token) {
    console.warn('GITHUB_PAT not set, skipping GitHub commit fetch');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      { headers: githubHeaders(token) },
    );

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const ref = latestShippedRef((await response.json()) as unknown[]);
    if (!ref) return null;

    const shortSha = ref.sha.slice(0, 7);
    const title = await fetchCommitTitle(ref.repoName, ref.sha, token);

    return {
      message: title ?? shortSha,
      repoName: ref.repoName,
      repoUrl: `https://github.com/${ref.repoName}`,
      commitUrl: `https://github.com/${ref.repoName}/commit/${ref.sha}`,
      isPublic: ref.isPublic,
      timestamp: ref.timestamp,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub events:', error);
    return null;
  }
}
