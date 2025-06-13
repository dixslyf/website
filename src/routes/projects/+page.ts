import type { PageLoad } from "./$types";

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    userAgent: "dixslyf-website",
});

export const load: PageLoad = () => {
    const reposReq = octokit.rest.repos
        .listForUser({
            username: "dixslyf",
            type: "all",
        })
        .then(async (res) => {
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
        });

    reposReq.catch(() => { });
    return {
        repos: reposReq,
    };
};
