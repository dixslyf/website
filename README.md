# dixslyf's Website

This repository contains the source code for my personal website: [dixslyf.dev](https://dixslyf.dev).
The website is built with Vite and Svelte 5 / SvelteKit.

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
If the `GITHUB_TOKEN` environment variable is set, it will be passed to Octokit for authentication
(authenticated requests have higher rate limits).

Environment variables can be specified in a `.env` or `.env.local` file.

## Deployment

The website is currently hosted on Vercel.

Note that the `/projects` route uses incremental static regeneration (ISR) with a 30-minute expiration time.
That is, every 30 minutes, its server-side code is run to fetch my projects from the GitHub REST API,
after which the page is pre-rendered with the fetched data and served statically.
