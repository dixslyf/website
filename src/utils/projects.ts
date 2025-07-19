import type { Endpoints } from "@octokit/types";
import { Octokit } from "@octokit/rest";
import { DateTime } from "luxon";

type FilteredRepoAttributes =
  | "stargazers_count"
  | "watchers_count"
  | "forks_count"
  | "license"
  | "html_url"
  | "owner"
  | "name"
  | "archived"
  | "description"
  | "homepage";

type RawRepoInfo = Endpoints["GET /users/{username}/repos"]["response"]["data"][number];

export type RepoInfo = Pick<RawRepoInfo, FilteredRepoAttributes> & {
  languages: Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
};

export const DIXSLYF_ID = 56017218;

export function sortGitHubRepos(repoA: RepoInfo, repoB: RepoInfo): number {
  // If A has more stars than B, A should be before B, and vice versa.
  const repoAStars = repoA.stargazers_count ?? 0;
  const repoBStars = repoB.stargazers_count ?? 0;
  const starsDiff = repoAStars - repoBStars;
  if (starsDiff !== 0) {
    return -starsDiff;
  }

  // Same number of stars at this point.

  // A is archived, but not B, so B gets priority.
  if (repoA.archived && !repoB.archived) {
    return 1;
  }

  // B is archived, but not A, so A gets priority.
  if (repoB.archived && !repoA.archived) {
    return -1;
  }

  // Same archival status at this point.

  // Prioritise repos that I own.
  if (repoA.owner.id === DIXSLYF_ID && repoB.owner.id !== DIXSLYF_ID) {
    return -1;
  }

  if (repoB.owner.id === DIXSLYF_ID && repoA.owner.id !== DIXSLYF_ID) {
    return 1;
  }

  return 0;
}

export async function fetchGitHubProjects(): Promise<{
  timestamp: string;
  repos: RepoInfo[];
}> {
  const octokit = new Octokit({
    userAgent: "dixslyf-website",
    request: {
      fetch,
    },
    auth: import.meta.env.GITHUB_TOKEN,
  });

  const res = await octokit.rest.repos.listForUser({
    username: "dixslyf",
    type: "all",
  });

  // Filter out forks and unneeded attributes.
  const rawRepos = res.data
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      license: repo.license,
      html_url: repo.html_url,
      owner: repo.owner,
      name: repo.name,
      archived: repo.archived,
      description: repo.description,
      homepage: repo.homepage,
    }));

  // Fetch languages.
  const repoPromises = rawRepos.map(async (repo) => {
    const res = await octokit.rest.repos.listLanguages({
      owner: repo.owner.login,
      repo: repo.name,
    });
    return { ...repo, languages: res.data } satisfies RepoInfo;
  });

  const repos = (await Promise.all(repoPromises)).sort(sortGitHubRepos);

  const now = DateTime.utc();
  return { timestamp: now.toISO(), repos };
}
