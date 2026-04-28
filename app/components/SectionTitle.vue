<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <header class="section-title">
    <h2 class="section-title__heading">{{ title }}</h2>
    <p class="section-title__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style lang="scss" scoped src="~/assets/scss/components/section-title.scss" />
