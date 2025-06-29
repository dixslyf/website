<script setup lang="ts">
  const { status, data, error } = await useFetch("/api/githubProjects", {
    lazy: true,
  });

  const repos = computed(() => data.value?.repos ?? []);
</script>

<template>
  <div :class="$style.projectsRoot">
    <Stack
      v-if="status === 'pending'"
      :class="$style.topMarginRoot"
    >
      <Center>
        <Spinner />
      </Center>
    </Stack>
    <Stack
      v-else-if="error"
      :class="$style.topMarginRoot"
    >
      <Center :class="$style.errorRoot"> Oh no!<br />Failed to fetch projects! :( </Center>
    </Stack>
    <Grid
      v-else
      targetMinWidth="30rem"
      gap="var(--space-m)"
    >
      <RepoCard
        v-for="repo in repos"
        :key="repo.id"
        :repo="repo"
      />
    </Grid>
  </div>
</template>

<style module>
  .topMarginRoot {
    min-height: 35vh;
    justify-content: flex-end;
  }

  .errorRoot {
    text-align: center;
    font-size: var(--type-2);
  }
</style>
