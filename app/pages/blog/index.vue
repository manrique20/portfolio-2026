<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { localizedBlogPosts } = useBlogContent()

useSeoMeta({
  title: computed(() => (locale.value === 'es' ? 'Blog tecnico' : 'Technical blog')),
  description: computed(() => t('blog.subtitle'))
})
</script>

<template>
  <div class="blog-page">
    <SectionTitle v-reveal :title="t('blog.title')" :subtitle="t('blog.subtitle')" />

    <div class="blog-grid">
      <article v-for="post in localizedBlogPosts" :key="post.slug" v-reveal class="blog-post">
        <p class="blog-post__meta">{{ post.date }} • {{ post.readTime }}</p>
        <h2 class="blog-post__title">{{ post.title }}</h2>
        <p class="blog-post__excerpt">{{ post.excerpt }}</p>
        <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="blog-post__link">
          {{ t('blog.readMore') }} <span aria-hidden="true">-></span>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/blog-index.scss" />
