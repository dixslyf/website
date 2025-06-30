<script setup lang="ts">
  import { motion } from "motion-v";

  const { status, data, error } = await useFetch("/api/githubProjects", {
    lazy: true,
  });

  const repos = computed(() => data.value?.repos ?? []);
</script>

<template>
  <div :class="$style.projectsRoot">
    <AnimatePresence mode="wait">
      <Motion
        v-if="status === 'pending'"
        v-bind="fadeProps()"
        asChild
      >
        <Stack :class="$style.topMarginRoot">
          <Center>
            <Spinner />
          </Center>
        </Stack>
      </Motion>
      <Motion
        v-else-if="error"
        v-bind="fadeProps()"
        asChild
      >
        <Stack :class="$style.topMarginRoot">
          <Center :class="$style.errorRoot"> Oh no!<br />Failed to fetch projects! :( </Center>
        </Stack>
      </Motion>
      <Grid
        v-else
        targetMinWidth="30rem"
        gap="var(--space-m)"
      >
        <motion.div
          v-for="(repo, idx) in repos"
          :key="repo.id"
          v-bind="slideInProps({ direction: 'up', idx })"
        >
          <RepoCard
            :repo="repo"
            :class="$style.repoCard"
          />
        </motion.div>
      </Grid>
    </AnimatePresence>
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

  .repoCard {
    height: 100%;
  }
</style>
