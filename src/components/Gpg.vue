<script setup lang="ts">
  import { Box, Stack, Cluster } from "@/components/primitives";

  const keyId = "0xFF5F4B30A41BBAC8";
  const fingerprint = "E6F4BFB48DE3893F68FCA15FFF5F4B30A41BBAC8";

  const keyserverName = "keys.openpgp.org";
  const keyserverUrl = `https://${keyserverName}/`;
  const keyserverFingerprintBase = "https://keys.openpgp.org/vks/v1/by-fingerprint/";

  const keyserverFingerprintUrl = `${keyserverFingerprintBase}${fingerprint}`;

  const stackProps = {
    direction: "row" as const,
    gap: "1ch",
  };
</script>

<template>
  <Box
    paddingInline="var(--space-m)"
    paddingBlock="var(--space-m)"
    label="GPG"
    labelComponent="h1"
  >
    <Stack gap="1em">
      <Stack v-bind="stackProps">
        <strong>Key ID: </strong>
        <span>{{ keyId }}</span>
      </Stack>
      <Stack v-bind="stackProps">
        <strong>Fingerprint: </strong>
        <span>E6F4 BFB4 8DE3 893F 68FC <wbr />A15F FF5F 4B30 A41B BAC8 </span>
      </Stack>
      <Stack v-bind="stackProps">
        <strong>Key type: </strong>
        <span>Ed25519</span>
      </Stack>
      <Stack v-bind="stackProps">
        <strong>Keyserver: </strong>
        <a
          :href="keyserverUrl"
          target="_blank"
        >
          {{ keyserverName }}
        </a>
      </Stack>
      <Stack v-bind="stackProps">
        <strong>Public key: </strong>
        <a
          :href="keyserverFingerprintUrl"
          target="_blank"
        >
          .asc file
        </a>
      </Stack>
    </Stack>
  </Box>
</template>
