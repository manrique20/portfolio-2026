import { computed } from 'vue'
import { experience, skillGroups } from '~~/data/experience'
import { profile } from '~~/data/profile'
import { projects } from '~~/data/projects'
import type { LocaleCode } from '~~/data/projects'

export const usePortfolioContent = () => {
  const { locale } = useI18n()

  const activeLocale = computed<LocaleCode>(() => (locale.value === 'es' ? 'es' : 'en'))

  const localizedProfile = computed(() => ({
    ...profile,
    title: profile.title[activeLocale.value],
    summary: profile.summary[activeLocale.value],
    location: profile.location[activeLocale.value]
  }))

  const localizedProjects = computed(() =>
    projects.map((project) => ({
      ...project,
      tagline: project.tagline[activeLocale.value],
      role: project.role[activeLocale.value],
      summary: project.summary[activeLocale.value],
      challenge: project.challenge[activeLocale.value],
      approach: project.approach[activeLocale.value],
      outcome: project.outcome[activeLocale.value],
      impact: project.impact[activeLocale.value],
      features: project.features[activeLocale.value]
    }))
  )

  const localizedExperience = computed(() =>
    experience.map((item) => ({
      ...item,
      role: item.role[activeLocale.value],
      highlights: item.highlights[activeLocale.value]
    }))
  )

  const localizedSkillGroups = computed(() =>
    skillGroups.map((group) => ({
      title: group.title[activeLocale.value],
      items: group.items
    }))
  )

  return {
    localizedProfile,
    localizedProjects,
    localizedExperience,
    localizedSkillGroups
  }
}
