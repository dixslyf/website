<script lang="ts">
  import "devicon/devicon.min.css";

  type Props = {
    name: string;
    variant?: "original" | "plain" | "line" | "plain-wordmark" | "line-wordmark";
    size?: number;
  };
  const { name, variant, size }: Props = $props();
</script>

<i
  class="devicon-{name}-{variant ? variant : 'plain'}"
  style={size === undefined ? "" : `font-size: ${size}px;`}
></i>
