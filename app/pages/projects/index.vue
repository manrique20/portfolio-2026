<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { localizedProjects } = usePortfolioContent()

useSeoMeta({
  title: computed(() => (locale.value === 'es' ? 'Proyectos' : 'Projects')),
  description: computed(() => t('projects.subtitle'))
})
</script>

<template>
  <div class="projects-page">
    <SectionTitle v-reveal :title="t('projects.title')" :subtitle="t('projects.subtitle')" />

    <div class="projects-page__grid">
      <ProjectCard
        v-for="project in localizedProjects"
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
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/projects-index.scss" />
