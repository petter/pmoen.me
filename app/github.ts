import { z } from 'zod';

const GitHubPushEventSchema = z.object({
  id: z.string(),
  type: z.literal('PushEvent'),
  public: z.boolean(),
  created_at: z.string(),
  repo: z.object({
    name: z.string(),
  }),
  payload: z.object({
    head: z.string(),
    commits: z
      .array(
        z.object({
          sha: z.string(),
          message: z.string(),
        }),
      )
      .optional()
      .default([]),
  }),
});

const GitHubCommitSchema = z.object({
  sha: z.string(),
  commit: z.object({
    message: z.string(),
  }),
});

export interface LatestCommit {
  message: string;
  repoName: string;
  repoUrl: string;
  commitUrl: string;
  isPublic: boolean;
  timestamp: Date;
}

export async function getLatestCommit(): Promise<LatestCommit | null> {
  const token = process.env.GITHUB_PAT;
  const username = process.env.GITHUB_USERNAME ?? 'petter';

  if (!token) {
    console.warn('GITHUB_PAT not set, skipping GitHub commit fetch');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      },
    );

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const rawEvents = (await response.json()) as unknown[];

    // Find the first PushEvent
    let parsed = null;
    for (const event of rawEvents) {
      if (
        typeof event === 'object' &&
        event !== null &&
        'type' in event &&
        event.type === 'PushEvent'
      ) {
        const result = GitHubPushEventSchema.safeParse(event);
        if (result.success) {
          parsed = result.data;
          break;
        }
      }
    }

    if (!parsed) {
      return null;
    }

    // Get commit details - either from the event payload or by fetching the head commit
    let commitMessage: string;
    let commitSha: string;

    if (parsed.payload.commits.length > 0) {
      const latestCommit = parsed.payload.commits.at(-1)!;
      commitMessage = latestCommit.message;
      commitSha = latestCommit.sha;
    } else {
      // Fetch commit details using the head SHA
      const commitResponse = await fetch(
        `https://api.github.com/repos/${parsed.repo.name}/commits/${parsed.payload.head}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          next: { revalidate: 300 },
        },
      );

      if (!commitResponse.ok) {
        return null;
      }

      const commitData = GitHubCommitSchema.parse(await commitResponse.json());
      commitMessage = commitData.commit.message;
      commitSha = commitData.sha;
    }

    // Get the first line of the commit message (title)
    const commitTitle = commitMessage.split('\n')[0];

    return {
      message: commitTitle,
      repoName: parsed.repo.name,
      repoUrl: `https://github.com/${parsed.repo.name}`,
      commitUrl: `https://github.com/${parsed.repo.name}/commit/${commitSha}`,
      isPublic: parsed.public,
      timestamp: new Date(parsed.created_at),
    };
  } catch (error) {
    console.error('Failed to fetch GitHub events:', error);
    return null;
  }
}
