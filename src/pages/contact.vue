<script setup lang="ts">
  import { onMounted, ref, type Ref, computed } from "vue";

  const gridTargetMinWidth = "12rem";

  // Basic email obfuscation to prevent scrapers from getting my email address.
  let email: Ref<string | null> = ref(null);
  onMounted(() => {
    const EMAIL_B64 = "Y29udGFjdEBkaXhzbHlmLmRldgo=";
    email.value = atob(EMAIL_B64);
  });

  const contactData: Array<{
    href: string | Ref<string>;
    label: string;
    icon: string;
  }> = [
    {
      href: "//github.com/dixslyf",
      label: "GitHub",
      icon: "simple-icons:github",
    },
    {
      href: "//gitlab.com/dixslyf",
      label: "GitLab",
      icon: "simple-icons:gitlab",
    },
    {
      href: "//www.linkedin.com/in/dixslyf/",
      label: "LinkedIn",
      icon: "devicon-plain:linkedin",
    },
    {
      href: computed(() => `mailto:${email.value}`),
      label: "Email",
      icon: "lucide:mail",
    },
  ];
</script>

<template>
  <Grid
    :class="$style.contactGrid"
    :targetMinWidth="gridTargetMinWidth"
    gap="var(--space-m)"
  >
    <a
      v-for="contact in contactData"
      :href="typeof contact.href === 'string' ? contact.href : contact.href.value"
      target="_blank"
    >
      <Box
        paddingBlock="var(--space-m)"
        paddingInline="var(--space-m)"
      >
        <Stack
          :class="$style.iconText"
          gap="var(--space-xs)"
        >
          <Icon
            :name="contact.icon"
            size="2.5em"
          />
          <span>{{ contact.label }}</span>
        </Stack>
      </Box>
    </a>
  </Grid>
</template>

<style module>
  .contactGrid {
    margin-top: var(--fluid-h-0-120);
    margin-inline: var(--fluid-0-180);
  }

  .iconText {
    align-items: center;
  }
</style>
