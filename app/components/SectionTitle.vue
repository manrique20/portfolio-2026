<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <header class="tw-max-w-3xl tw-space-y-4">
    <h2 class="tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-white md:tw-text-4xl">
      {{ title }}
    </h2>
    <p class="tw-text-base tw-leading-relaxed tw-text-zinc-300">
      {{ subtitle }}
    </p>
  </header>
</template>
