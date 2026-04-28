<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { localizedProfile, localizedProjects } = usePortfolioContent()
const { public: { siteUrl } } = useRuntimeConfig()

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
        url: siteUrl,
        knowsAbout: ['Nuxt', 'Vue', 'TypeScript', 'Frontend Architecture', 'AI Integrations']
      })
    }
  ]
}))
</script>

<template>
  <div class="home">
    <section v-reveal="{ duration: 760, distance: 28 }" class="hero">
      <MeteorBackground />
      <div class="hero__content">
        <p class="hero__kicker">{{ t('home.kicker') }}</p>
        <p class="hero__location">{{ localizedProfile.location }}</p>
        <h1 class="hero__name">{{ localizedProfile.name }}</h1>
        <p class="hero__role-title">{{ localizedProfile.title }}</p>
        <p class="hero__blurb">{{ t('home.heroBlurb') }}</p>
        <div class="hero__actions">
          <NuxtLink :to="localePath('/projects')" class="btn-primary">
            {{ t('home.projectsCta') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-ghost">
            {{ t('home.contactCta') }}
          </NuxtLink>
        </div>
      </div>

      <aside class="hero__aside">
        <p class="hero__label">{{ t('common.role') }}</p>
        <p class="hero__role-value">{{ localizedProfile.title }}</p>
        <div class="hero__stats">
          <AnimatedNumberStat
            v-for="stat in stats"
            :key="stat.label"
            :to="stat.value"
            :suffix="stat.suffix"
            :label="stat.label"
            :locale="locale"
          />
        </div>
        <p class="hero__proof">{{ t('home.proofFocus') }}</p>
      </aside>
    </section>

    <section v-reveal="{ delay: 100 }" class="featured">
      <SectionTitle :title="t('home.featuredTitle')" :subtitle="t('home.featuredSubtitle')" />
      <div class="featured__grid">
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

    <section v-reveal="{ delay: 140 }" class="how-i-work">
      <h2 class="how-i-work__title">{{ t('home.workTitle') }}</h2>
      <div class="how-i-work__grid">
        <article v-for="(step, idx) in workSteps" :key="step" class="step">
          <p class="step__number">0{{ idx + 1 }}</p>
          <p class="step__text">{{ step }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/index.scss" />
