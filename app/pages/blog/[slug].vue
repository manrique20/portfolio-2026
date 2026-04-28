<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { localizedBlogPosts } = useBlogContent()

const post = computed(() =>
  localizedBlogPosts.value.find((item) => item.slug === String(route.params.slug))
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeoMeta({
  title: computed(() => `${post.value?.title ?? ''}`),
  description: computed(() => post.value?.excerpt ?? '')
})

useHead(() => ({
  script: [
    {
      key: `blog-schema-${post.value?.slug ?? 'post'}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value?.title,
        datePublished: post.value?.date,
        dateModified: post.value?.date,
        author: { '@type': 'Person', name: 'Juan Sebastian Manrique Garcia' },
        inLanguage: locale.value
      })
    }
  ]
}))
</script>

<template>
  <div v-if="post" class="blog-article-page">
    <NuxtLink :to="localePath('/blog')" class="back-link">
      <span aria-hidden="true">&larr;</span>{{ t('blog.back') }}
    </NuxtLink>

    <article v-reveal class="blog-article">
      <p class="blog-article__meta">{{ post.date }} • {{ post.readTime }}</p>
      <h1 class="blog-article__title">{{ post.title }}</h1>
      <p class="blog-article__content">{{ post.content }}</p>
    </article>
  </div>
</template>

<style lang="scss" scoped src="~/assets/scss/pages/blog-slug.scss" />
