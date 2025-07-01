# dixslyf's Website

This repository contains the source code for my personal website ([dixslyf.dev](https://dixslyf.dev)),
built with Vue.js + Nuxt.

## Developing and Building

This project uses `pnpm` for package management.

To run the development server, run:

```bash
pnpm run dev
```

To build for production, run:

```bash
pnpm run build
```

To preview the production build, run:

```bash
pnpm run preview
```

## Environment Variables

To fetch information about my projects, the server-side code uses Octokit to query the GitHub REST API.
If the `NUXT_GITHUB_TOKEN` environment variable is set, it is passed to Octokit for authentication
(authenticated requests have more generous rate limits).

Environment variables can be specified in a `.env` file.

## Deployment

The website is currently hosted on Vercel.

The `/projects` route uses incremental static regeneration (ISR) with a 60-minute expiration time —
every hour, server-side code is run to fetch my projects through the GitHub REST API,
after which the page is pre-rendered with the fetched data and served statically.
