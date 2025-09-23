<script setup lang="ts">
  import type { RepoInfo } from "@/utils/projects";

  import { Icon } from "@iconify/vue";

  import { Box, Stack, Cluster } from "@/components/primitives";
  import { IconText, Badge, LanguagesBar } from "@/components";

  const { repo } = defineProps<{
    repo: RepoInfo;
  }>();

  const smallStats = [
    {
      icon: "lucide:star",
      label: repo.stargazers.toString(),
    },
    {
      icon: "lucide:eye",
      label: repo.watchers.toString(),
    },
    {
      icon: "lucide:git-fork",
      label: repo.forks.toString(),
    },
    {
      icon: "lucide:scale",
      label: repo.license ?? "Unlicensed",
    },
  ];
</script>

<template>
  <Box
    paddingInline="var(--space-m)"
    paddingBlock="var(--space-m)"
  >
    <Stack
      gap="var(--space-m)"
      :class="$style.cardContent"
    >
      <Cluster :class="$style.cardHeader">
        <a
          :class="$style.repoTitle"
          :href="repo.url"
          target="_blank"
        >
          <IconText
            icon="simple-icons:github"
            iconSize="2em"
          >
            <span>
              <span :class="$style.repoTitleText">{{ repo.owner }}/{{ repo.name }}</span>
              <span :class="$style.repoTitleExternalLinkWrapper">
                <Icon
                  icon="lucide:external-link"
                  :class="$style.repoTitleExternalLink"
                />
              </span>
            </span>
          </IconText>
        </a>

        <Cluster :class="$style.repoStatusCluster">
          <Badge
            v-if="repo.owner !== 'dixslyf'"
            fg="var(--repo-collaborator-fg)"
            bg="var(--repo-collaborator-bg)"
            >Collaborator</Badge
          >
          <Badge
            v-if="repo.archived"
            fg="var(--repo-archived-fg)"
            bg="var(--repo-archived-bg)"
            >Archived</Badge
          >
        </Cluster>
      </Cluster>

      <p :class="$style.cardMiddle">
        <template v-if="repo.description">{{ repo.description }}</template>
        <em v-else>No description.</em>
      </p>

      <Stack gap="var(--space-s)">
        <Cluster
          :class="$style.repoSmallStats"
          column-gap="var(--space-m)"
        >
          <IconText
            icon="lucide:link"
            v-if="repo.homepage"
          >
            <a
              :href="repo.homepage"
              target="_blank"
            >
              Website
            </a>
          </IconText>
          <template v-for="{ icon, label } in smallStats">
            <IconText :icon="icon">
              {{ label }}
            </IconText>
          </template>
        </Cluster>
        <LanguagesBar :languages="repo.languages" />
      </Stack>
    </Stack>
  </Box>
</template>

<style module>
  .cardContent {
    height: 100%;
  }

  .cardHeader {
    justify-content: space-between;
  }

  .repoTitle {
    font-weight: 600;
    font-size: var(--type-1);
  }

  .repoTitleText {
    text-decoration: underline;
  }

  .repoTitleExternalLinkWrapper {
    white-space: nowrap;
  }

  .repoTitleExternalLink {
    font-size: 0.8em;
    margin-inline-start: 0.25em;
  }

  .repoStatusCluster {
    align-items: center;
  }

  .cardMiddle {
    flex: 1;
  }

  .repoSmallStats {
    flex: 1;
  }
</style>
