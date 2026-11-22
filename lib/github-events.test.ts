import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { latestShippedRef } from './github-events';

const push = (created_at: string, head: string, repo = 'petter/a') => ({
  type: 'PushEvent',
  public: true,
  created_at,
  repo: { name: repo },
  payload: { head },
});

const pr = (
  created_at: string,
  sha: string,
  action: string,
  merged?: boolean,
) => ({
  type: 'PullRequestEvent',
  public: true,
  created_at,
  repo: { name: 'petter/b' },
  payload: { action, pull_request: { merged, head: { sha } } },
});

describe('latestShippedRef', () => {
  it('picks a merged PR newer than the last push event', () => {
    const ref = latestShippedRef([
      pr('2026-11-22T00:13:10Z', 'merged-sha', 'merged'),
      push('2026-11-21T21:38:37Z', 'push-sha'),
    ]);
    assert.equal(ref?.sha, 'merged-sha');
    assert.equal(ref?.repoName, 'petter/b');
  });

  it('compares timestamps instead of trusting list order', () => {
    const ref = latestShippedRef([
      push('2026-11-21T20:00:00Z', 'older'),
      push('2026-11-21T21:00:00Z', 'newer'),
    ]);
    assert.equal(ref?.sha, 'newer');
  });

  it('accepts the legacy closed+merged PR shape', () => {
    const ref = latestShippedRef([
      pr('2026-11-21T20:00:00Z', 'x', 'closed', true),
    ]);
    assert.equal(ref?.sha, 'x');
  });

  it('ignores opened and closed-unmerged PRs and other events', () => {
    const ref = latestShippedRef([
      pr('2026-11-22T00:11:27Z', 'opened', 'opened'),
      pr('2026-11-22T00:12:00Z', 'closed', 'closed', false),
      { type: 'CreateEvent', created_at: '2026-11-22T00:13:00Z' },
      push('2026-11-21T21:38:37Z', 'push-sha'),
    ]);
    assert.equal(ref?.sha, 'push-sha');
  });

  it('returns null when nothing shipped', () => {
    assert.equal(latestShippedRef([]), null);
  });
});
