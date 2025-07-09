# dixslyf's Website

This repository contains the source code for my personal website ([dixslyf.dev](https://www.dixslyf.dev)),
built with [Astro](https://astro.build/) and [Vue.js](https://vuejs.org/).

## Developing and Building

This project uses [`pnpm`](https://pnpm.io/) for package management.

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

To fetch information about my projects, the site uses Octokit for querying the GitHub REST API.
If the `GITHUB_TOKEN` environment variable is set, it is passed to Octokit for authentication
(authenticated requests have more generous rate limits).

Environment variables can be specified in a `.env` file.

## Deployment

The website is currently hosted on Vercel.

It also uses [incremental static regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration)
with a 60-minute expiration time to avoid excessive calls to the GitHub REST API.

## History

This site served as a guinea pig for trying out different web frameworks.
Over time, it has been rebuilt using the following technologies and frameworks
(chronological order):

1. Svelte 5 + SvelteKit (initial version)

1. Vue.js + Nuxt

1. Vue.js + Vike

1. Vue.js + Astro (current)
