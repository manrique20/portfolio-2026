<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { localizedBlogPosts } = useBlogContent()

const post = computed(() => localizedBlogPosts.value.find((item) => item.slug === String(route.params.slug)))

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
        author: {
          '@type': 'Person',
          name: 'Juan Sebastian Manrique Garcia'
        },
        inLanguage: locale.value
      })
    }
  ]
}))
</script>

<template>
  <div v-if="post" class="tw-space-y-8">
    <NuxtLink
      :to="localePath('/blog')"
      class="tw-inline-flex tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-zinc-300 tw-transition hover:tw-text-white"
    >
      <span aria-hidden="true">&larr;</span>{{ t('blog.back') }}
    </NuxtLink>

    <article v-reveal class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-7">
      <p class="tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">{{ post.date }} • {{ post.readTime }}</p>
      <h1 class="tw-mt-4 tw-text-4xl tw-font-semibold tw-leading-tight tw-text-white md:tw-text-5xl">
        {{ post.title }}
      </h1>
      <p class="tw-mt-6 tw-max-w-3xl tw-leading-relaxed tw-text-zinc-200">
        {{ post.content }}
      </p>
    </article>
  </div>
</template>
