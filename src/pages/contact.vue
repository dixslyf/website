<script setup lang="ts">
  import { onMounted, ref, type Ref, computed } from "vue";
  import { motion } from "motion-v";

  const gridTargetMinWidth = "13rem";

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

  const route = useRoute();
  const slideInDirection = route.meta.inDirection || "left";
</script>

<template>
  <Grid
    :class="$style.contactGrid"
    :targetMinWidth="gridTargetMinWidth"
    gap="var(--space-m)"
  >
    <!-- Not completely sure what's going on, but this transition group is needed.
         Otherwise, there will be an error about WeakMap and null keys. -->
    <TransitionGroup>
      <motion.a
        v-for="(contact, idx) in contactData"
        :key="contact.label"
        :href="typeof contact.href === 'string' ? contact.href : contact.href.value"
        v-bind="slideInProps({ direction: slideInDirection, idx })"
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
      </motion.a>
    </TransitionGroup>
  </Grid>
</template>

<style module>
  .contactGrid {
    margin-top: var(--fluid-h-0-120);

    /* @link https://utopia.fyi/clamp/calculator?a=500,1280,0—320 */
    margin-inline: clamp(0rem, -12.8205rem + 41.0256vw, 20rem);
  }

  .iconText {
    align-items: center;
  }
</style>
