<script setup lang="ts">
const { t, locale } = useI18n()
const { localizedExperience, localizedSkillGroups } = usePortfolioContent()

useSeoMeta({
  title: computed(() => (locale.value === 'es' ? 'Experiencia' : 'Experience')),
  description: computed(() => t('experience.subtitle'))
})
</script>

<template>
  <div class="experience-page">
    <SectionTitle v-reveal :title="t('experience.title')" :subtitle="t('experience.subtitle')" />

    <section v-reveal="{ delay: 90 }" class="experience-list">
      <article
        v-for="item in localizedExperience"
        :key="`${item.company}-${item.period}`"
        class="experience-item"
      >
        <div class="experience-item__header">
          <h2 class="experience-item__company">{{ item.company }}</h2>
          <span class="experience-item__period">{{ item.period }}</span>
        </div>
        <p class="experience-item__role">{{ item.role }}</p>
        <ul class="experience-item__highlights">
          <li v-for="highlight in item.highlights" :key="highlight">- {{ highlight }}</li>
        </ul>
      </article>
    </section>

    <section v-reveal="{ delay: 150 }" class="skills-section">
      <h2 class="skills-section__title">{{ t('experience.skillsTitle') }}</h2>
      <div class="skills-grid">
        <article v-for="group in localizedSkillGroups" :key="group.title" class="skill-group">
          <h3 class="skill-group__title">{{ group.title }}</h3>
          <p class="skill-group__items">{{ group.items.join(' • ') }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/experience.scss" />
