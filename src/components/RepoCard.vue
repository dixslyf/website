<script setup lang="ts">
  const { repo } = defineProps<{
    repo: RepoInfo;
  }>();

  const smallStats = [
    {
      icon: "lucide:star",
      label: (repo.stargazers_count ?? 0).toString(),
    },
    {
      icon: "lucide:eye",
      label: (repo.watchers_count ?? 0).toString(),
    },
    {
      icon: "lucide:git-fork",
      label: (repo.forks_count ?? 0).toString(),
    },
    {
      icon: "lucide:scale",
      label: repo.license?.name ?? "Unlicensed",
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
          :href="repo.html_url"
          target="_blank"
        >
          <IconText
            icon="simple-icons:github"
            iconSize="2em"
          >
            {{ repo.owner.login }}/{{ repo.name }}
          </IconText>
        </a>

        <Cluster>
          <Badge v-if="repo.owner.login !== 'dixslyf'">Collaborator</Badge>
          <Badge v-if="repo.archived">Archived</Badge>
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
    font-weight: 500;
    font-size: var(--type-1);
  }

  .cardMiddle {
    flex: 1;
  }

  .repoSmallStats {
    flex: 1;
  }
</style>
