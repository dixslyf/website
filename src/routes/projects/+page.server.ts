import type { PageServerLoad } from "./$types";
import { GITHUB_TOKEN } from "$env/static/private";

import { Octokit } from "@octokit/rest";

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

export const load: PageServerLoad = ({ fetch }) => {
    const octokit = new Octokit({
        userAgent: "dixslyf-website",
        request: {
            fetch,
        },
        auth: GITHUB_TOKEN,
    });

    const reposReq = fetchRepos(octokit);
    reposReq.catch(() => { });

    return {
        repos: reposReq,
    };
};

export const config = {
    isr: {
        // Regenerate every half an hour.
        expiration: 60 * 30,
    },
};
