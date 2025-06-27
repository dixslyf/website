import { Octokit } from "@octokit/rest";

import { sortRepos } from "@/utils/repos";

async function fetchRepos(octokit: Octokit) {
  const res = await octokit.rest.repos.listForUser({
    username: "dixslyf",
    type: "all",
  });

  // Filter out forks.
  const repos = res.data.filter((repo) => !repo.fork);

  // Fetch languages.
  const reposLangs = repos.map(async (repo) => {
    const res = await octokit.rest.repos.listLanguages({
      owner: repo.owner.login,
      repo: repo.name,
    });
    return { ...repo, languages: res.data };
  });

  return Promise.all(reposLangs);
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const octokit = new Octokit({
    userAgent: "dixslyf-website",
    request: {
      fetch,
    },
    auth: runtimeConfig.githubToken,
  });

  const repos = (await fetchRepos(octokit)).sort(sortRepos);
  return {
    repos,
  };
});
