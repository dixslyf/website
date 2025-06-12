<script>
  import { Section, Stack } from "$lib/components";
  import { Overview, Education, Technologies } from ".";
</script>

<Stack>
  <div class="adaptive-row">
    <div class="adaptive-cell overview-container">
      <Section title="Overview" style="height: 100%;"><Overview /></Section>
    </div>
    <div class="adaptive-cell education-container">
      <Section title="Education" style="height: 100%;"><Education /></Section>
    </div>
  </div>
  <Section title="Technologies"><Technologies /></Section>
</Stack>

<style>
  .overview-container {
    flex: 15;
  }

  .education-container {
    flex: 8;
  }

  @media screen and (max-width: 1400px) {
    .overview-container {
      flex-grow: 0;
      flex-basis: 100%;
    }

    .education-container {
      flex-grow: 0;
      flex-basis: 100%;
    }

    .adaptive-row {
      flex-wrap: wrap;
    }
  }
</style>
