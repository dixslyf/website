<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
