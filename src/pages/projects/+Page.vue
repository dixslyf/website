<script setup lang="ts">
  import { useData } from "vike-vue/useData";

  import { motion } from "motion-v";

  import type { Data } from "./+data";
  import { Grid } from "@/components/primitives";
  import { RepoCard } from "@/components";
  import { slideInProps } from "@/utils/animations";

  const { repos } = useData<Data>();
</script>

<template>
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
</template>

<style module>
  .repoCardWrapper {
    /* For making the repo card take the full size of the wrapper. */
    display: grid;
  }
</style>
