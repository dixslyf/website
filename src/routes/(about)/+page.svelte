<script>
  import { Section } from "$lib/components";
  import { Overview, Education, Technologies } from ".";
</script>

<div class="root">
  <div class="adaptive-row">
    <div class="adaptive-cell overview-container">
      <Section title="Overview" class="h-full"><Overview /></Section>
    </div>
    <div class="adaptive-cell education-container">
      <Section title="Education" class="h-full"><Education /></Section>
    </div>
  </div>
  <Section title="Technologies"><Technologies /></Section>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .overview-container {
    flex: 15;
  }

  .education-container {
    flex: 8;
  }

  .adaptive-row {
    gap: 8px 16px;
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
