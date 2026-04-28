<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizedProjects } = usePortfolioContent();
const project = computed(() =>
  localizedProjects.value.find(
    (item) => item.slug === String(route.params.slug),
  ),
);

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

useSeoMeta({
  title: computed(() => `${project.value?.name ?? ""}`),
  description: computed(() => project.value?.summary ?? ""),
});

useHead(() => ({
  script: [
    {
      key: `project-schema-${project.value?.slug ?? "project"}`,
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.value?.name,
        description: project.value?.summary,
        creator: {
          "@type": "Person",
          name: "Juan Sebastian Manrique Garcia",
        },
        url: project.value?.links.live,
      }),
    },
  ],
}));
</script>

<template>
  <div v-if="project" class="tw-space-y-10">
    <NuxtLink
      :to="localePath('/projects')"
      class="tw-inline-flex tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-zinc-300 tw-transition hover:tw-text-white"
    >
      <span aria-hidden="true">&larr;</span>{{ t("projects.back") }}
    </NuxtLink>

    <section v-reveal class="tw-space-y-5">
      <h1 class="tw-text-4xl tw-font-semibold tw-text-white md:tw-text-5xl">
        {{ project.name }}
      </h1>
      <p class="tw-text-lg tw-text-zinc-200">{{ project.tagline }}</p>
      <p class="tw-max-w-3xl tw-leading-relaxed tw-text-zinc-300">
        {{ project.summary }}
      </p>
    </section>

    <section
      v-reveal="{ delay: 90 }"
      :class="[
        'tw-overflow-hidden tw-rounded-2xl',
        project.displayStyle === 'mobile'
          ? 'tw-flex tw-justify-center tw-bg-zinc-900/40 tw-py-10'
          : 'tw-border tw-border-zinc-800',
      ]"
    >
      <img
        :src="project.thumbnail"
        :alt="`${project.name} project thumbnail`"
        :class="[
          project.displayStyle === 'mobile'
            ? 'tw-h-auto tw-max-w-[280px] tw-rounded-[2.5rem] tw-border-8 tw-border-zinc-800 tw-shadow-2xl'
            : 'tw-h-64 tw-w-full tw-object-cover md:tw-h-80',
        ]"
        :style="{ objectPosition: project.thumbnailPosition ?? 'center' }"
      />
    </section>

    <section
      v-reveal="{ delay: 130 }"
      class="tw-grid tw-gap-6 lg:tw-grid-cols-3"
    >
      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5 lg:tw-col-span-3"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("projects.impact") }}
        </h2>
        <p class="tw-leading-relaxed tw-text-zinc-300">{{ project.impact }}</p>
      </article>
    </section>

    <section
      v-reveal="{ delay: 150 }"
      class="tw-grid tw-gap-6 lg:tw-grid-cols-3"
    >
      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("projects.challenge") }}
        </h2>
        <p class="tw-leading-relaxed tw-text-zinc-300">
          {{ project.challenge }}
        </p>
      </article>

      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("projects.approach") }}
        </h2>
        <p class="tw-leading-relaxed tw-text-zinc-300">
          {{ project.approach }}
        </p>
      </article>

      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("projects.outcome") }}
        </h2>
        <p class="tw-leading-relaxed tw-text-zinc-300">{{ project.outcome }}</p>
      </article>
    </section>

    <section
      v-reveal="{ delay: 170 }"
      class="tw-grid tw-gap-6 md:tw-grid-cols-3"
    >
      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("common.role") }}
        </h2>
        <p class="tw-text-zinc-300">{{ project.role }}</p>
      </article>

      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("projects.features") }}
        </h2>
        <ul class="tw-space-y-2 tw-text-zinc-300">
          <li v-for="feature in project.features" :key="feature">
            - {{ feature }}
          </li>
        </ul>
      </article>

      <article
        class="tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-p-5"
      >
        <h2 class="tw-mb-3 tw-text-xl tw-font-semibold tw-text-white">
          {{ t("projects.stack") }}
        </h2>
        <div class="tw-flex tw-flex-wrap tw-gap-2">
          <span
            v-for="item in project.stack"
            :key="item"
            class="tw-rounded-full tw-border tw-border-zinc-700 tw-px-3 tw-py-1 tw-text-xs tw-text-zinc-200"
          >
            {{ item }}
          </span>
        </div>
      </article>
    </section>

    <a
      v-if="project.links.live"
      :href="project.links.live"
      target="_blank"
      rel="noopener noreferrer"
      class="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-bg-lime-300 tw-px-5 tw-py-3 tw-text-sm tw-font-semibold tw-text-zinc-950"
    >
      {{ t("projects.live") }} <span aria-hidden="true">-></span>
    </a>
  </div>
</template>
