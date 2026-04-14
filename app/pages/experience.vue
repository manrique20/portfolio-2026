<script setup lang="ts">
const { t, locale } = useI18n()
const { localizedExperience, localizedSkillGroups } = usePortfolioContent()

useSeoMeta({
  title: computed(() => (locale.value === 'es' ? 'Experiencia' : 'Experience')),
  description: computed(() => t('experience.subtitle'))
})
</script>

<template>
  <div class="tw-space-y-12">
    <SectionTitle v-reveal :title="t('experience.title')" :subtitle="t('experience.subtitle')" />

    <section v-reveal="{ delay: 90 }" class="tw-space-y-5">
      <article
        v-for="item in localizedExperience"
        :key="`${item.company}-${item.period}`"
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-6"
      >
        <div class="tw-flex tw-flex-wrap tw-items-baseline tw-justify-between tw-gap-2">
          <h2 class="tw-text-xl tw-font-semibold tw-text-white">{{ item.company }}</h2>
          <span class="tw-text-sm tw-text-zinc-400">{{ item.period }}</span>
        </div>
        <p class="tw-mt-2 tw-text-zinc-200">{{ item.role }}</p>
        <ul class="tw-mt-4 tw-space-y-2 tw-text-zinc-300">
          <li v-for="highlight in item.highlights" :key="highlight">- {{ highlight }}</li>
        </ul>
      </article>
    </section>

    <section v-reveal="{ delay: 150 }" class="tw-space-y-4">
      <h2 class="tw-text-2xl tw-font-semibold tw-text-white">{{ t('experience.skillsTitle') }}</h2>
      <div class="tw-grid tw-gap-4 md:tw-grid-cols-3">
        <article
          v-for="group in localizedSkillGroups"
          :key="group.title"
          class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
        >
          <h3 class="tw-mb-3 tw-font-semibold tw-text-zinc-100">{{ group.title }}</h3>
          <p class="tw-text-sm tw-leading-relaxed tw-text-zinc-300">{{ group.items.join(' • ') }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
