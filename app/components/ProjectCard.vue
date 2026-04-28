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
  if (!cardRef.value) return
  remove(cardRef.value)
  animate(cardRef.value, { translateY: -8, scale: 1.01, duration: 320, easing: 'easeOutQuad' })
}

const onCardLeave = () => {
  if (!cardRef.value) return
  remove(cardRef.value)
  animate(cardRef.value, { translateY: 0, scale: 1, duration: 340, easing: 'easeOutExpo' })
}
</script>

<template>
  <article
    ref="cardRef"
    v-reveal
    class="project-card"
    @mouseenter="onCardEnter"
    @mouseleave="onCardLeave"
  >
    <img
      :src="thumbnail"
      :alt="`${name} project thumbnail`"
      class="project-card__thumbnail"
      :style="{ objectPosition: thumbnailPosition ?? 'center' }"
      loading="lazy"
    />

    <div class="project-card__body">
      <h3 class="project-card__name">{{ name }}</h3>
      <p class="project-card__tagline">{{ tagline }}</p>
      <div class="project-card__stack">
        <span v-for="item in stack" :key="item" class="project-card__tag">{{ item }}</span>
      </div>
    </div>

    <NuxtLink :to="to" class="project-card__cta">
      {{ cta }} <span aria-hidden="true">-></span>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped src="~/assets/scss/components/project-card.scss" />
