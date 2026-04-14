<script setup lang="ts">
const { t, locale } = useI18n()
const { localizedProfile } = usePortfolioContent()

useSeoMeta({
  title: computed(() => (locale.value === 'es' ? 'Contacto' : 'Contact')),
  description: computed(() => t('contact.subtitle'))
})
</script>

<template>
  <div class="tw-space-y-10">
    <SectionTitle v-reveal :title="t('contact.title')" :subtitle="t('contact.subtitle')" />

    <section v-reveal="{ delay: 100 }" class="tw-grid tw-gap-4 md:tw-grid-cols-2">
      <article class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-6">
        <h2 class="tw-text-sm tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">{{ t('contact.email') }}</h2>
        <a
          class="tw-mt-3 tw-inline-block tw-text-lg tw-font-semibold tw-text-lime-300 hover:tw-underline"
          :href="`mailto:${localizedProfile.contact.email}`"
        >
          {{ localizedProfile.contact.email }}
        </a>
      </article>

      <article class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-6">
        <h2 class="tw-text-sm tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">{{ t('contact.phone') }}</h2>
        <a
          class="tw-mt-3 tw-inline-block tw-text-lg tw-font-semibold tw-text-lime-300 hover:tw-underline"
          :href="`tel:${localizedProfile.contact.phone.replace(/\\s+/g, '')}`"
        >
          {{ localizedProfile.contact.phone }}
        </a>
      </article>

      <article class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-6">
        <h2 class="tw-text-sm tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">{{ t('contact.location') }}</h2>
        <p class="tw-mt-3 tw-text-lg tw-font-semibold tw-text-zinc-100">{{ localizedProfile.location }}</p>
      </article>
    </section>
  </div>
</template>
