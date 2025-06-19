<script lang="ts">
  import type { PageProps } from "./$types";
  import type { Endpoints } from "@octokit/types";
  import { Star, Scale, GitFork, Eye } from "@lucide/svelte";
  import { SiGithub } from "@icons-pack/svelte-simple-icons";

  import { Section, LanguagesBar, IconText } from "$lib/components";
  import type { Component } from "svelte";
  import { fly } from "svelte/transition";

  type RepoInfo = Endpoints["GET /users/{username}/repos"]["response"]["data"][number] & {
    languages: Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
  };

  const DIXSLYF_ID = 56017218;

  const { data }: PageProps = $props();

  function sortRepos(repoA: RepoInfo, repoB: RepoInfo): number {
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
</script>

{#snippet repoCard(repo: RepoInfo)}
  <Section class="h-full mt-[8px]">
    <div class="card-content">
      <div class="card-header">
        <a class="repo-title" href={repo.html_url} target="_blank">
          <div class="card-header-icon"><SiGithub /></div>
          {repo.owner.login}/{repo.name}</a
        >

        <div class="repo-tags">
          {#if repo.owner.login !== "dixslyf"}<div
              class="badge bg-(--ctp-macchiato-mauve) text-(--ctp-macchiato-base)"
            >
              Collaborator
            </div>{/if}
          {#if repo.archived}<div
              class="badge bg-(--ctp-macchiato-peach) text-(--ctp-macchiato-base)"
            >
              Archived
            </div>{/if}
        </div>
      </div>

      <div class="card-middle">
        <div>
          {#if repo.description}{repo.description}{:else}<em>No description.</em>{/if}
        </div>
      </div>

      <div class="card-footer">
        <div class="repo-small-stats">
          {#snippet smallStat(iconComponent: { component: Component }, label: string)}
            {#snippet icon()}<iconComponent.component></iconComponent.component>{/snippet}
            <IconText
              --bg="none"
              --icon-color="none"
              --padding="0"
              --font-size="0.9em"
              {icon}
              {label}
            />
          {/snippet}

          {@render smallStat({ component: Star }, (repo.stargazers_count ?? 0).toString())}
          {@render smallStat({ component: Eye }, (repo.watchers_count ?? 0).toString())}
          {@render smallStat({ component: GitFork }, (repo.forks_count ?? 0).toString())}
          {@render smallStat({ component: Scale }, repo.license?.name ?? "Unlicensed")}
        </div>
        <div class="repo-languages">
          <LanguagesBar languages={repo.languages} />
        </div>
      </div>
    </div>
  </Section>
{/snippet}

{#await data.repos}
  waiting...
{:then repos}
  <div class="root">
    {#each repos.sort(sortRepos) as repo, idx (repo.id)}
      <div
        in:fly|global={{ x: "30vw", duration: 500, delay: idx * 250 }}
        out:fly|global={{ x: "-30vw", duration: 500 }}
      >
        {@render repoCard(repo)}
      </div>
    {/each}
  </div>
{:catch error}
  something went wrong: {error}
{/await}

<style>
  .root {
    display: grid;
    gap: 16px;
  }

  @media (min-width: 1200px) {
    .root {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: 100%;
    width: 100%;
  }

  .card-header {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  .card-header-icon {
    display: flex;
    margin-right: 0.5em;
  }

  .repo-title {
    display: flex;
    flex-direction: row;
    align-items: center;

    flex: 1;

    font-weight: bold;
    font-size: 1.2em;
  }

  .card-middle {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card-footer {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .repo-small-stats {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;

    flex: 1;
  }

  .repo-tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .repo-languages {
    display: flex;
    flex-direction: column;
  }

  .badge {
    border-radius: 16px;
    padding: 4px 12px;
    font-size: 0.9em;
  }
</style>
