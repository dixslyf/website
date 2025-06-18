<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { SiGithub, SiGitlab } from "@icons-pack/svelte-simple-icons";
  import { Mail } from "@lucide/svelte";
  import { fly } from "svelte/transition";

  import { Section, Devicon } from "$lib/components";

  const ICON_SIZE = 48;

  let email: string | null = $state(null);
  onMount(() => {
    const EMAIL_B64 = "Y29udGFjdEBkaXhzbHlmLmRldgo=";
    email = atob(EMAIL_B64);
  });
</script>

{#snippet contactBox(index: number, href: string, icon: Snippet, label: string)}
  <a
    {href}
    target="_blank"
    class="contact-box"
    in:fly|global={{ x: "30vw", duration: 500, delay: index * 250 }}
    out:fly|global={{ x: "-30vw", duration: 500 }}
  >
    <Section>
      <div class="contact-content">
        {@render icon()}<span class="label">{label}</span>
      </div>
    </Section>
  </a>
{/snippet}

<div class="root">
  <div class="adaptive-row contact-boxes">
    <!-- This icon boilerplate sucks. -->
    {#snippet githubIcon()}<SiGithub size={ICON_SIZE} />{/snippet}
    {#snippet gitlabIcon()}<SiGitlab size={ICON_SIZE} />{/snippet}
    {#snippet linkedinIcon()}<Devicon name="linkedin" size={ICON_SIZE} />{/snippet}
    {#snippet emailIcon()}<Mail size={ICON_SIZE} />{/snippet}

    {@render contactBox(0, "//github.com/dixslyf", githubIcon, "GitHub")}
    {@render contactBox(1, "//gitlab.com/dixslyf", gitlabIcon, "GitLab")}
    {@render contactBox(2, "//www.linkedin.com/in/dixslyf/", linkedinIcon, "LinkedIn")}
    {@render contactBox(3, `mailto:${email}`, emailIcon, "Email")}
  </div>
</div>

<style>
  .root {
    margin-top: 8px;
  }

  .contact-boxes {
    justify-content: center;
    gap: 16px;

    margin-top: max(0px, calc(50vh - 320px));
  }

  .contact-box {
    width: 120px;
    height: 120px;

    text-decoration: none;
  }

  /*
   * For some reason, the `a` element's underline would still apply to `Devicon`
   * even if we explicitly disable text decorations on the `Devicon`'s `i` element.
   * To work around that, underlines are disabled for `a` and set on `.label` instead.
   */
  .label {
    text-decoration: underline;
  }

  .contact-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
</style>
