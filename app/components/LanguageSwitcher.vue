<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
]
</script>

<template>
  <div class="lang-switcher">
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      :class="['lang-btn', locale === item.code ? 'lang-btn--active' : 'lang-btn--inactive']"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/components/language-switcher.scss" />
