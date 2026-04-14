<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
const introLink = 'mailto:jsebastianm45@gmail.com?subject=Portfolio%20intro'
const cvDownload = '/cv/Juan-Sebastian-Manrique-CV.pdf'

const navItems = computed(() => [
  { key: 'home', label: t('nav.home'), to: localePath('/') },
  { key: 'projects', label: t('nav.projects'), to: localePath('/projects') },
  { key: 'blog', label: t('nav.blog'), to: localePath('/blog') },
  { key: 'experience', label: t('nav.experience'), to: localePath('/experience') },
  { key: 'contact', label: t('nav.contact'), to: localePath('/contact') }
])
</script>

<template>
  <div class="tw-min-h-screen tw-bg-zinc-950 tw-text-zinc-100">
    <div class="tw-mx-auto tw-max-w-6xl tw-px-6 tw-py-8 md:tw-px-10">
      <header
        class="tw-sticky tw-top-4 tw-z-10 tw-mb-12 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-950/85 tw-p-4 tw-backdrop-blur"
      >
        <NuxtLink
          :to="localePath('/')"
          class="tw-text-sm tw-font-semibold tw-tracking-[0.25em] tw-text-lime-300 tw-transition hover:tw-text-lime-200"
        >
          JSMG
        </NuxtLink>
        <nav class="tw-flex tw-items-center tw-gap-5 tw-text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="item.to"
            class="tw-text-zinc-300 tw-transition hover:tw-text-white"
            active-class="tw-text-lime-300"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="tw-flex tw-items-center tw-gap-3">
          <a
            :href="cvDownload"
            download
            class="tw-hidden tw-rounded-full tw-border tw-border-zinc-600 tw-px-4 tw-py-2 tw-text-xs tw-font-semibold tw-text-zinc-100 hover:tw-border-zinc-300 md:tw-inline-flex"
          >
            {{ t('nav.cvCta') }}
          </a>
          <a
            :href="introLink"
            class="tw-hidden tw-rounded-full tw-bg-lime-300 tw-px-4 tw-py-2 tw-text-xs tw-font-semibold tw-text-zinc-950 hover:tw-bg-lime-200 md:tw-inline-flex"
          >
            {{ t('nav.introCta') }}
          </a>
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <slot />
      </main>

      <footer class="tw-mt-20 tw-border-t tw-border-zinc-800 tw-pt-6 tw-text-xs tw-text-zinc-500">
        <p>{{ new Date().getFullYear() }} - Juan Sebastian Manrique Garcia</p>
      </footer>
    </div>
  </div>
</template>
