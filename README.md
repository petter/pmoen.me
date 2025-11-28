# My Personal Blog

## Environment Variables

| Variable          | Required | Description                                                                                                                              |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_PAT`      | No       | GitHub Personal Access Token for fetching latest commits. Without this, the "currently working on" section won't appear on the homepage. |
| `GITHUB_USERNAME` | No       | GitHub username to fetch events for. Defaults to `petter`.                                                                               |

### GitHub PAT Setup

To show your latest commits on the homepage:

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Generate a new token with `read:user` scope (for accessing your public activity) and `repo` scope (for accessing private repo names)
3. Set `GITHUB_PAT` in your environment or `.env.local` file
