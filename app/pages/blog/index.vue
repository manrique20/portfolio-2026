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
  <div class="tw-space-y-10">
    <SectionTitle v-reveal :title="t('blog.title')" :subtitle="t('blog.subtitle')" />

    <div class="tw-grid tw-gap-5 md:tw-grid-cols-2">
      <article
        v-for="post in localizedBlogPosts"
        :key="post.slug"
        v-reveal
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-6"
      >
        <p class="tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-zinc-400">{{ post.date }} • {{ post.readTime }}</p>
        <h2 class="tw-mt-3 tw-text-2xl tw-font-semibold tw-text-white">{{ post.title }}</h2>
        <p class="tw-mt-3 tw-leading-relaxed tw-text-zinc-300">{{ post.excerpt }}</p>
        <NuxtLink
          :to="localePath(`/blog/${post.slug}`)"
          class="tw-mt-5 tw-inline-flex tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-lime-300"
        >
          {{ t('blog.readMore') }} <span aria-hidden="true">-></span>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
