<script setup lang="ts">
  import { h, onMounted, ref, type Ref, type Component, computed } from "vue";

  import { GitHubIcon, GitLabIcon } from "vue3-simple-icons";
  import { Mail } from "lucide-vue-next";

  import { Devicon, LucideWrapper } from "@/components";
  import { Grid, Stack, Box } from "@/components/primitives";

  const gridTargetMinWidth = "12rem";

  // Basic email obfuscation to prevent scrapers from getting my email address.
  let email: Ref<string | null> = ref(null);
  onMounted(() => {
    const EMAIL_B64 = "Y29udGFjdEBkaXhzbHlmLmRldgo=";
    email.value = atob(EMAIL_B64);
  });

  const size = "2.5em";
  const contactData: Array<{
    href: string | Ref<string>;
    label: string;
    icon: Component;
  }> = [
    {
      href: "//github.com/dixslyf",
      label: "GitHub",
      icon: h(GitHubIcon, { size }),
    },
    {
      href: "//gitlab.com/dixslyf",
      label: "GitLab",
      icon: h(GitLabIcon, { size }),
    },
    {
      href: "//www.linkedin.com/in/dixslyf/",
      label: "LinkedIn",
      icon: h(Devicon, { icon: "linkedin", size }),
    },
    {
      href: computed(() => `mailto:${email.value}`),
      label: "Email",
      icon: h(LucideWrapper, { size }, [h(Mail)]),
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
          <component :is="contact.icon" />
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
