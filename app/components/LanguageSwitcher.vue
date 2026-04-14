<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
]
</script>

<template>
  <div class="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-border tw-border-zinc-700 tw-p-1">
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-transition"
      :class="
        locale === item.code
          ? 'tw-bg-lime-300 tw-text-zinc-950'
          : 'tw-text-zinc-300 hover:tw-bg-zinc-800 hover:tw-text-white'
      "
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>
