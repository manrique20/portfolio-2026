<script setup lang="ts">
import { animate, remove } from 'animejs'

defineProps<{
  name: string
  tagline: string
  stack: string[]
  thumbnail: string
  thumbnailPosition?: string
  to: string
  cta: string
}>()

const cardRef = ref<HTMLElement | null>(null)

const onCardEnter = () => {
  if (!cardRef.value) {
    return
  }
  remove(cardRef.value)
  animate(cardRef.value, {
    translateY: -8,
    scale: 1.01,
    duration: 320,
    easing: 'easeOutQuad'
  })
}

const onCardLeave = () => {
  if (!cardRef.value) {
    return
  }
  remove(cardRef.value)
  animate(cardRef.value, {
    translateY: 0,
    scale: 1,
    duration: 340,
    easing: 'easeOutExpo'
  })
}
</script>

<template>
  <article
    ref="cardRef"
    v-reveal
    class="tw-group tw-flex tw-h-full tw-flex-col tw-justify-between tw-overflow-hidden tw-rounded-2xl tw-border tw-border-zinc-800 tw-bg-zinc-900/60 tw-transition duration-300 hover:tw-border-lime-300/50"
    @mouseenter="onCardEnter"
    @mouseleave="onCardLeave"
  >
    <img
      :src="thumbnail"
      :alt="`${name} project thumbnail`"
      class="tw-h-40 tw-w-full tw-object-cover tw-transition tw-duration-300 group-hover:tw-scale-[1.02]"
      :style="{ objectPosition: thumbnailPosition ?? 'center' }"
      loading="lazy"
    />

    <div class="tw-space-y-4 tw-p-6">
      <h3 class="tw-text-xl tw-font-semibold tw-text-white">{{ name }}</h3>
      <p class="tw-text-sm tw-leading-relaxed tw-text-zinc-300">{{ tagline }}</p>
      <div class="tw-flex tw-flex-wrap tw-gap-2">
        <span
          v-for="item in stack"
          :key="item"
          class="tw-rounded-full tw-border tw-border-zinc-700 tw-px-3 tw-py-1 tw-text-xs tw-text-zinc-200"
        >
          {{ item }}
        </span>
      </div>
    </div>

    <NuxtLink
      :to="to"
      class="tw-mx-6 tw-mb-6 tw-mt-1 tw-inline-flex tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-lime-300 tw-transition group-hover:tw-gap-3"
    >
      {{ cta }}
      <span aria-hidden="true">-></span>
    </NuxtLink>
  </article>
</template>
