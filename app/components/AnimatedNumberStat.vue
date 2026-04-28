<script setup lang="ts">
import { createTimer } from 'animejs'

const props = withDefaults(
  defineProps<{
    from?: number
    to: number
    duration?: number
    suffix?: string
    prefix?: string
    label: string
    locale?: string
  }>(),
  { from: 0, duration: 1200, suffix: '', prefix: '', locale: undefined }
)

const rootRef = ref<HTMLElement | null>(null)
const currentValue = ref(props.from)
const hasStarted = ref(false)

let observer: IntersectionObserver | null = null
let timer: ReturnType<typeof createTimer> | null = null

const formattedValue = computed(() => new Intl.NumberFormat(props.locale).format(currentValue.value))

const startCounter = () => {
  if (hasStarted.value) return
  hasStarted.value = true
  timer = createTimer({
    duration: props.duration,
    frameRate: 30,
    onUpdate: (self) => {
      const progress = Math.min(self.currentTime / props.duration, 1)
      currentValue.value = Math.round(props.from + (props.to - props.from) * progress)
    },
    onComplete: () => { currentValue.value = props.to }
  })
}

onMounted(() => {
  if (!rootRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        startCounter()
        observer?.disconnect()
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  timer?.cancel()
})
</script>

<template>
  <article ref="rootRef" class="stat">
    <p class="stat__value">{{ prefix }}{{ formattedValue }}{{ suffix }}</p>
    <p class="stat__label">{{ label }}</p>
  </article>
</template>

<style lang="scss" scoped src="~/assets/scss/components/animated-number-stat.scss" />
