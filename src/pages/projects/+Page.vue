<script setup lang="ts">
  import { computed } from "vue";

  import { useData } from "vike-vue/useData";

  import { DateTime } from "luxon";
  import { motion } from "motion-v";

  import type { Data } from "./+data";
  import { Stack, Grid } from "@/components/primitives";
  import { RepoCard } from "@/components";
  import { slideInProps } from "@/utils/animations";

  const { timestamp, repos } = useData<Data>();
  const timestampF = computed(() => {
    const dt = DateTime.fromISO(timestamp, { zone: "UTC" });
    return dt.toFormat("d MMMM yyyy 'at' TTT");
  });
</script>

<template>
  <Stack>
    <span>Last updated: {{ timestampF }} </span>
    <Grid
      targetMinWidth="30rem"
      gap="var(--space-m)"
    >
      <motion.div
        v-for="(repo, idx) in repos"
        :key="repo.id"
        v-bind="slideInProps({ direction: 'up', idx })"
        :class="$style.repoCardWrapper"
      >
        <RepoCard :repo="repo" />
      </motion.div>
    </Grid>
  </Stack>
</template>

<style module>
  .repoCardWrapper {
    /* For making the repo card take the full size of the wrapper. */
    display: grid;
  }
</style>
