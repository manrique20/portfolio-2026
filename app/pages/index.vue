<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { localizedProfile, localizedProjects } = usePortfolioContent()

const featuredProjects = computed(() => localizedProjects.value.slice(0, 3))
const workSteps = computed(() => [t('home.workStep1'), t('home.workStep2'), t('home.workStep3')])
const stats = computed(() => [
  { value: 4, suffix: '+', label: t('home.metricYearsLabel') },
  { value: 10000, suffix: '+', label: t('home.metricUsersLabel') },
  { value: localizedProjects.value.length, suffix: '', label: t('home.metricProjectsLabel') }
])

useSeoMeta({
  title: computed(() =>
    locale.value === 'es' ? 'Portafolio de Juan Sebastian Manrique' : 'Juan Sebastian Manrique Portfolio'
  ),
  description: computed(() => localizedProfile.value.summary)
})

useHead(() => ({
  script: [
    {
      key: 'person-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Juan Sebastian Manrique Garcia',
        jobTitle: localizedProfile.value.title,
        email: 'jsebastianm45@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogota',
          addressCountry: 'CO'
        },
        url: 'https://portfolio.local',
        knowsAbout: ['Nuxt', 'Vue', 'TypeScript', 'Frontend Architecture', 'AI Integrations']
      })
    }
  ]
}))
</script>

<template>
  <div class="tw-space-y-24">
    <section
      v-reveal="{ duration: 760, distance: 28 }"
      class="tw-grid tw-gap-8 tw-rounded-3xl tw-border tw-border-zinc-800 tw-bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.14),transparent_50%)] tw-p-7 md:tw-p-10 lg:tw-grid-cols-[1.2fr_0.8fr]"
    >
      <div class="tw-space-y-7">
        <p class="tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.24em] tw-text-lime-300">
          {{ t('home.kicker') }}
        </p>
        <p class="tw-text-sm tw-font-medium tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">
          {{ localizedProfile.location }}
        </p>
        <h1 class="tw-text-4xl tw-font-semibold tw-leading-tight tw-text-white md:tw-text-6xl lg:tw-max-w-3xl">
          {{ localizedProfile.name }}
        </h1>
        <p class="tw-text-2xl tw-font-medium tw-text-zinc-100">
          {{ localizedProfile.title }}
        </p>
        <p class="tw-max-w-2xl tw-text-base tw-leading-relaxed tw-text-zinc-200">
          {{ t('home.heroBlurb') }}
        </p>
        <div class="tw-flex tw-flex-wrap tw-gap-3">
          <NuxtLink
            :to="localePath('/projects')"
            class="tw-rounded-full tw-bg-lime-300 tw-px-5 tw-py-3 tw-text-sm tw-font-semibold tw-text-zinc-950 tw-transition hover:tw-bg-lime-200"
          >
            {{ t('home.projectsCta') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="tw-rounded-full tw-border tw-border-zinc-700 tw-px-5 tw-py-3 tw-text-sm tw-font-semibold tw-text-zinc-100 tw-transition hover:tw-border-zinc-400"
          >
            {{ t('home.contactCta') }}
          </NuxtLink>
        </div>
      </div>

      <aside class="tw-space-y-4 tw-rounded-2xl tw-border tw-border-zinc-700/80 tw-bg-zinc-900/60 tw-p-6">
        <p class="tw-text-sm tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">{{ t('common.role') }}</p>
        <p class="tw-text-lg tw-font-semibold tw-text-white">{{ localizedProfile.title }}</p>
        <div class="tw-grid tw-gap-3">
          <AnimatedNumberStat
            v-for="stat in stats"
            :key="stat.label"
            :to="stat.value"
            :suffix="stat.suffix"
            :label="stat.label"
            :locale="locale"
          />
        </div>
        <p class="tw-text-xs tw-leading-relaxed tw-text-zinc-400">{{ t('home.proofFocus') }}</p>
      </aside>
    </section>

    <section v-reveal="{ delay: 100 }" class="tw-space-y-8">
      <SectionTitle :title="t('home.featuredTitle')" :subtitle="t('home.featuredSubtitle')" />
      <div class="tw-grid tw-gap-5 md:tw-grid-cols-2 xl:tw-grid-cols-3">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.slug"
          :name="project.name"
          :tagline="project.tagline"
          :stack="project.stack"
          :thumbnail="project.thumbnail"
          :thumbnail-position="project.thumbnailPosition"
          :to="localePath(`/projects/${project.slug}`)"
          :cta="t('projects.viewCaseStudy')"
        />
      </div>
    </section>

    <section v-reveal="{ delay: 140 }" class="tw-space-y-6">
      <h2 class="tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-white md:tw-text-4xl">
        {{ t('home.workTitle') }}
      </h2>
      <div class="tw-grid tw-gap-4 md:tw-grid-cols-3">
        <article
          v-for="(step, idx) in workSteps"
          :key="step"
          class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
        >
          <p class="tw-mb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-lime-300">
            0{{ idx + 1 }}
          </p>
          <p class="tw-text-sm tw-leading-relaxed tw-text-zinc-200">{{ step }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
