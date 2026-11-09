# Donation Board

Next.js pages for the donations feature: browse available donations (`/`) and post a donation (`/new`). Owners see Edit and Delete on their own cards.

## Environment variables

| Name | Purpose |
|---|---|
| `DONATION_API_URL` | donation service `/graphql` URL, used by server components |
| `NEXT_PUBLIC_DONATION_API_URL` | the same URL, used by browser code |

`NEXT_PUBLIC_` values are baked in at build time, so redeploy after changing them.

## How login works

The board reads the login token that Fork Find stores in `localStorage` and sends it to the donation service as `Authorization: Bearer <token>`. In production the board is served under Fork Find's own domain at `/donations` (a rewrite in `frontend/vercel.json`), so both share one origin and one login.

## Run locally

```bash
npm install
npm run dev -- -p 3001
```

Open http://localhost:3001/donations (the base path is `/donations`). Locally, set a token first in the browser console: `localStorage.setItem("token", "<token from a Fork Find login>")`.

## Deploy

Its own Vercel project with root directory `donation-board`.
