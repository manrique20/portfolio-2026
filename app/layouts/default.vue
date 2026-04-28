<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const introLink = 'mailto:jsebastianm45@gmail.com?subject=Portfolio%20intro'
const cvDownload = '/cv/Juan-Sebastian-Manrique-CV.pdf'

const menuOpen = ref(false)

const navItems = computed(() => [
  { key: 'home', label: t('nav.home'), to: localePath('/') },
  { key: 'projects', label: t('nav.projects'), to: localePath('/projects') },
  { key: 'blog', label: t('nav.blog'), to: localePath('/blog') },
  { key: 'experience', label: t('nav.experience'), to: localePath('/experience') },
  { key: 'contact', label: t('nav.contact'), to: localePath('/contact') }
])

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<template>
  <div class="tw-min-h-screen tw-bg-zinc-950 tw-text-zinc-100">
    <div class="tw-mx-auto tw-max-w-6xl tw-px-6 tw-py-8 md:tw-px-10">
      <header class="tw-sticky tw-top-4 tw-z-10 tw-mb-12">
        <div
          class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-950/85 tw-p-4 tw-backdrop-blur"
        >
          <NuxtLink
            :to="localePath('/')"
            class="tw-text-sm tw-font-semibold tw-tracking-[0.25em] tw-text-lime-300 tw-transition hover:tw-text-lime-200"
          >
            JSMG
          </NuxtLink>

          <!-- Desktop nav -->
          <nav class="tw-hidden tw-items-center tw-gap-5 tw-text-sm md:tw-flex">
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

            <!-- Hamburger button (mobile only) -->
            <button
              class="tw-flex tw-h-8 tw-w-8 tw-flex-col tw-items-center tw-justify-center tw-gap-1.5 md:tw-hidden"
              :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
              @click="menuOpen = !menuOpen"
            >
              <span
                class="tw-block tw-h-0.5 tw-w-5 tw-bg-zinc-300 tw-transition-all tw-duration-200"
                :class="menuOpen ? 'tw-translate-y-2 tw-rotate-45' : ''"
              />
              <span
                class="tw-block tw-h-0.5 tw-w-5 tw-bg-zinc-300 tw-transition-all tw-duration-200"
                :class="menuOpen ? 'tw-opacity-0' : ''"
              />
              <span
                class="tw-block tw-h-0.5 tw-w-5 tw-bg-zinc-300 tw-transition-all tw-duration-200"
                :class="menuOpen ? '-tw-translate-y-2 -tw-rotate-45' : ''"
              />
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <Transition
          enter-active-class="tw-transition tw-duration-200 tw-ease-out"
          enter-from-class="tw-opacity-0 -tw-translate-y-2"
          enter-to-class="tw-opacity-100 tw-translate-y-0"
          leave-active-class="tw-transition tw-duration-150 tw-ease-in"
          leave-from-class="tw-opacity-100 tw-translate-y-0"
          leave-to-class="tw-opacity-0 -tw-translate-y-2"
        >
          <nav
            v-if="menuOpen"
            class="tw-mt-2 tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-950/95 tw-p-5 tw-backdrop-blur md:tw-hidden"
          >
            <ul class="tw-space-y-1">
              <li v-for="item in navItems" :key="item.key">
                <NuxtLink
                  :to="item.to"
                  class="tw-block tw-rounded-xl tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-text-zinc-300 tw-transition hover:tw-bg-zinc-800/60 hover:tw-text-white"
                  active-class="tw-text-lime-300"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
            <div class="tw-mt-4 tw-flex tw-flex-col tw-gap-3 tw-border-t tw-border-zinc-800 tw-pt-4">
              <a
                :href="cvDownload"
                download
                class="tw-rounded-full tw-border tw-border-zinc-600 tw-px-4 tw-py-2.5 tw-text-center tw-text-sm tw-font-semibold tw-text-zinc-100 tw-transition hover:tw-border-zinc-300"
              >
                {{ t('nav.cvCta') }}
              </a>
              <a
                :href="introLink"
                class="tw-rounded-full tw-bg-lime-300 tw-px-4 tw-py-2.5 tw-text-center tw-text-sm tw-font-semibold tw-text-zinc-950 tw-transition hover:tw-bg-lime-200"
              >
                {{ t('nav.introCta') }}
              </a>
            </div>
          </nav>
        </Transition>
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
