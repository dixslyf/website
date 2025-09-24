import { graphql } from "@octokit/graphql";
import { DateTime } from "luxon";

// Ref: https://github.com/octokit/graphql-schema/blob/main/schema.d.ts
type ReposResponse = {
  user: {
    repositories: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      nodes: {
        id: string;
        stargazerCount: number;
        watchers: { totalCount: number };
        forkCount: number;
        languages: {
          edges:
            | {
                node: {
                  name: string;
                  color: string;
                };
                size: number;
              }[]
            | null;
        } | null;
        licenseInfo: { name: string } | null;
        url: string;
        owner: { login: string };
        name: string;
        isArchived: boolean;
        description: string | null;
        homepageUrl: string | null;
      }[];
    };
  };
};

type PinnedReposResponse = {
  user: {
    pinnedItems: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      nodes: {
        __typename: string;
        id: string;
      }[];
    };
  };
};

type RepoInfo = {
  id: string;
  stargazers: number;
  watchers: number;
  forks: number;
  license: string | null;
  url: string;
  owner: string;
  name: string;
  archived: boolean;
  description: string | null;
  homepage: string | null;
  pinned: boolean;
  languages: {
    [key: string]: number;
  } | null;
};

export const DIXSLYF_LOGIN = "dixslyf";

const queryGitHub = graphql.defaults({
  headers: {
    authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
  },
});

async function queryRepos(): Promise<Omit<RepoInfo, "pinned">[]> {
  let hasNextPage = true;
  let cursor = null;
  const rawRepos = [];
  let reqCount = 0;

  // `reqCount` is there as a safeguard to prevent spamming requests
  // in case something unexpectedly goes wrong. I'll probably never reach
  // 1,000 public repositories.
  while (hasNextPage && reqCount < 10) {
    const res: ReposResponse = await queryGitHub<ReposResponse>(
      `
      query repos($after: String) {
        user(login: "dixslyf") {
          repositories(ownerAffiliations: [OWNER, COLLABORATOR], visibility: PUBLIC, isFork: false, first: 100, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              stargazerCount
              watchers { totalCount }
              forkCount
              languages(first: 100) {
                edges {
                  node {
                    name
                    color
                  }
                  size
                }
              }
              licenseInfo { name }
              url
              owner { login }
              name
              isArchived
              description
              homepageUrl
            }
          }
        }
      }`,
      {
        after: cursor,
      },
    );

    rawRepos.push(...res.user.repositories.nodes);
    hasNextPage = res.user.repositories.pageInfo.hasNextPage;
    cursor = res.user.repositories.pageInfo.endCursor;
    reqCount += 1;
  }

  return rawRepos.map(
    (rawRepo) =>
      ({
        id: rawRepo.id,
        stargazers: rawRepo.stargazerCount,
        watchers: rawRepo.watchers.totalCount,
        forks: rawRepo.forkCount,
        license: rawRepo.licenseInfo?.name ?? null,
        url: rawRepo.url,
        owner: rawRepo.owner.login,
        name: rawRepo.name,
        archived: rawRepo.isArchived,
        description: rawRepo.description,
        homepage: rawRepo.homepageUrl,
        languages: rawRepo.languages?.edges
          ? Object.fromEntries(
              rawRepo.languages.edges.map((langInfo) => [langInfo.node.name, langInfo.size]),
            )
          : null,
      }) satisfies Omit<RepoInfo, "pinned">,
  );
}

async function queryPinnedRepos(): Promise<Set<string>> {
  let hasNextPage = true;
  let cursor = null;
  const pinnedRepos = [];
  let reqCount = 0;

  while (hasNextPage && reqCount < 10) {
    const res: PinnedReposResponse = await queryGitHub<PinnedReposResponse>(
      `
      query pinnedRepos($after: String) {
        user(login: "dixslyf") {
          pinnedItems(first: 100, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              __typename
              ... on Repository {
                id
              }
            }
          }
        }
      }`,
      {
        after: cursor,
      },
    );

    pinnedRepos.push(...res.user.pinnedItems.nodes);
    hasNextPage = res.user.pinnedItems.pageInfo.hasNextPage;
    cursor = res.user.pinnedItems.pageInfo.endCursor;
    reqCount += 1;
  }

  return new Set(pinnedRepos.map((node) => node.id));
}

function sortGitHubRepos(repoA: RepoInfo, repoB: RepoInfo): number {
  // Check pinned status.

  // A is pinned, but not B.
  if (repoA.pinned && !repoB.pinned) {
    return -1;
  }

  // A is pinned, but not B.
  if (!repoA.pinned && repoB.pinned) {
    return 1;
  }

  // Pin statuses are equal at this point.

  // If A has more stars than B, A should be before B, and vice versa.
  const repoAStars = repoA.stargazers ?? 0;
  const repoBStars = repoB.stargazers ?? 0;
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
  if (repoA.owner === DIXSLYF_LOGIN && repoB.owner !== DIXSLYF_LOGIN) {
    return -1;
  }

  if (repoB.owner === DIXSLYF_LOGIN && repoA.owner !== DIXSLYF_LOGIN) {
    return 1;
  }

  return 0;
}

export async function fetchGitHubProjects(): Promise<{
  timestamp: string;
  repos: RepoInfo[];
}> {
  const rawRepos = await queryRepos();

  const pinnedRepoIds = await queryPinnedRepos();
  const unsortedRepos = rawRepos.map(
    (r) => ({ pinned: pinnedRepoIds.has(r.id), ...r }) satisfies RepoInfo,
  );

  const repos: RepoInfo[] = unsortedRepos.sort(sortGitHubRepos);

  const now = DateTime.utc();
  return { timestamp: now.toISO(), repos };
}
