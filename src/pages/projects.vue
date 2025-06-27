<script setup lang="ts">
  const { status, data, error } = await useFetch("/api/githubProjects", {
    lazy: true,
  });

  const repos = computed(() => data.value?.repos ?? []);
</script>

<template>
  <Center
    v-if="status === 'pending'"
    :class="$style.spinnerRoot"
  >
    <Spinner />
  </Center>
  <div
    v-else-if="error"
    :class="$style.errorRoot"
  >
    Oh no!<br />Failed to fetch projects! :(
  </div>
  <Grid
    v-else
    targetMinWidth="24rem"
    gap="var(--space-m)"
  >
    <RepoCard
      v-for="repo in repos"
      :key="repo.id"
      :repo="repo"
    />
  </Grid>
</template>

<style module>
  .spinnerRoot {
    margin-top: var(--fluid-h-0-240);
  }

  .errorRoot {
    text-align: center;
    font-size: var(--type-1);
    margin-top: var(--fluid-h-0-240);
  }
</style>
