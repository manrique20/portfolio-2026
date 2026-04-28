<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { localizedProjects } = usePortfolioContent()

const project = computed(() =>
  localizedProjects.value.find((item) => item.slug === String(route.params.slug))
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: computed(() => `${project.value?.name ?? ''}`),
  description: computed(() => project.value?.summary ?? '')
})

useHead(() => ({
  script: [
    {
      key: `project-schema-${project.value?.slug ?? 'project'}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.value?.name,
        description: project.value?.summary,
        creator: { '@type': 'Person', name: 'Juan Sebastian Manrique Garcia' },
        url: project.value?.links.live
      })
    }
  ]
}))
</script>

<template>
  <div v-if="project" class="project-page">
    <NuxtLink :to="localePath('/projects')" class="back-link">
      <span aria-hidden="true">&larr;</span>{{ t('projects.back') }}
    </NuxtLink>

    <section v-reveal class="project-header">
      <h1 class="project-header__name">{{ project.name }}</h1>
      <p class="project-header__tagline">{{ project.tagline }}</p>
      <p class="project-header__summary">{{ project.summary }}</p>
    </section>

    <section
      v-reveal="{ delay: 90 }"
      :class="['project-img-wrapper', project.displayStyle === 'mobile' ? 'project-img-wrapper--mobile' : 'project-img-wrapper--desktop']"
    >
      <img
        :src="project.thumbnail"
        :alt="`${project.name} project thumbnail`"
        :class="['project-img', project.displayStyle === 'mobile' ? 'project-img--mobile' : 'project-img--desktop']"
        :style="{ objectPosition: project.thumbnailPosition ?? 'center' }"
      />
    </section>

    <section v-reveal="{ delay: 130 }" class="impact-grid">
      <article class="impact-card">
        <h2 class="impact-card__title">{{ t('projects.impact') }}</h2>
        <p class="impact-card__body">{{ project.impact }}</p>
      </article>
    </section>

    <section v-reveal="{ delay: 150 }" class="case-study-grid">
      <article class="card">
        <h2 class="card__title">{{ t('projects.challenge') }}</h2>
        <p class="card__body">{{ project.challenge }}</p>
      </article>
      <article class="card">
        <h2 class="card__title">{{ t('projects.approach') }}</h2>
        <p class="card__body">{{ project.approach }}</p>
      </article>
      <article class="card">
        <h2 class="card__title">{{ t('projects.outcome') }}</h2>
        <p class="card__body">{{ project.outcome }}</p>
      </article>
    </section>

    <section v-reveal="{ delay: 170 }" class="detail-grid">
      <article class="card">
        <h2 class="card__title">{{ t('common.role') }}</h2>
        <p class="card__body">{{ project.role }}</p>
      </article>
      <article class="card">
        <h2 class="card__title">{{ t('projects.features') }}</h2>
        <ul class="features-list">
          <li v-for="feature in project.features" :key="feature">- {{ feature }}</li>
        </ul>
      </article>
      <article class="card">
        <h2 class="card__title">{{ t('projects.stack') }}</h2>
        <div class="stack-tags">
          <span v-for="item in project.stack" :key="item" class="tag">{{ item }}</span>
        </div>
      </article>
    </section>

    <a
      v-if="project.links.live"
      :href="project.links.live"
      target="_blank"
      rel="noopener noreferrer"
      class="live-btn"
    >
      {{ t('projects.live') }} <span aria-hidden="true">-></span>
    </a>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/projects-slug.scss" />
