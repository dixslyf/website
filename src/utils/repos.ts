import type { Endpoints } from "@octokit/types";

export type RepoInfo = Endpoints["GET /users/{username}/repos"]["response"]["data"][number] & {
  languages: Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
};

export const DIXSLYF_ID = 56017218;

export function sortRepos(repoA: RepoInfo, repoB: RepoInfo): number {
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
