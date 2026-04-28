<script setup lang="ts">
const { t, locale } = useI18n()
const { localizedProfile } = usePortfolioContent()

useSeoMeta({
  title: computed(() => (locale.value === 'es' ? 'Contacto' : 'Contact')),
  description: computed(() => t('contact.subtitle'))
})
</script>

<template>
  <div class="contact-page">
    <SectionTitle v-reveal :title="t('contact.title')" :subtitle="t('contact.subtitle')" />

    <section v-reveal="{ delay: 100 }" class="contact-grid">
      <article class="contact-card">
        <h2 class="contact-card__label">{{ t('contact.email') }}</h2>
        <a class="contact-card__link" :href="`mailto:${localizedProfile.contact.email}`">
          {{ localizedProfile.contact.email }}
        </a>
      </article>

      <article class="contact-card">
        <h2 class="contact-card__label">{{ t('contact.phone') }}</h2>
        <a
          class="contact-card__link"
          :href="`tel:${localizedProfile.contact.phone.replace(/\s+/g, '')}`"
        >
          {{ localizedProfile.contact.phone }}
        </a>
      </article>

      <article class="contact-card">
        <h2 class="contact-card__label">{{ t('contact.location') }}</h2>
        <p class="contact-card__value">{{ localizedProfile.location }}</p>
      </article>
    </section>

    <section v-reveal="{ delay: 200 }" class="contact-ai-section">
      <p class="contact-ai-section__label">AI</p>
      <AiChat />
    </section>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/contact.scss" />
