import { computed } from 'vue'
import { blogPosts } from '~~/data/blog'
import type { LocaleCode } from '~~/data/projects'

export const useBlogContent = () => {
  const { locale } = useI18n()
  const activeLocale = computed<LocaleCode>(() => (locale.value === 'es' ? 'es' : 'en'))

  const localizedBlogPosts = computed(() =>
    blogPosts.map((post) => ({
      ...post,
      title: post.title[activeLocale.value],
      excerpt: post.excerpt[activeLocale.value],
      content: post.content[activeLocale.value]
    }))
  )

  return {
    localizedBlogPosts
  }
}
