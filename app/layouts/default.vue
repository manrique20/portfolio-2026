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
  <div class="layout">
    <div class="container">
      <header class="site-header">
        <div class="header-bar">
          <NuxtLink :to="localePath('/')" class="logo">JSMG</NuxtLink>

          <nav class="desktop-nav">
            <NuxtLink
              v-for="item in navItems"
              :key="item.key"
              :to="item.to"
              class="nav-link"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="header-actions">
            <a :href="cvDownload" download class="btn-cv">{{ t('nav.cvCta') }}</a>
            <a :href="introLink" class="btn-intro">{{ t('nav.introCta') }}</a>
            <LanguageSwitcher />
            <button
              :class="['hamburger', { 'hamburger--open': menuOpen }]"
              :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
              @click="menuOpen = !menuOpen"
            >
              <span class="hamburger__bar hamburger__bar--top" />
              <span class="hamburger__bar hamburger__bar--mid" />
              <span class="hamburger__bar hamburger__bar--bot" />
            </button>
          </div>
        </div>

        <Transition name="mobile-nav">
          <nav v-if="menuOpen" class="mobile-menu">
            <ul class="mobile-menu__list">
              <li v-for="item in navItems" :key="item.key">
                <NuxtLink :to="item.to" class="mobile-menu__link">{{ item.label }}</NuxtLink>
              </li>
            </ul>
            <div class="mobile-menu__actions">
              <a :href="cvDownload" download class="mobile-menu__btn-cv">{{ t('nav.cvCta') }}</a>
              <a :href="introLink" class="mobile-menu__btn-intro">{{ t('nav.introCta') }}</a>
            </div>
          </nav>
        </Transition>
      </header>

      <main>
        <slot />
      </main>

      <footer class="site-footer">
        <p>{{ new Date().getFullYear() }} - Juan Sebastian Manrique Garcia</p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" src="~/assets/scss/layouts/default.scss" />
