# My Personal Blog

## Environment Variables

| Variable                                | Required | Description                                                                                                                                    |
| --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_PAT`                            | No       | GitHub Personal Access Token for fetching latest commits. Without this, the "currently working on" section won't appear on the homepage.       |
| `GITHUB_USERNAME`                       | No       | GitHub username to fetch events for. Defaults to `petter`.                                                                                     |
| `LOCATION_SECRET`                       | No       | Bearer token the iPhone Shortcut sends to `POST /api/location`. Generate with `openssl rand -base64 32`.                                       |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | No       | Upstash Redis REST credentials (set automatically when an Upstash store is linked in Vercel). Without them the homepage falls back to Toronto. |

### GitHub PAT Setup

To show your latest commits on the homepage:

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Generate a new token with `read:user` scope (for accessing your public activity) and `repo` scope (for accessing private repo names)
3. Set `GITHUB_PAT` in your environment or `.env.local` file

### Current city ("grab a coffee?")

The homepage shows where I am and invites visitors to reach out. Visitors near me (≤50 km, from Vercel IP geolocation headers) get "Grab a coffee?"; everyone else gets "How about a chat?". Visitor location is only used to pick the copy and is never stored. Updates older than 72 h fall back to Toronto.

Update the location from an iPhone Shortcut:

1. **Get Current Location**
2. **Get Details of Locations** for City, Country, ISO Country Code, Latitude, Longitude
3. **Get Contents of URL** `https://www.pmoen.me/api/location`
   - Method `POST`, header `Authorization: Bearer <LOCATION_SECRET>`
   - Request body JSON: `city`, `country`, `countryCode`, `lat`, `lon` (optional `visible: false` to hide and show Toronto)

Personal Automations (set to Run Immediately): **Airplane Mode → turned off** (catches landings) and **Time of Day → 09:00 daily**.

Coordinates are rounded to ~11 km before storing. Test locally with `?geo=<lat>,<lon>,<countryCode>`, e.g. `/?geo=59.91,10.75,NO` (ignored in production).
