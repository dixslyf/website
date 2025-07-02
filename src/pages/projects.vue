<script setup lang="ts">
  import { motion } from "motion-v";
  import ms from "ms";

  const { status, data, error } = await useFetch("/api/githubProjects");

  const repos = computed(() => data.value?.repos ?? []);

  const generatedAt = useState(() => new Date().toISOString());
  const date = new Date(generatedAt.value);
  const timeAgo = ref();
  onMounted(() => {
    timeAgo.value = ms(Date.now() - date.valueOf(), { long: true });
  });
</script>

<template>
  <span>
    <strong v-if="timeAgo">Page last updated at: {{ timeAgo }} ago</strong>
    <br />
    <strong v-if="data?.fetchedAt">Repos last fetched at: {{ data.fetchedAt }}</strong>
  </span>
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
