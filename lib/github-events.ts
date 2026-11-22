import { z } from 'zod';

const NonEmptyStringSchema = z.string().trim().min(1);

const EventBaseSchema = z.object({
  public: z.boolean(),
  created_at: z.iso.datetime(),
  repo: z.object({ name: NonEmptyStringSchema }),
});

const PushEventSchema = EventBaseSchema.extend({
  type: z.literal('PushEvent'),
  payload: z.object({ head: NonEmptyStringSchema }),
});

/**
 * GitHub emits the PushEvent for a PR merge late (sometimes hours), so
 * merged PRs count as shipping too. Newer payloads use `action: "merged"`,
 * older ones `action: "closed"` with `pull_request.merged: true`.
 */
const MergedPullRequestEventSchema = EventBaseSchema.extend({
  type: z.literal('PullRequestEvent'),
  payload: z.object({
    action: z.string(),
    pull_request: z.object({
      merged: z.boolean().optional(),
      head: z.object({ sha: NonEmptyStringSchema }),
    }),
  }),
}).refine(
  ({ payload }) =>
    payload.action === 'merged' ||
    (payload.action === 'closed' && payload.pull_request.merged === true),
);

const ShipEventSchema = z.union([
  PushEventSchema,
  MergedPullRequestEventSchema,
]);

export interface ShippedRef {
  repoName: string;
  sha: string;
  isPublic: boolean;
  timestamp: Date;
}

function toShippedRef(event: z.infer<typeof ShipEventSchema>): ShippedRef {
  return {
    repoName: event.repo.name,
    sha:
      event.type === 'PushEvent'
        ? event.payload.head
        : event.payload.pull_request.head.sha,
    isPublic: event.public,
    timestamp: new Date(event.created_at),
  };
}

/**
 * Newest push or merged PR in a `/users/:user/events` response. The API is
 * not strictly ordered by `created_at`, so compare timestamps, not position.
 */
export function latestShippedRef(events: unknown[]): ShippedRef | null {
  let latest: ShippedRef | null = null;
  for (const event of events) {
    const parsed = ShipEventSchema.safeParse(event);
    if (!parsed.success) continue;
    const ref = toShippedRef(parsed.data);
    if (!latest || ref.timestamp > latest.timestamp) latest = ref;
  }
  return latest;
}
