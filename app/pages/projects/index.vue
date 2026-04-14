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
  <div class="tw-space-y-10">
    <SectionTitle v-reveal :title="t('projects.title')" :subtitle="t('projects.subtitle')" />

    <div class="tw-grid tw-gap-6 md:tw-grid-cols-2">
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
